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

        var getExistingMgrItem = function(fbUrl, fieldNameOrVariableUrl, fieldValue) {
          for(var i=0; i < StoredListMgrs.length; i++) {
            if((StoredListMgrs[i].fbUrl == fbUrl) &&
               (StoredListMgrs[i].fieldNameOrVariableUrl == fieldNameOrVariableUrl) && 
               (StoredListMgrs[i].fieldValue == fieldValue)) {
              return StoredListMgrs[i];
            }
          }
          return null;
        }; // getExistingMgr

        return {
            getStoredListMgr : function (fbUrl, fieldNameOrVariableUrl, fieldValue) {
                var mgrItem = getExistingMgrItem(fbUrl, fieldNameOrVariableUrl, fieldValue);
                if(mgrItem == null) {
                  // create new mgrItem, if one w same fixed url does not exits
                  var newMgrItem = {};
                  newMgrItem.fbUrl = fbUrl;
                  newMgrItem.fieldNameOrVariableUrl = fieldNameOrVariableUrl;
                  newMgrItem.fieldValue = fieldValue;
                  $log.debug('StoredListMgrFactory: getStoredListMgr: newMgrItem', newMgrItem);
                  newMgrItem.mgr = new BasicStoredListMgr(newMgrItem.fbUrl, newMgrItem.fieldNameOrVariableUrl, newMgrItem.fieldValue);
                  StoredListMgrs.push(newMgrItem);
                  mgrItem = newMgrItem;
                } 
                // $log.debug('StoredListMgrFactory: : getStoredListMgr StoredListMgrs.length: ', StoredListMgrs.length );
                // $log.debug('StoredListMgrFactory: getStoredListMgr: mgrItem', mgrItem);
                // $log.debug('StoredListMgrFactory: getStoredListMgr: mgrItem.mgr', mgrItem.mgr);
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

  .factory('BasicStoredListMgr', ['$rootScope', '$log', '$q', '$firebaseArray', 
    function ($rootScope, $log, $q, $firebaseArray) {

    var fullUrl = function(fbUrl, variableUrl, fieldValue) {
      // $log.debug('BasicStoredListMgr: fullUrl: fbUrl, variableUrl, fieldValue', fbUrl, variableUrl, fieldValue);
      variableUrl = (fieldValue || (variableUrl == undefined))?'':variableUrl;
      // $log.debug('BasicStoredListMgr: fullUrl: variableUrl', variableUrl);
      var fUrl = fbUrl + variableUrl;
      $log.debug('BasicStoredListMgr: fullUrl: fUrl', fUrl);
      return fUrl;
    };

    var clearRefs = function(data) {
      $log.debug('BasicStoredListMgr: clearRefs CALLED');
      data.ref = undefined;
      if(data.items && data.items.length > 0) {
        data.items.$destroy();
      }
      data.items = [];
    };

    var setRefs = function (data, fbUrl, fieldNameOrVariableUrl, fieldValue) {
      // $log.debug('BasicStoredListMgr: setRefs: fbUrl, fieldNameOrVariableUrl, fieldValue', fbUrl, fieldNameOrVariableUrl, fieldValue);
      data.fbUrl = fbUrl;
      data.fieldNameOrVariableUrl = fieldNameOrVariableUrl;
      data.fieldValue = fieldValue;
      $log.debug('BasicStoredListMgr: setRefs: ', data, fbUrl, fieldNameOrVariableUrl, fieldValue);
      if (data.ref) {
        clearRefs(data);
      }
      if(data.ref === undefined) {
        data.ref = new Firebase(fullUrl(fbUrl, fieldNameOrVariableUrl, fieldValue));
      }
    }; // setRefs

    var BasicStoredListMgr = function(fbUrl, fieldNameOrVariableUrl, fieldValue) {
      $log.debug('BasicStoredListMgr: constructor: fbUrl, fieldNameOrVariableUrl, fieldValue', fbUrl, fieldNameOrVariableUrl, fieldValue);
      this.data = {};
      this.data.items = [];
      setRefs(this.data, fbUrl, fieldNameOrVariableUrl, fieldValue);
    };

    var getExistingItemsAsync = function(self) {
          var deferred = $q.defer();
          $log.debug('BasicStoredListMgr. getExistingItemsAsync (existing)');
          // console.log('getExistingItemsAsync: self.data.items', self.data.items);
          // $log.debug(self.data.items);
          deferred.resolve(self.data.items);
          return deferred.promise;
    }; // getExistingItemsAsync

    var fieldNameAndFieldValueAreSame = function (self, fieldNameOrVariableUrl, fieldValue) {
       var bothAreSame = (fieldNameOrVariableUrl == undefined) ||
        (self.data.fieldNameOrVariableUrl == fieldNameOrVariableUrl) && (self.data.fieldValue == fieldValue);
       if(! bothAreSame) {
        $log.debug('BasicStoredListMgr: fieldNameAndFieldValueAreSame: setting fieldNameOrVariableUrl, fieldValue', fieldNameOrVariableUrl, fieldValue);
        self.data.fieldNameOrVariableUrl = fieldNameOrVariableUrl;
        self.data.fieldValue = fieldValue;
       }
       return bothAreSame;
    } // fieldNameValueHasChanged


    BasicStoredListMgr.prototype.getItems = function (fieldNameOrVariableUrl, fieldValue) {
        var sameQuery = fieldNameAndFieldValueAreSame(this, fieldNameOrVariableUrl, fieldValue);
        // $log.debug('BasicStoredListMgr: getItems init: this.data.fbUrl, sameQuery', this.data.fbUrl, sameQuery);
        if(sameQuery && this.data.items && (this.data.items.length > 0)) {
          return getExistingItemsAsync(this);
        }
        // $log.debug('BasicStoredListMgr: getItems: this.data.fbUrl, fieldNameOrVariableUrl, fieldValue', this.data.fbUrl, fieldNameOrVariableUrl, fieldValue);
        if(fieldNameOrVariableUrl) {
          setRefs(this.data, this.data.fbUrl, fieldNameOrVariableUrl, fieldValue);
        }
        if(this.data.ref) {
          // $log.debug('BasicStoredListMgr. getItems (from FB) this.data.ref', this.data.ref);
          if(this.data.fieldNameOrVariableUrl && this.data.fieldValue) {
            // get selected items
            // $log.debug('BasicStoredListMgr. getItems (from FB) w this.data.fbUrl, this.data.fieldNameOrVariableUrl, this.data.fieldValue', 
            //     this.data.fbUrl, this.data.fieldNameOrVariableUrl, this.data.fieldValue);
            this.data.items = $firebaseArray(this.data.ref.orderByChild(this.data.fieldNameOrVariableUrl).equalTo(this.data.fieldValue));
          } else {
            // get all items
            // $log.debug('BasicStoredListMgr. getItems (from FB) w dataref');
            this.data.items = $firebaseArray(this.data.ref);
          }
          $log.debug('BasicStoredListMgr. getItems (from FB)');
          return this.data.items.$loaded();
          // return getItemsFromFBAsync(this); 
        }
    }; // BasicStoredListMgr.prototype.getItems

    BasicStoredListMgr.prototype.getItem = function (itemId) {
      for(var i=0; i < this.data.items.length; i++) {
        if(this.data.items[i].$id == itemId) {
          return this.data.items[i];
        }
      }
    }; // BasicStoredListMgr.prototype.getItem

    var broadcastItemsLoaded = function(self) {
      $log.debug('BasicStoredListMgr: getItemsSync broadcasting handleItemsloaded', self.data);
      $rootScope.$broadcast('handleItemsloaded', {
        fbUrl: self.data.fbUrl
      });
    };

    BasicStoredListMgr.prototype.getItemsSync = function(tellWhenLoaded, fieldNameOrVariableUrl, fieldValue) {
      var sameQuery = fieldNameAndFieldValueAreSame(this, fieldNameOrVariableUrl, fieldValue);
      // $log.debug('BasicStoredListMgr: getItemsSync init: tellWhenLoaded, sameQuery', tellWhenLoaded, sameQuery);
      if (sameQuery && this.data.items && (this.data.items.length > 0)) {
        if (tellWhenLoaded) {
          broadcastItemsLoaded(this);
        }
        return this.data.items;
      }
      if(fieldNameOrVariableUrl) {
        setRefs(this.data, this.data.fbUrl, fieldNameOrVariableUrl, fieldValue);
      }
      if (this.data.ref) {
        if (this.data.fieldNameOrVariableUrl && this.data.fieldValue) {
          // get selected items
          this.data.items = $firebaseArray(this.data.ref.orderByChild(this.data.fieldNameOrVariableUrl).equalTo(this.data.fieldValue));
        } else {
          // get all items
          this.data.items = $firebaseArray(this.data.ref);
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
      var result = this.data.items.$add(item).then(function(data) {
        // $log.debug('BasicStoredListMgr.prototype.addItem OK: item', item);
      }, function(reason) {
        $log.error('BasicStoredListMgr.prototype.addItem ErrorReason, item', reason, item);
      });
      return result;
    }; // BasicStoredListMgr.prototype.addItem

    BasicStoredListMgr.prototype.deleteItem = function (item) {
      var result = this.data.items.$remove(item).then(function(data) {
        // $log.debug('BasicStoredListMgr.prototype.deleteItem OK: item', item);
      }, function(reason) {
        $log.error('BasicStoredListMgr.prototype.deleteItem ErrorReason, item', reason, item);
      });
      return result;
    }; // BasicStoredListMgr.prototype.deleteItem

    BasicStoredListMgr.prototype.saveItem = function (item) {
      var result = this.data.items.$save(item).then(function(data) {
        // $log.debug('BasicStoredListMgr.prototype.saveItem OK: item', item);
      }, function(reason) {
        $log.error('BasicStoredListMgr.prototype.saveItem ErrorReason, item', reason, item);
      });
      return result;
    }; // BasicStoredListMgr.prototype.saveItem

    BasicStoredListMgr.prototype.prepareForLogout = function() {
      clearRefs(this.data);
    }; // BasicStoredListMgr.prototype.prepareForLogout


    // following for UNIT Testing
    BasicStoredListMgr.prototype.$$getData = function() {
      return this.data;
    };

    return BasicStoredListMgr;
  }]);
