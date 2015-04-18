(function () {

  'use strict';

  angular.module('settingsMod.mock', ['settingsMod']);

  angular.module('settingsMod.mock').factory('settingsMgrMock',
    ['$q',
      function ($q) {
        var factory = {};

        factory.mockedUser = '';
        factory.$$setMockedUser = function (user) {
          factory.mockedUser = user;
        };

        factory.mockedSettings = {
          email: 'testuser@test.com',
          myUid: factory.mockedUser
        };

        factory.getCurrentUser = function () {
          return factory.mockedUser;
        };

        factory.getSettings = function () {
          return factory.mockedSettings;
        };

        factory.saveSettings = function () {
          var defer = $q.defer();
          defer.resolve(this.mockedSettings);
          //defer.promise.then(callback);
          return defer.promise;
        };

        return factory;
      }
    ]);

})();

