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

    // var data = {};
    // data.items = [];

    var setRefs = function (data, newUrl) {
      data.urlForList = newUrl;
      // $log.debug('BasicStoredListMgr: setRefs: ', data);
      if(data.ref) {
        // this is needed for the change earlier url case. Not used if url is set in begining only
        data.ref = undefined;
        data.dataRef = undefined;
        data.items = [];
      }
      if(data.ref == undefined) {
        data.ref = new Firebase(newUrl);
        data.dataRef = $firebase(data.ref);
        $log.debug('BasicStoredListMgr: setRefs: data.ref after READING FROM FB', data.ref);
      }
    } // setRefs

    var BasicStoredListMgr = function() {
      this.data = {};
      this.data.items = [];
      // if(urlForList != data.urlForList) {
      //   // refs need to be set only, if they are not already set
      //   // setRefs(urlForList);
      // }
    }

    // var BasicStoredListMgr = function() {
    // }

    BasicStoredListMgr.prototype.setUrl = function (urlForList) {
      $log.debug('setUrl: this.data.urlForList', this.data.urlForList);
      if(urlForList != this.data.urlForList) {
        // refs need to be set only, if they are not already set
        setRefs(this.data, urlForList);
      }
    }

    BasicStoredListMgr.prototype.getItems = function () {
        if(this.data.items && (this.data.items.length > 0)) {
          var deferred = $q.defer();
          $log.debug('BasicStoredListMgr. getItems (existing): ', this.data.items);
          deferred.resolve(this.data.items);
          return deferred.promise;
        }

        if(this.data.ref) {
          var itemsAsArray = this.data.dataRef.$asArray();
          var self = this;
          return itemsAsArray.$loaded().then(
            function() {
              self.data.items = itemsAsArray;
              $log.debug('BasicStoredListMgr. getItems (after loaded): ', self.data.items);
              return(self.data.items);
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


    //   this.setUrl = function (urlForList) {
    //     if(urlForList != data.urlForList) {
    //       // refs need to be set only, if they are not already set
    //       setRefs(urlForList);
    //     }
    //   }
    // var BasicStoredListMgr = function(urlForList) {
    //   if(urlForList != data.urlForList) {
    //     // refs need to be set only, if they are not already set
    //     data.urlForList = urlForList;
    //     $log.debug('BasicStoredListMgr: data: ', data);
    //     setRefs(data.urlForList);
    //   }
