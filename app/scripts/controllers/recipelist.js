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
  .controller('RecipelistCtrl', ['$scope', '$log', '$http', 'FB_RECIPES_URL', 'StoredListMgrFactory',  
  	function ($scope, $log, $http, FB_RECIPES_URL, StoredListMgrFactory) { //BasicStoredListMgr
    currentTab=2;

    var recipesMgr = StoredListMgrFactory.createBasicStoredListMgr(FB_RECIPES_URL);

	$scope.recipes = [];
    recipesMgr.getItems().then(function(data) {
    	$scope.recipes = data;
    });

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

	$scope.deleteRecipe = function(item) {
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
