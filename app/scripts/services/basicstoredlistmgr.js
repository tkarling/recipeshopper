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

            prepareForLogout: function() {
              for (var i = 0; i < StoredListMgrs.length; i++) {
                StoredListMgrs[i].mgr.prepareForLogout();
              }
              StoredListMgrs = [];
            },

            // following for UNIT Testing
            getStoredListMgrs: function() {
              return StoredListMgrs;
            }

        };

    })

  .factory('BasicStoredListMgr', ['$rootScope', '$log', '$q', '$firebase', 
    function ($rootScope, $log, $q, $firebase) {

    var fullUrl = function(fbUrl, variableUrl) {
      variableUrl = (variableUrl == undefined)?'':variableUrl;
      var fUrl = fbUrl + variableUrl;
      $log.debug('BasicStoredListMgr: fUrl', fUrl);
      return fUrl;
    };

    var clearRefs = function(data) {
      $log.debug('BasicStoredListMgr: clearRefs CALLED');
      data.ref = undefined;
      data.dataRef = undefined;
      if(data.items && data.items.length > 0) {
        data.items.$destroy();
      }
      data.items = [];
    };

    var setRefs = function (data, fbUrl, variableUrl) {
      data.fbUrl = fbUrl;
      data.variableUrl = variableUrl;
      $log.debug('BasicStoredListMgr: setRefs: ', data, fbUrl, variableUrl);
      if (data.ref) {
        clearRefs(data);
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
      setRefs(this.data, fbUrl, variableUrl);
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
          // console.log('getExistingItemsAsync: self.data.items', self.data.items);
          // $log.debug(self.data.items);
          deferred.resolve(self.data.items);
          return deferred.promise;
    }; // getExistingItemsAsync

    var fieldNameAndFieldValueAreSame = function (self, fieldName, fieldValue) {
       var bothAreSame = (self.data.fieldName == fieldName) && (self.data.fieldValue == fieldValue);
       if(! bothAreSame) {
        this.data.fieldName = fieldName;
        this.data.fieldValue = fieldValue;
       }
       return bothAreSame;
    } // fieldNameValueHasChanged


    BasicStoredListMgr.prototype.getItems = function (fieldName, fieldValue) {
        var sameQuery = fieldNameAndFieldValueAreSame(this, fieldName, fieldValue);
        $log.debug('BasicStoredListMgr: getItems init: sameQuery', sameQuery);
        if(sameQuery && this.data.items && (this.data.items.length > 0)) {
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

    var broadcastItemsLoaded = function(self) {
      $log.debug('BasicStoredListMgr: getItemsSync broadcasting handleItemsloaded', self.data);
      $rootScope.$broadcast('handleItemsloaded', {
        fbUrl: self.data.fbUrl
      });
    };

    BasicStoredListMgr.prototype.getItemsSync = function(tellWhenLoaded, fieldName, fieldValue) {
      var sameQuery = fieldNameAndFieldValueAreSame(this, fieldName, fieldValue);
      $log.debug('BasicStoredListMgr: getItemsSync init: tellWhenLoaded, sameQuery', tellWhenLoaded, sameQuery);
      if (sameQuery && this.data.items && (this.data.items.length > 0)) {
        if (tellWhenLoaded) {
          broadcastItemsLoaded(this);
        }
        return this.data.items;
      }
      if (this.data.ref) {
        if (fieldName && fieldValue) {
          // get selected items
          this.data.items = $firebase(this.data.ref.orderByChild(fieldName).equalTo(fieldValue)).$asArray();
        } else {
          // get all items
          this.data.items = this.data.dataRef.$asArray();
        }
        var self = this;
        if (tellWhenLoaded) {
          this.data.items.$loaded().then(function() {
            broadcastItemsLoaded(self);
          });
        }
        return this.data.items;
      }
    }; // BasicStoredListMgr.prototype.getItemsSync

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

    BasicStoredListMgr.prototype.prepareForLogout = function() {
      clearRefs(this.data);
    }; // BasicStoredListMgr.prototype.prepareForLogout

    // BasicStoredListMgr.prototype.updateItem = function (item, updateDesription) {
    //   return data.dataRef.$update(item.$id, updateDesription);
    // }

    return BasicStoredListMgr;
  }]);
