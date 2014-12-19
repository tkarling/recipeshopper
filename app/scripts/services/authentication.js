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

    var ref = new Firebase(FIREBASE_URL);
    var authData = ref.getAuth();
    if (authData) {
      console.log("User " + authData.uid + " is logged in with " + authData.provider);
      // console.log("logging out now");
      // ref.unauth();
    } else {
      console.log("User is logged out");
    }

    // var authHandler = function (error, authData) {
    //   if (error) {
    //     // $scope.message = error.message;
    //     // console.log("Login Failed!", $scope.message, error);
    //     console.log("Login Failed!", error);
    //   } else {
    //     console.log("Authenticated successfully with payload:", authData);
    //     $rootScope.$apply($location.path('/main'));
    //   }
    // }

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
      } // logout
      
    }; 

  });
