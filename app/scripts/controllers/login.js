'use strict';

/**
 * @ngdoc function
 * @name recipeshopperApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the recipeshopperApp
 */
angular.module('recipeshopperApp')
  .controller('LoginCtrl', ['$scope', '$firebase', '$location', 'Authentication', 
    function ($scope, $firebase, $location, Authentication) {
  	// $scope.$on('$viewContentLoaded', function() {
  	// 	console.log($scope.myform);
  	// });
    
    currentTab=0;

    var setErrorMessage = function (errorMessage) {
      $scope.message = errorMessage;
      console.log("Login Failed!", $scope.message, errorMessage);
    } // setErrorMessage

    var loginAuthHandler = function (error, authData) {
      if (error) {
        $scope.$apply(setErrorMessage(error.message));
        console.log('logging out now');
        Authentication.logout();
      } else {
        console.log("Authenticated successfully with payload:", authData);
        $scope.$apply($location.path('/main'));
      }
    } // loginAuthHandler

    $scope.login = function () {
      Authentication.login($scope.user, loginAuthHandler);
    } // login

    $scope.logout = function () {
      Authentication.logout();
      // $location.path('/login'); // not really needed as on login page already
    } // logout

    var registerAuthHandler = function (error, authData) {
      if (error) {
        $scope.$apply(setErrorMessage(error.message));
        console.log('Registration failed.');
      } else {
        console.log("Registered successfully with payload:", authData);
        $scope.login();
      }
    } // registerAuthHandler

  	$scope.register = function () {
      Authentication.register($scope.user, registerAuthHandler);
  	} // register

    $scope.userEmail = Authentication.userEmail();
    $scope.userLoggedIn = Authentication.userLoggedIn();

  }]);
