'use strict';

/**
 * @ngdoc function
 * @name recipeshopperApp.controller:RecipeDetailsController
 * @description
 * # RecipeDetailsController
 * Controller of the recipeshopperApp
 */

angular.module('recipeshopperApp')
  .controller('RecipeDetailsController', ['$scope', '$routeParams', '$log', '$location', '$http', 'FB_RECIPES_URL', 'FB_SHOPPINGLIST_URL', 'StoredListMgrFactory', 
  	function ($scope, $routeParams, $log, $location, $http, FB_RECIPES_URL, FB_SHOPPINGLIST_URL, StoredListMgrFactory) { 

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
	};

    $scope.gotoPrevItem = function(){
    	$log.debug('RecipeDetailsController: $scope.gotoPrevItem()');
    	$location.path('/recipedetails/' + $scope.prevItem);
    };

    $scope.gotoNextItem = function(){
    	$log.debug('RecipeDetailsController: $scope.gotoNextItem()');
    	$location.path('/recipedetails/' + $scope.nextItem);
    };

	$scope.data = {
      selectedIndex : 0
    };
    $scope.gotoNextTab = function() {
		$log.debug('RecipeDetailsController: gotoNextTab');
      	$scope.data.selectedTabIndex = Math.min($scope.data.selectedTabIndex + 1, 2) ;
    };
    $scope.gotoPreviousTab = function() {
		$log.debug('RecipeDetailsController: gotoPreviousTab');
      $scope.data.selectedTabIndex = Math.max($scope.data.selectedTabIndex - 1, 0);
    };

  	
  	$scope.whichItem = $routeParams.itemId;

    var ingredientsMgr; 
  	var setIngredientsMgrAndIngredients = function () {
  		if($scope.recipe) {
		    ingredientsMgr = StoredListMgrFactory.getStoredListMgr(FB_SHOPPINGLIST_URL);
		    ingredientsMgr.getItems('recipeId', $scope.recipe.$id).then(function(data) {
		    	$scope.ingredients = data;
	    		// $log.debug('setIngredientsMgrAndIngredients: $scope.ingredients: ', $scope.ingredients);
		    });
  		}
  	};

    var recipesMgr = StoredListMgrFactory.getStoredListMgr(FB_RECIPES_URL);
	$scope.recipes = [];
    recipesMgr.getItems().then(function(data) {
    	$scope.recipes = data;
	    $scope.recipe = ($scope.recipes.length > 0) ? $scope.recipes[$scope.whichItem]: null;
	    setIngredientsMgrAndIngredients();
    	setNextAndPrevItem();
    	// if($scope.recipe && $scope.recipe.instructions) {
    	// 	$log.debug('$scope.recipe.instructions: ', $scope.recipe.instructions);
    	// }
    });

    $scope.readIngredients = function() {
		$http.get('data/beanCarrotGingerSoup.json').success(function(data){ 
			var items = data;  
			$log.debug('RecipeDetailsController.readIngredients: items', items);
			var item = {recipeId: $scope.recipe.$id, recipe: $scope.recipe.recipename, isonlist: true, isbought: false};
			for(var i = 0; i < items.length; i++) {
				if(items[i].product) {
					item.product = items[i].product;
				}
				if(items[i].aisle) {
					item.aisle = items[i].aisle;
				}
				if(items[i].unit) {
					item.unit = items[i].unit;
				}
				if(items[i].amount) {
					item.amount = items[i].amount;
				}
				// $log.debug(item);
				ingredientsMgr.addItem(item);
			}
		});
    };

    $scope.deleteIngredient = function(item) {
    	ingredientsMgr.deleteItem(item);
    }; // deleteIngredient

    // is not used at the moment
    $scope.saveIngredient = function(item) {
    	ingredientsMgr.saveIngredient(item);
    }; // saveIngredient


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
