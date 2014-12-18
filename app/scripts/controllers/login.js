'use strict';

/**
 * @ngdoc function
 * @name recipeshopperApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the recipeshopperApp
 */
angular.module('recipeshopperApp')
  .controller('LoginCtrl', ['$scope', '$firebase', '$location', function ($scope, $firebase, $location) {
  	// $scope.$on('$viewContentLoaded', function() {
  	// 	console.log($scope.myform);
  	// });
    
    // $scope.message = 'moi';
    // console.log('$scope.message', $scope.message);

    var ref = new Firebase('https://recipeshopper.firebaseio.com');
    var authData = ref.getAuth();
    if (authData) {
      console.log("User " + authData.uid + " is logged in with " + authData.provider);
      console.log("logging out now");
      ref.unauth();
    } else {
      console.log("User is logged out");
    }

    var authHandler = function (error, authData) {
      if (error) {
        $scope.message = error.message;
        console.log("Login Failed!", $scope.message, error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
        $location.path('/main');
      }
    }

    $scope.login = function () {
      console.log($scope.user.email);
      ref.authWithPassword({
        email: $scope.user.email,
        password: $scope.user.password
      }, authHandler);
    } // login


  	$scope.register = function () {
  		console.log($scope.user.email);
  		$location.path('/main');
  	} // register

  }]);
