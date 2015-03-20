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

   	var getSettings = function() {
   		$scope.mySettings = settingsMgr.getSettings();
   	};

  	var getRecipes = function () {
	    recipesMgr = StoredListMgrFactory.getStoredListMgr(FB_RECIPES_URL);
	    recipesMgr.getItems().then(function(data) {
	    	$scope.recipes = data;
	    });
  	};

   	var initFromStores = function () {
        $scope.currentUser = settingsMgr.getCurrentUser();
		$log.debug('RecipelistCtrl: initFromStores $scope.currentUser', $scope.currentUser);
    	if($scope.currentUser) {
    		getSettings();
    		getRecipes();
    	} else {
    		$location.path('/login');
    	}
   	};


	$scope.$on('handleCurrentUserSet', function () {
		$log.debug('RecipelistCtrl: handleCurrentUserSet call init from store');
		initFromStores();
    });

	var recipesMgr;
	$scope.recipes = [];
  	$scope.mySettings = {};
	$log.debug('RecipelistCtrl: call init from store');
	initFromStores();
	$scope.itemOrder = 'recipename';

    $scope.gotoDetailsPage = function(item) {
      // var pagelink='/recipedetails/'+ item.$id;	
      var pagelink='/recipedetails/'+ $scope.recipes.indexOf(item);	
      $log.debug('RecipelistCtrl: pagelink: ', pagelink);
      $location.path(pagelink);
    };

	$scope.addRecipe = function (recipe, category) {
		return recipesMgr.addItem({
		  category : category,
	      recipename : recipe,
	      onlist : false
		});
	}; // addRecipe

	$scope.deleteItem = function(item) {
		$log.debug('RecipelistCtrl: deleteRecipe: ', item);
		recipesMgr.deleteItem(item);
	}; // deleteRecipe

	$scope.saveItem = function(recipe) {
		$log.debug('RecipelistCtrl: saveItem: ', 	recipe);
		recipesMgr.saveItem(recipe);

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

	}; // saveItem

  }]);
