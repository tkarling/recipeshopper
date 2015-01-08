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
  .factory('BasicStoredListMgr', ['$log', '$q', '$firebase', function ($log, $q, $firebase) {

    var data = {};
    data.items = [];

    var setRefs = function (newUrl) {
      if(data.ref) {
        // this is needed for the change earlier url case. Not used if url is set in begining only
        data.ref = undefined;
        data.dataRef = undefined;
        this.items = [];
      }
      if(data.ref == undefined) {
        data.ref = new Firebase(newUrl);
        data.dataRef = $firebase(data.ref);
        $log.debug('BasicStoredListMgr: setRefs: data.ref after', data.ref);
      }
    } // setRefs


    var BasicStoredListMgr = function(urlForList) {
      if(urlForList != data.urlForList) {
        // refs need to be set only, if they are not already set
        data.urlForList = urlForList;
        setRefs(data.urlForList);
      }
    }

    BasicStoredListMgr.prototype.getItems = function () {
        if(data.items && (data.items.length > 0)) {
          var deferred = $q.defer();
          $log.debug('BasicStoredListMgr. getItems (existing): ', data.items);
          deferred.resolve(data.items);
          return deferred.promise;
        }

        if(data.ref) {
          var itemsAsArray = data.dataRef.$asArray();
          return itemsAsArray.$loaded().then(
            function() {
              data.items = itemsAsArray;
              $log.debug('BasicStoredListMgr. getItems (after loaded): ', data.items);
              return(data.items);
            }
          );
        }
    } // BasicStoredListMgr.prototype.getItems

    BasicStoredListMgr.prototype.addItem = function (item) {
      return data.items.$add(item);
    }

    BasicStoredListMgr.prototype.deleteItem = function (item) {
      return data.items.$remove(item);
      // return data.dataRef.$remove(item.$id);
    }

    BasicStoredListMgr.prototype.saveItem = function (item) {
      return data.items.$save(item);
    }

    // BasicStoredListMgr.prototype.updateItem = function (item, updateDesription) {
    //   return data.dataRef.$update(item.$id, updateDesription);
    // }

    return BasicStoredListMgr;
  }]);
