'use strict';

/**
 * @ngdoc function
 * @name recipeshopperApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the recipeshopperApp
 */
angular.module('recipeshopperApp')
  .directive("lineThrough", function() {
  	return function (scope, element, attrs) {
 		var isBought = attrs["lineThrough"];
 		var watcherFn = function (watchscope) {
 			return watchscope.$eval(isBought);
 		}
 		scope.$watch(watcherFn, function(newValue, oldValue) {
 			if(newValue) {
		 		element.find("span").addClass("rs-line-through");
		 	} else {
		 		element.find("span").removeClass("rs-line-through");
		 	}
 		});
 		
		// var index = scope.$eval(attrs["lineThrough"]);
		// console.log("index: " + index); 
 		// (function () {	// IIFE not needed i this case
 		// }());
  	}
  })
  .controller('MainCtrl', ['$scope', '$http', '$document', function ($scope, $http, $document) {
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

	// initial setting for sort order 
	$scope.itemOrder = 'aisle';

  }]);

var groceriesData = [];