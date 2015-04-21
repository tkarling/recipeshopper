(function () {

  'use strict';

  angular.module('authenticationMod.mock', ['authenticationMod']);

  angular.module('authenticationMod.mock').factory('Authentication',
    ['$q',
      function ($q) {
        var factory = {};

        var mockAuthData;
        factory.$$setMockedAuthData = function (authData) {
          mockAuthData = authData;
        };
        var loginError;
        factory.$$setLoginError = function (error) {
          loginError = {message: error};
        };
        factory.login = function (user) {
          var defer = $q.defer();
          if (loginError) {
            defer.reject(loginError);
            loginError = undefined;
          } else {
            defer.resolve(mockAuthData);
          }
          return defer.promise;
        };

        var registeringError;
        factory.$$setRegisteringError = function (error) {
          registeringError = {message: error};
        };
        factory.register = function (user) {
          var defer = $q.defer();
          if (registeringError) {
            defer.reject(registeringError);
            registeringError = undefined;
          } else {
            defer.resolve(mockAuthData);
          }
          return defer.promise;
        };

        factory.logout = function (user) {
        };

        return factory;
      }
    ]);

})();
