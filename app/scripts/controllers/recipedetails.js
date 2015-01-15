'use strict';

/**
 * @ngdoc function
 * @name recipeshopperApp.controller:RecipeDetailsController
 * @description
 * # RecipeDetailsController
 * Controller of the recipeshopperApp
 */

angular.module('recipeshopperApp')
  .controller('RecipeDetailsController', ['$scope', '$routeParams', '$log', '$location', 'FB_RECIPES_URL', 'StoredListMgrFactory', 
  	function ($scope, $routeParams, $log, $location, FB_RECIPES_URL, StoredListMgrFactory) { 
    currentTab=2;

	var setNextAndPrevItem = function () {
		if ($scope.whichItem > 0) {
			$scope.prevItem = Number($scope.whichItem) - 1;
		} else {
			$scope.prevItem = Math.max($scope.recipes.length - 1, 0);
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

    $scope.gotoPrevItem = function(){
    	$log.debug('RecipeDetailsController: $scope.gotoPrevItem()');
    	$location.path('/recipedetails/' + $scope.prevItem);
    };

    $scope.gotoNextItem = function(){
    	$log.debug('RecipeDetailsController: $scope.gotoNextItem()');
    	$location.path('/recipedetails/' + $scope.nextItem);
    };

  	$scope.whichItem = $routeParams.itemId;

    var recipesMgr = StoredListMgrFactory.getStoredListMgr(FB_RECIPES_URL);
	$scope.recipes = [];
    recipesMgr.getItems().then(function(data) {
    	$scope.recipes = data;
	    $scope.recipe = ($scope.recipes.length > 0) ? $scope.recipes[$scope.whichItem]: null;
    	setNextAndPrevItem();
    	if($scope.recipe && $scope.recipe.instructions) {
    		$log.debug('$scope.recipe.instructions: ', $scope.recipe.instructions);
    	}
    });

    // var myTab = 2;
    // $scope.setTab = function(tab){
    //   myTab = tab;
    // };

    // $scope.isSet = function(tab){
    //   return (myTab === tab);
    // };

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
