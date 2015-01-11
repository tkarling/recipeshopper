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
    .factory('StoredListMgrFactory', function (BasicStoredListMgr) {
        var StoredListMgrs = [];

        var getExistingMgr = function(fbUrl) {
          for(var i=0; i < StoredListMgrs.length; i++) {
            if(StoredListMgrs[i].fburl == fbUrl) {
              return StoredListMgrs[i].mgr;
            }
          }
          return null;
        }; // getExistingMgr

        return {
            createBasicStoredListMgr : function (fbUrl) {
                var mgr = getExistingMgr(fbUrl);
                if(mgr === null) {
                  var newMgrItem = {};
                  newMgrItem.fburl = fbUrl;
                  newMgrItem.mgr = new BasicStoredListMgr(newMgrItem.fburl);
                  StoredListMgrs.push(newMgrItem);
                  mgr = newMgrItem.mgr;
                }
                return mgr;
            }
        };
    })

  .factory('BasicStoredListMgr', ['$log', '$q', '$firebase', function ($log, $q, $firebase) {

    // var data = {};
    // data.items = [];

    var setRefs = function (data, newUrl) {
      data.urlForList = newUrl;
      // $log.debug('BasicStoredListMgr: setRefs: ', data);
      if(data.ref) {
        // URL CHANGE NOT E2E IMPLEMENTED/ TESTED YET, this is needed for the change earlier url case. 
        // Not used if url is set in begining only.
        data.ref = undefined;
        data.dataRef = undefined;
        data.items = [];
      }
      if(data.ref === undefined) {
        data.ref = new Firebase(newUrl);
        data.dataRef = $firebase(data.ref);
        // $log.debug('BasicStoredListMgr: setRefs: data.ref after READING FROM FB', data.ref);
      }
    }; // setRefs

    var BasicStoredListMgr = function(fbUrl) {
      this.data = {};
      this.data.items = [];
      // if(fbUrl != data.urlForList) {
        // refs need to be set only, if they are not already set
      setRefs(this.data, fbUrl);
      // }
    };

    BasicStoredListMgr.prototype.setUrl = function (urlForList) {
      // URL CHANGE NOT E2E IMPLEMENTED/ TESTED YET, this should be called from StoredListMgrFactory only 
      // to keep the 2 services in sync
      $log.debug('setUrl: this.data.urlForList', this.data.urlForList);
      if(urlForList != this.data.urlForList) {
        // refs need to be set only, if they are not already set
        setRefs(this.data, urlForList);
      }
    }; // BasicStoredListMgr.prototype.setUrl

    var getExistingItemsAsync = function(self) {
          var deferred = $q.defer();
          $log.debug('BasicStoredListMgr. getExistingItemsAsync (existing): ', self.data.items);
          deferred.resolve(self.data.items);
          return deferred.promise;
    }; // getExistingItemsAsync

    var getItemsFromFBAsync = function(self, itemsAsArray) {
        return itemsAsArray.$loaded().then(
          function() {
            self.data.items = itemsAsArray;
            $log.debug('BasicStoredListMgr. getItems (after loaded from FB): ', self.data.items);
            return(self.data.items);
          }
        );
    }; //getItemsFromFBAsync

    BasicStoredListMgr.prototype.getItems = function () {
        if(this.data.items && (this.data.items.length > 0)) {
          return getExistingItemsAsync(this);
        }
        if(this.data.ref) {
          var itemsAsArray = this.data.dataRef.$asArray();
          return getItemsFromFBAsync(this, itemsAsArray);
        }
    }; // BasicStoredListMgr.prototype.getItems

    
    BasicStoredListMgr.prototype.getSelectedItems = function (fieldName, fieldValue) {
        if(this.data.items && (this.data.items.length > 0)) {
          return getExistingItemsAsync(this);
        }
        if(this.data.ref) {
          var itemsAsArray = $firebase(this.data.ref.orderByChild(fieldName).equalTo(fieldValue)).$asArray();
          return getItemsFromFBAsync(this, itemsAsArray);
        }
    }; // BasicStoredListMgr.prototype.getSelectedItems

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
