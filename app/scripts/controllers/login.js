'use strict';

/**
 * @ngdoc function
 * @name recipeshopperApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the recipeshopperApp
 */
angular.module('recipeshopperApp')
  .controller('LoginCtrl', function ($scope, $location) {
  	// $scope.$on('$viewContentLoaded', function() {
  	// 	console.log($scope.myform);
  	// });

  	$scope.login = function () {
  		console.log($scope.user.email);
  		$location.path('/main');
  	} // login
    
  	$scope.register = function () {
  		console.log($scope.user.email);
  		$location.path('/main');
  	} // register

  });
