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
    
    var setErrorMessage = function (errorMessage) {
      $scope.message = errorMessage;
      console.log("Login Failed!", $scope.message, errorMessage);
    } // setErrorMessage

    var authHandler = function (error, authData) {
      if (error) {
        $scope.$apply(setErrorMessage(error.message));
        console.log('logging out now');
        Authentication.logout();
      } else {
        console.log("Authenticated successfully with payload:", authData);
        $scope.$apply($location.path('/main'));
      }
    } // authHandler

    $scope.login = function () {
      Authentication.login($scope.user, authHandler);
    } // login


  	$scope.register = function () {
  		console.log($scope.user.email);
  		$location.path('/main');
  	} // register

  }]);
