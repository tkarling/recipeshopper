'use strict';

/**
 * @ngdoc function
 * @name recipeshopperApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the recipeshopperApp
 */
angular.module('recipeshopperApp')
  .controller('MainCtrl', ['$scope', '$http', '$document', function ($scope, $http, $document) {
    currentTab=1;

    // read groceries data
	$scope.groceries = groceriesData;
	if($scope.groceries.length === 0) {
		$scope.groceries = [];
		$http.get('data/groceries.json').success(function(data){ 
		  $scope.groceries = data;
		  groceriesData = data;
		  updateLineThroughs();
		});
	}

	$scope.itemOrder = 'aisle';

	$scope.toggleLineThrough = function () {
		console.log("toggleLineThrough");
	}

	var updateLineThroughs = function () {
		var elementItems = $document.find(".rs-well");
		// var elementItems = $document.find("h3");
		console.log("elementItems.length: " + elementItems.length ); //+ elementItems[0].class
		for(var i=0; i < elementItems.length; i++ ) {
			console.log("i: " + i);
			if($scope.groceries[i].isbought) {
				console.log("i in if: " + i);
				elementItems.eq(i).addClass("rs-line-through");
			} else {
				elementItems.eq(i).removeClass("rs-line-through");
			}
		}
	}



  }]);

var groceriesData = [];