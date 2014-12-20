'use strict';

/**
 * @ngdoc service
 * @name recipeshopperApp.Authentication
 * @description
 * # Authentication
 * Factory in the recipeshopperApp.
 */
 angular
.module('loginMod', [
   'firebase', 
]);

angular.module('loginMod')
  .factory('Authentication', ['$firebase', 'FIREBASE_URL', '$location', '$rootScope', '$timeout', 
    function ($firebase, FIREBASE_URL, $location, $rootScope, $timeout) {

    var data = {};
    data.userLoggedIn = false;
    var ref = new Firebase(FIREBASE_URL);
    // var authData = ref.getAuth();
    // if (authData) {
    //   console.log("User " + authData.uid + " is logged in with " + authData.provider);
    //   // console.log("logging out now");
    //   // ref.unauth();
    // } else {
    //   console.log("User is logged out");
    // }

    var setUserEmail = function (userEmail) {
        data.userEmail = userEmail;
        data.userLoggedIn = (data.userEmail != undefined);
        $timeout(function () {
          // timeout needed to have time to create the controller receivig this
          $rootScope.$broadcast('handleUserLoggedInChanged');
        }, 100);
        // $rootScope.$broadcast('handleUserLoggedInChanged');
        console.log("User email set", data.userEmail, userEmail);
      } // setErrorMessage

    var authDataCallback = function(authData) {
      console.log('authDataCallback called', authData);
      if (authData) {
        console.log("User " + authData.uid + " is logged in with " + authData.provider);
        // console.log("authData: ", authData);
        // $scope.$apply(setUserEmail(authData.password.email));
        if(authData.password) {
          setUserEmail(authData.password.email);
        } else {
          setUserEmail(undefined);
        }
      } else {
        console.log("User is logged out");
        setUserEmail(undefined);
      }
    } //authDataCallback

    ref.onAuth(authDataCallback);

    // Public API here
    return {
      login: function (user, authHandler) {
        console.log(user.email);
        ref.authWithPassword({
          email: user.email,
          password: user.password
        }, authHandler);
      }, //login

      logout: function() {
        ref.unauth();
      }, // logout

      userEmail: function () {
        return data.userEmail;
      }, // userEmail

      userLoggedIn: function () {
        return data.userLoggedIn;
      } // userLoggedIn
      
    }; 

  }]);
