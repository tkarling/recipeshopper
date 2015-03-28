'use strict';

/**
 * @ngdoc function
 * @name recipeshopperApp.controller:ProductDetailsController
 * @description
 * # ProductDetailsController
 * Controller of the recipeshopperApp
 */
angular.module('recipeshopperApp')
  .controller('ProductDetailsController', function ($scope, $routeParams, $log) {

  	// Start from first tab
	$scope.data = {
      selectedTabIndex : 0
    };

    $scope.currentItem = {
      // myIndex: $routeParams.indexId || 0,
      myItemId: $routeParams.itemId,
    };
    $log.debug('ProductDetailsController: $scope.currentItem', $scope.currentItem);

	$scope.saveItem = function () {
	    $log.debug('ProductDetailsController: saveItem', $scope.currentItem);
	}; // $scope.saveItem


  });
