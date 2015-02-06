'use strict';

/**
 * @ngdoc service
 * @name recipeshopperApp.Authentication
 * @description
 * # Authentication
 * Factory in the recipeshopperApp.
 */

angular
.module('authenticationMod', [
  'firebase', 'settingsMod', 'storedListMod',
]);

angular.module('authenticationMod')
  .config(function($logProvider) {
    $logProvider.debugEnabled(true);
  })
  .factory('Authentication', ['$log','$location', '$rootScope', '$timeout', '$firebase', 'FIREBASE_URL', 'settingsMgr', 'StoredListMgrFactory',
    function ($log, $location, $rootScope, $timeout, $firebase, FIREBASE_URL, settingsMgr, StoredListMgrFactory) {
    $log.debug('Authentication: init factory');

    var data = {};
    data.userLoggedIn = false;
    var ref = new Firebase(FIREBASE_URL);

    var authDataCallback = function(authData) {
      $log.debug('authDataCallback called', authData);
      data.userLoggedIn = authData && authData.uid && authData.uid != undefined;
      settingsMgr.setCurrentUser(authData ? authData.uid : '');
    }; //authDataCallback

    ref.onAuth(authDataCallback);

    // Public API here
    return {
      login: function (user, authHandler) {
        $log.debug(user.email);
        ref.authWithPassword({
          email: user.email,
          password: user.password
        }, authHandler);
      }, //login

      register: function (user, authHandler) {
        $log.debug(user.email);
        ref.createUser({
          email: user.email,
          password: user.password
        }, authHandler);
      }, //register

      logout: function() {
        StoredListMgrFactory.prepareForLogout();
        // settingsMgr.setCurrentUser('');
        ref.unauth();
      }, // logout

      userLoggedIn: function () {
        return data.userLoggedIn;
      }, // userLoggedIn

      // This is practice for setting up unit testing
      useDependency: function () {
        $log.log('useDependency');
        $log.debug('useDependency');
        // console.log('console.log: useDependency');
        return $firebase.getSomething();
      } // userEmail
      
    }; 

  }]);
