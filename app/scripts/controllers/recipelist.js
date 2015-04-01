'use strict';

/**
 * @ngdoc function
 * @name recipeshopperApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the recipeshopperApp
 */
angular.module('recipeshopperApp')
  .controller('RecipelistCtrl', ['$scope', '$log', '$location',  
  	'FB_RECIPES_URL', 'FB_SHOPPINGLIST_URL', 'StoredListMgrFactory', 'settingsMgr', 
  	function ($scope, $log, $location, FB_RECIPES_URL, FB_SHOPPINGLIST_URL, StoredListMgrFactory, settingsMgr) {
	$log.debug('RecipelistCtrl: init');
	// console.log('RecipelistCtrl: init');

    $scope.gotoDetailsPage = function(item) {
    	$log.debug('RecipelistCtrl:gotoDetailsPage moi');
    	var pagelink='/recipedetails/'+ $scope.data.myItems.indexOf(item);
	    $log.debug('RecipelistCtrl: pagelink: ', pagelink);
	    $location.path(pagelink);
    };

    $scope.gotoAddPage = function() {
    	var pagelink='/recipedetails/Add';
	    $log.debug('BaselistCtrl: pagelink: ', pagelink);
	    $location.path(pagelink);
    };

	if(! $scope.data) {
		$scope.data = {};
	}	
	$scope.setStoreId(FB_RECIPES_URL);

	$scope.addRecipe = function (recipe, category) {
		return $scope.data.storeMgr.addItem({
		  category : category,
	      recipename : recipe,
	      onlist : false
		});
	}; // addRecipe

	$scope.deleteRecipe = function (recipe) {
		$log.debug('RecipelistCtrl: deleteRecipe: ', recipe);
		$scope.deleteItem(recipe);

		// delete ingredients of the recipe 
  		$log.debug('RecipelistCtrl: deleteItem: recipe', recipe, recipe.$id);
  		var ingredientsMgr = StoredListMgrFactory.getStoredListMgr(FB_SHOPPINGLIST_URL);
  		ingredientsMgr.getItems('recipeId', recipe.$id).then(function(ingredients) {
  			if(ingredients) {
	  			for(var i = 0; i < ingredients.length; i++) {
	  				ingredientsMgr.deleteItem(ingredients[i]);
	  			} 
  			}
	    });
	}; // deleteRecipe

	$scope.saveRecipe = function (recipe) {
		$log.debug('RecipelistCtrl: saveItem: ', 	recipe);
		$scope.saveItem(recipe);

		// add or remove ingredients of the recipe from the shopping list based on onlist status
  		$log.debug('RecipelistCtrl: saveItem: recipe', recipe, recipe.$id, recipe.onlist);
  		var ingredientsMgr = StoredListMgrFactory.getStoredListMgr(FB_SHOPPINGLIST_URL);
  		ingredientsMgr.getItems('recipeId', recipe.$id).then(function(ingredients) {
  			if(ingredients) {
	  			for(var i = 0; i < ingredients.length; i++) {
	  				ingredients[i].isonlist = recipe.onlist;
	  				ingredients[i].isbought = false; // reset isbought when added to list
	  				ingredientsMgr.saveItem(ingredients[i]);
	  			} 
  			}
	    });

	}; // saveRecipe

  }]);
