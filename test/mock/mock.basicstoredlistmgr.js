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

        factory.mockedItems = [];
        factory.$$setMockedItems = function (items) {
          factory.mockedItems = items;
        };

        factory.getItemsSync = function (tellWhenLoaded, fieldName, fieldValue) {
          this.mockedItems;
        };

        factory.getItems = function (fieldName, fieldValue) {
          var defer = $q.defer();
          defer.resolve(this.mockedItems);
          //defer.promise.then(callback);
          return defer.promise;
        };

        factory.addItem = function (item) {
          var defer = $q.defer();
          defer.resolve(this.mockedItems);
          //defer.promise.then(callback);
          return defer.promise;
        };

        factory.deleteItem = function (item) {
          var defer = $q.defer();
          defer.resolve(this.mockedItems);
          //defer.promise.then(callback);
          return defer.promise;
        };

        factory.saveItem = function (item) {
          var defer = $q.defer();
          defer.resolve(this.mockedItems);
          //defer.promise.then(callback);
          return defer.promise;
        };

        return factory;
      }
    ]);
})();

