'use strict';

/**
 * @ngdoc function
 * @name recipeshopperApp.controller:RecipeDetailsController
 * @description
 * # RecipeDetailsController
 * Controller of the recipeshopperApp
 */

angular.module('recipeshopperApp')
  .controller('RecipeDetailsController', ['$scope', function ($scope) { //, localStorageService
    currentTab=3;

 	// var imageSrcsInStore = [];
	// if(localStorageService) {
	// 	console.log('localStorageService exists');
	// 	imageSrcsInStore = localStorageService.get('imageSrcs');
	// 	console.log('imageSrcsInStore', imageSrcsInStore);
	// }
	// $scope.imageSrcs = imageSrcsInStore || [];
	// console.log('$scope.imageSrcs', $scope.imageSrcs);

 	//  $scope.$watch('imageSrcs', function () {
	// 	if(localStorageService) {
	// 		localStorageService.set('imageSrcs', $scope.imageSrcs);
	// 	  	console.log('$scope.imageSrcs after set ', $scope.imageSrcs);
	// 	}
	// }, true);

  }]);
