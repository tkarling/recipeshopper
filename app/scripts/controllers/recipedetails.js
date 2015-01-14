'use strict';

/**
 * @ngdoc function
 * @name recipeshopperApp.controller:RecipeDetailsController
 * @description
 * # RecipeDetailsController
 * Controller of the recipeshopperApp
 */

angular.module('recipeshopperApp')
  .controller('RecipeDetailsController', ['$scope', '$routeParams', '$log', 'FB_RECIPES_URL', 'StoredListMgrFactory', 
  	function ($scope, $routeParams, $log, FB_RECIPES_URL, StoredListMgrFactory) { 
    currentTab=2;

	var setNextAndPrevItem = function () {
		if ($scope.whichItem > 0) {
			$scope.prevItem = Number($scope.whichItem) - 1;
		} else {
			$scope.prevItem = $scope.recipes.length - 1;
		}

		if ($scope.whichItem < $scope.recipes.length -1) {
			$scope.nextItem = Number($scope.whichItem) + 1;
		} else {
			$scope.nextItem = 0;
		}
	  	// $log.debug('$scope.whichItem: ', $scope.whichItem);
	  	// $log.debug('$scope.prevItem: ', $scope.prevItem);
	  	// $log.debug('$scope.nextItem: ', $scope.nextItem);
	}

  	$scope.whichItem = $routeParams.itemId;

    var recipesMgr = StoredListMgrFactory.getStoredListMgr(FB_RECIPES_URL);
	$scope.recipes = [];
    recipesMgr.getItems().then(function(data) {
    	$scope.recipes = data;
	    $scope.recipe = $scope.recipes[$scope.whichItem];
    	setNextAndPrevItem();
    });


  	// Following not needed, if add happens from list view
	// var addRecipe = function () {
	// 	recipesMgr.addItem({
	// 		category : 'Misc Recipes',
	//       	recipename : 'Recipe Name',
	//       	onlist : false
	// 	}).then(function () {
	// 		// $scope.recipename = '';
	// 		// $scope.category = '';
	// 		$scope.whichItem = $scope.recipes.length - 1;
	// 	});
	// }; // addRecipe

	//	if ($scope.whichItem === '0}}') {
	// 	addRecipe();
	// }


  }]);
