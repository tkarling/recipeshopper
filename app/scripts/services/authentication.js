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
  .factory('Authentication', function ($firebase, FIREBASE_URL, $location, $rootScope) {

    var data = {};
    var ref = new Firebase(FIREBASE_URL);
    var authData = ref.getAuth();
    if (authData) {
      console.log("User " + authData.uid + " is logged in with " + authData.provider);
      // console.log("logging out now");
      // ref.unauth();
    } else {
      console.log("User is logged out");
    }

    var setUserEmail = function (userEmail) {
        data.userEmail = userEmail;
        console.log("User email set", data.userEmail, userEmail);
      } // setErrorMessage

    var authDataCallback = function(authData) {
      if (authData) {
        console.log("User " + authData.uid + " is logged in with " + authData.provider);
        console.log("authData: ", authData);
        // $scope.$apply(setUserEmail(authData.password.email));
        if(authData.password) {
          setUserEmail(authData.password.email);
        } else {
          setUserEmail(undefined);
        }
      } else {
        console.log("User is logged out");
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
      } // userEmail
      
    }; 

  });
