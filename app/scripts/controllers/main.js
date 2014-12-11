'use strict';

/**
 * @ngdoc function
 * @name recipeshopperApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the recipeshopperApp
 */
angular.module('recipeshopperApp')
  .directive('lineThrough', function() {
  	return function (scope, element, attrs) {
 		var isBought = attrs['lineThrough'];
 		var watcherFn = function (watchscope) {
 			return watchscope.$eval(isBought);
 		};
 		scope.$watch(watcherFn, function(newValue) {
			console.log('lineThrough: newValue: ' + newValue);
 			if(newValue) {
		 		element.find('span').addClass('rs-line-through');
		 	} else {
		 		element.find('span').removeClass('rs-line-through');
		 	}
 		});

		// var index = scope.$eval(attrs['lineThrough']);
		// console.log('index: ' + index); 
 		// (function () {	// IIFE not needed i this case
 		// }());
  	};
  })
  .controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
    currentTab=1;

    // read groceries data
	$scope.groceries = groceriesData;
	if($scope.groceries.length === 0) {
		$scope.groceries = [];
		$http.get('data/groceries.json').success(function(data){ 
		  $scope.groceries = data;
		  groceriesData = data;
		});
	}

	// init  
	$scope.itemOrder = 'aisle';
	$scope.showAllDef = false;

	$scope.$watch('showAllDef', function(newValue) {
		console.log('newValue: ' + newValue);
		$scope.showAll = newValue ? ! newValue : undefined;
		// undefined -show all, true - show unbought only
	});

  }]);

var groceriesData = [];