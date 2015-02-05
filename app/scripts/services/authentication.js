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
  'firebase', 'storedListMod',
]);

angular.module('authenticationMod')
  .config(function($logProvider) {
    $logProvider.debugEnabled(true);
  })
  .factory('Authentication', ['$log','$location', '$rootScope', '$timeout', '$firebase', 'FIREBASE_URL', 'StoredListMgrFactory',
    function ($log, $location, $rootScope, $timeout, $firebase, FIREBASE_URL, StoredListMgrFactory) {

    var data = {};
    data.userLoggedIn = false;
    var ref = new Firebase(FIREBASE_URL);
    // // var authData = ref.getAuth();
    // // if (authData) {
    // //   console.log("User " + authData.uid + " is logged in with " + authData.provider);
    // //   // console.log("logging out now");
    // //   // ref.unauth();
    // // } else {
    // //   console.log("User is logged out");
    // // }

    var setUserEmail = function (userEmail) {
        data.userEmail = userEmail;
        data.userLoggedIn = (data.userEmail !== undefined);
        $timeout(function () {
          // timeout needed to have time to create the controller receivig this
          $rootScope.$broadcast('handleUserLoggedInChanged');
        }, 100);
        $log.debug('User email set', data.userEmail, userEmail);
      }; // setErrorMessage

    var authDataCallback = function(authData) {
      $log.debug('authDataCallback called', authData);
      if (authData) {
        $log.debug('User ' + authData.uid + ' is logged in with ' + authData.provider);
        // console.log("authData: ", authData);
        // $scope.$apply(setUserEmail(authData.password.email));
        if(authData.password) {
          setUserEmail(authData.password.email);
        } else {
          setUserEmail(undefined);
        }
      } else {
        $log.debug('User is logged out');
        setUserEmail(undefined);
      }
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
        ref.unauth();
      }, // logout

      userEmail: function () {
        return data.userEmail;
      }, // userEmail

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
