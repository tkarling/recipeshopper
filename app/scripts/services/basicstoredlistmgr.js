'use strict';

/**
 * @ngdoc service
 * @name storedListMod.BasicStoredListMgr
 * @description
 * # BasicStoredListMgr
 * Factory in the storedListMod.
 */

angular
.module('storedListMod', [
  'firebase',
]);

angular.module('storedListMod')
    .factory('StoredListMgrFactory', function ($log, BasicStoredListMgr) {
        var StoredListMgrs = [];

        var getExistingMgrItem = function(fbUrl, variableUrl) {
          for(var i=0; i < StoredListMgrs.length; i++) {
            if((StoredListMgrs[i].fburl == fbUrl) &&
              ((StoredListMgrs[i].variableUrl == variableUrl) || 
                ((StoredListMgrs[i].variableUrl != undefined) && (variableUrl != undefined)))) {
              return StoredListMgrs[i];
            }
          }
          return null;
        }; // getExistingMgr

        return {
            getStoredListMgr : function (fbUrl, variableUrl) {
                var mgrItem = getExistingMgrItem(fbUrl, variableUrl);
                if(mgrItem == null) {
                  // create new mgrItem, if one w same fixed url does not exits
                  var newMgrItem = {};
                  newMgrItem.fburl = fbUrl;
                  newMgrItem.variableUrl = variableUrl;
                  // var fullUrl = newMgrItem.fburl + newMgrItem.variableUrl;
                  // $log.debug('StoredListMgrFactory: fullUrl: ', fullUrl);
                  newMgrItem.mgr = new BasicStoredListMgr(newMgrItem.fburl, newMgrItem.variableUrl);
                  StoredListMgrs.push(newMgrItem);
                  mgrItem = newMgrItem;
                } else if (mgrItem.variableUrl != variableUrl) {
                  //update variable part of existing url
                  mgrItem.variableUrl = variableUrl;
                  mgrItem.mgr.setUrl(fbUrl, variableUrl);
                }
                // else return existing mgr w no updates
                $log.debug('StoredListMgrFactory: StoredListMgrs.length: ', StoredListMgrs.length );
                return mgrItem.mgr;
            },

            // following for UNIT Testing
            getStoredListMgrs: function() {
              return StoredListMgrs;
            }

        };

    })

  .factory('BasicStoredListMgr', ['$log', '$q', '$firebase', function ($log, $q, $firebase) {

    // var data = {};
    // data.items = [];

    var fullUrl = function(fbUrl, variableUrl) {
      variableUrl = (variableUrl == undefined)?'':variableUrl;
      var fUrl = fbUrl + variableUrl;
      $log.debug('BasicStoredListMgr: fUrl', fUrl);
      return fUrl;
    };

    var setRefs = function (data, fbUrl, variableUrl) {
      data.fbUrl = fbUrl;
      data.variableUrl = variableUrl;
      // $log.debug('BasicStoredListMgr: setRefs: ', data);
      if(data.ref) {
        // URL CHANGE NOT E2E IMPLEMENTED/ TESTED YET, this is needed for the change earlier url case. 
        // Not used if url is set in begining only.
        data.ref = undefined;
        data.dataRef = undefined;
        data.items = [];
      }
      if(data.ref === undefined) {
        data.ref = new Firebase(fullUrl(fbUrl, variableUrl));
        data.dataRef = $firebase(data.ref);
        // $log.debug('BasicStoredListMgr: setRefs: data.ref after READING FROM FB', data.ref);
      }
    }; // setRefs

    var BasicStoredListMgr = function(fbUrl, variableUrl) {
      this.data = {};
      this.data.items = [];
      // if(fbUrl != data.fbUrl) {
      // refs need to be set only, if they are not already set
      setRefs(this.data, fbUrl, variableUrl);
      // }
    };

    BasicStoredListMgr.prototype.setUrl = function (fbUrl, variableUrl) {
      if((fbUrl != this.data.fbUrl) || (variableUrl != this.data.variableUrl)) {
        // refs need to be set only, if they are not already set
        setRefs(this.data, fbUrl, variableUrl);
      }
    }; // BasicStoredListMgr.prototype.setUrl

    var getExistingItemsAsync = function(self) {
          var deferred = $q.defer();
          $log.debug('BasicStoredListMgr. getExistingItemsAsync (existing)');
          // $log.debug(self.data.items);
          deferred.resolve(self.data.items);
          return deferred.promise;
    }; // getExistingItemsAsync

    // var getItemsFromFBAsync = function(self) { 
    //     return self.data.items.$loaded().then(
    //       function() {
    //         $log.debug('BasicStoredListMgr. getItems (after loaded from FB): ', self.data.items);
    //         return(self.data.items);
    //       }
    //     );
    // }; //getItemsFromFBAsync

    BasicStoredListMgr.prototype.getItems = function (fieldName, fieldValue) {
        if(this.data.items && (this.data.items.length > 0)) {
          return getExistingItemsAsync(this);
        }
        if(this.data.ref) {
          if(fieldName && fieldValue) {
            // get selected items
            this.data.items = $firebase(this.data.ref.orderByChild(fieldName).equalTo(fieldValue)).$asArray();
          } else {
            // get all items
            this.data.items = this.data.dataRef.$asArray();
          }
          return this.data.items.$loaded();
          // return getItemsFromFBAsync(this); 
        }
    }; // BasicStoredListMgr.prototype.getItems

    BasicStoredListMgr.prototype.addItem = function (item) {
      return this.data.items.$add(item);
    }; // BasicStoredListMgr.prototype.addItem

    BasicStoredListMgr.prototype.deleteItem = function (item) {
      return this.data.items.$remove(item);
      // return data.dataRef.$remove(item.$id);
    }; // BasicStoredListMgr.prototype.deleteItem

    BasicStoredListMgr.prototype.saveItem = function (item) {
      return this.data.items.$save(item);
    }; // BasicStoredListMgr.prototype.saveItem

    // BasicStoredListMgr.prototype.updateItem = function (item, updateDesription) {
    //   return data.dataRef.$update(item.$id, updateDesription);
    // }

    return BasicStoredListMgr;
  }]);
