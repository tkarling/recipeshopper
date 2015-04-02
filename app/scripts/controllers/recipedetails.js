'use strict';

/**
 * @ngdoc function
 * @name recipeshopperApp.controller:RecipeDetailsController
 * @description
 * # RecipeDetailsController
 * Controller of the recipeshopperApp
 */

angular.module('recipeshopperApp')
  .controller('RecipeDetailsController', ['$scope', '$routeParams', '$log', '$location', '$http', 
  	'FB_RECIPES_URL', 'FB_SHOPPINGLIST_URL', 'StoredListMgrFactory', 'settingsMgr', 
  	function ($scope, $routeParams, $log, $location, $http, 
  		FB_RECIPES_URL, FB_SHOPPINGLIST_URL, StoredListMgrFactory, settingsMgr) { 

	// Start from first tab
	$scope.data = {
      selectedTabIndex : 0
    };
    $scope.recipe = {};
    $log.debug('RecipeDetailsController: $routeParams.itemId', $routeParams.itemId);

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

    $scope.readIngredients = function() {
    	$scope.recipe.onlist = true;
    	$scope.recipesMgr.saveItem($scope.recipe);
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

    $scope.deleteItem = function(item) {
    	ingredientsMgr.deleteItem(item);
    }; // deleteIngredient

    // is not used at the moment
    $scope.saveIngredient = function(item, itemWasPutOnList) {
		if(itemWasPutOnList) {
			item.isbought = false;
		}
    	ingredientsMgr.saveItem(item);
    }; // saveIngredient


	var initRecipe = function() {
      var currentUser = settingsMgr.getCurrentUser();
		// $log.debug('RecipeDetailsController: initRecipe currentUser', currentUser);
    	if(currentUser) {
	        if($routeParams.itemId) {
	          $scope.recipesMgr = StoredListMgrFactory.getStoredListMgr(FB_RECIPES_URL);
	          if($routeParams.itemId != 'Add') {
	            $scope.recipe = $scope.recipesMgr.getItem($routeParams.itemId);
	          } 
	          setIngredientsMgrAndIngredients();
	        }
    	} else {
        	$location.path('/login');
      	}
	}; // initRecipe

	$scope.$on('handleCurrentUserSet', function () {
        initRecipe();
    });
    initRecipe();

	$scope.addOrSaveRecipe = function () {
	    $log.debug('RecipeDetailsController: addOrSaveRecipe', $scope.recipe);
      if($routeParams.itemId == 'Add') {
        $scope.recipe.onlist = true;
        $scope.recipesMgr.addItem($scope.recipe);
      } else {
        $scope.recipesMgr.saveItem($scope.recipe);
      }
	}; // addOrSaveRecipe

   	$scope.gotoDetailsPage = function(item, fromListId) {
    	var pagelink='/productdetails/List/'+ fromListId + '/Item/' + item.$id;
	    $log.debug('RecipeDetailsController: gotoDetailsPage pagelink: ', pagelink);
	    $location.path(pagelink);
    }; // gotoDetailsPage

	$scope.getTitle = function() {
	    var recipeName = $scope.recipe ? $scope.recipe.recipename : '';
	    return ($routeParams.itemId == 'Add') ? 'Add Recipe' : recipeName;
	}; // getTitle

  }]);
