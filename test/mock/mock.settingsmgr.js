(function () {

  'use strict';

  angular.module('settingsMod.mock', []);

  angular.module('settingsMod.mock').factory('settingsMgr',
    ['$q',
      function ($q) {
        var factory = {};

        var mockedUser;
        factory.$$setMockedUser = function (user) {
          mockedUser = user;
        };

        var mockedSettings;
        factory.$$setMockedSettings = function (settings) {
          mockedSettings = settings;
          mockedSettings.myUid = mockedUser;
        };

        factory.addUser = function (userUid, user) {
        };

        var currentUserError;
        factory.$$setCurrentUserError = function(error) {
          currentUserError = error;
        };
        factory.setCurrentUser = function (userUid) {
          //console.log('factory.setCurrentUser mock');
          mockedUser = userUid;
          var defer = $q.defer();
          if(currentUserError) {
            defer.reject({message: currentUserError});
            currentUserError = undefined;
          } else {
            defer.resolve(factory.mockedSettings);
          }
          return defer.promise;
        };

        factory.getCurrentUser = function () {
          //console.log('factory.getCurrentUser mock');
          return mockedUser;
        };

        factory.getSettings = function () {
          return mockedSettings;
        };

        factory.saveSettings = function () {
        };

        return factory;
      }
    ]);

})();

