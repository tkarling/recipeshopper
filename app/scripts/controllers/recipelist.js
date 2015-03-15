'use strict';

/**
 * @ngdoc function
 * @name recipeshopperApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the recipeshopperApp
 */
angular.module('recipeshopperApp')
  .constant('FB_RECIPES_URL', 'https://recipeshopper.firebaseio.com/recipes')
  .controller('RecipelistCtrl', ['$scope', '$log', '$location',  
  	'FB_RECIPES_URL', 'StoredListMgrFactory', 'settingsMgr', 
  	function ($scope, $log, $location, FB_RECIPES_URL, StoredListMgrFactory, settingsMgr) {

  	var getRecipes = function () {
	    recipesMgr = StoredListMgrFactory.getStoredListMgr(FB_RECIPES_URL);
	    recipesMgr.getItems().then(function(data) {
	    	$scope.recipes = data;
	    });
  	};

   	var getSettings = function() {
   		$scope.mySettings = settingsMgr.getSettings();
   	};

   	var initFromStores = function () {
        $scope.currentUser = settingsMgr.getCurrentUser();
		$log.debug('RecipelistCtrl: initFromStores $scope.currentUser', $scope.currentUser);
    	if($scope.currentUser) {
    		getRecipes();
    		getSettings();
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

    $scope.gotoDetailsPage = function(item) {
      // var pagelink='/recipedetails/'+ item.$id;	
      var pagelink='/recipedetails/'+ $scope.recipes.indexOf(item);	
      $log.debug('RecipelistCtrl: pagelink: ', pagelink);
      $location.path(pagelink);
    };

	$scope.addRecipe = function () {
		recipesMgr.addItem({
		  category : $scope.category,
	      recipename : $scope.recipename,
	      onlist : false
		}).then(function () {
			$scope.recipename = '';
			$scope.category = '';
		});
	}; // addRecipe

	$scope.deleteItem = function(item) {
		$log.debug('RecipelistCtrl: deleteRecipe: ', item);
		recipesMgr.deleteItem(item);
	}; // deleteRecipe

	$scope.updateRecipe = function(item) {
		$log.debug('RecipelistCtrl: updateRecipe: ', item);
		recipesMgr.saveItem(item);
	}; // updateRecipe

	// init  
	$scope.itemOrder = 'recipename';

	// $scope.showAllDef = false;
	// $scope.$watch('showAllDef', function(newValue) {
	// 	$scope.showAll = newValue ? ! newValue : undefined;
	// 	// undefined -show all, true - show unbought only
	// }); //$watch

  }]);
