(function () {

  'use strict';

  angular.module('storedListMod.mock', ['storedListMod']);

  angular.module('storedListMod.mock').factory('StoredListMgrFactoryMock',
    ['$q', 'BasicStoredListMgrMock',
      function ($q, BasicStoredListMgrMock) {
        var factory = {};

        factory.getSharedStoredListMgr = function (fbUrlWNoBase, fieldNameOrVariableUrl, fieldValue) {
          return BasicStoredListMgrMock;
        };

        factory.getUsersStoredListMgr = function (fbUrlWNoBase, fieldNameOrVariableUrl, fieldValue) {
          return BasicStoredListMgrMock;
        };

        return factory;
      }
    ]);

  angular.module('storedListMod.mock').factory('BasicStoredListMgrMock',
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

