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

	$scope.saveItem = function(item) {
		$log.debug('RecipelistCtrl: saveItem: ', item);
		recipesMgr.saveItem(item);
	}; // saveItem

	// init  
	$scope.itemOrder = 'recipename';

	// $scope.showAllDef = false;
	// $scope.$watch('showAllDef', function(newValue) {
	// 	$scope.showAll = newValue ? ! newValue : undefined;
	// 	// undefined -show all, true - show unbought only
	// }); //$watch

  }]);
