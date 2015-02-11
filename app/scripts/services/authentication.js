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
  .factory('Authentication', ['$log','$firebaseAuth', 'FIREBASE_URL', 'settingsMgr', 'StoredListMgrFactory',
    function ($log, $firebaseAuth, FIREBASE_URL, settingsMgr, StoredListMgrFactory) {
    $log.debug('Authentication: init factory');

    var data = {};
    data.userLoggedIn = false;
    data.ref = new Firebase(FIREBASE_URL);
    data.authObj = $firebaseAuth(data.ref);

    var authDataCallback = function(authData) {
      $log.debug('Authentication: authDataCallback called', authData);
      data.userLoggedIn = authData && authData.uid && authData.uid != undefined;
      settingsMgr.setCurrentUser(authData ? authData.uid : '');
    }; //authDataCallback

    data.ref.onAuth(authDataCallback);

    // Public API here
    return {
      login: function (user) {
        $log.debug('Authentication: login', user.email);
        return data.authObj.$authWithPassword({
          email: user.email,
          password: user.password
        });
      }, //login

      register: function (user) {
        $log.debug('Authentication: register', user.email);
        return data.authObj.$createUser({
          email: user.email,
          password: user.password
        });
      }, //register

      logout: function() {
        StoredListMgrFactory.prepareForLogout();
        return data.authObj.$unauth();
      } // logout
      
    }; 

  }]);
