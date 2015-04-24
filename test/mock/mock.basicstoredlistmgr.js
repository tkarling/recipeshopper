(function () {

  'use strict';

  angular.module('storedListMod.mock', []);

  angular.module('storedListMod.mock').factory('StoredListMgrFactory',
    ['$q', 'BasicStoredListMgr',
      function ($q, BasicStoredListMgr) {
        var factory = {};

        factory.getSharedStoredListMgr = function (fbUrlWNoBase, fieldNameOrVariableUrl, fieldValue) {
          //console.log('factory.getSharedStoredListMgr mock');
          return BasicStoredListMgr;
        };

        factory.getUsersStoredListMgr = function (fbUrlWNoBase, fieldNameOrVariableUrl, fieldValue) {
          //console.log('factory.getUsersStoredListMgr mock');
          return BasicStoredListMgr;
        };

        factory.prepareForLogout = function () {
          //console.log('factory.prepareForLogout mock');
        };

        return factory;
      }
    ]);

  angular.module('storedListMod.mock').factory('BasicStoredListMgr',
    ['$q',
      function ($q) {
        var factory = {};

        var mockedItems;
        factory.$$setMockedItems = function (items) {
          mockedItems = items;
        };

        factory.getItemsSync = function (tellWhenLoaded, fieldName, fieldValue) {
          return mockedItems;
        };

        factory.getItems = function (fieldName, fieldValue) {
          var defer = $q.defer();
          defer.resolve(mockedItems);
          return defer.promise;
        };

        var mockRef;
        factory.addItem = function (item) {
          var defer = $q.defer();
          defer.resolve(mockRef);
          return defer.promise;
        };

        factory.deleteItem = function (item) {
          var defer = $q.defer();
          defer.resolve(mockRef);
          return defer.promise;
        };

        factory.saveItem = function (item) {
          var defer = $q.defer();
          defer.resolve(mockRef);
          return defer.promise;
        };

        return factory;
      }
    ]);
})();

