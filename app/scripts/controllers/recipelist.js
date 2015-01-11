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
  .controller('RecipelistCtrl', ['$scope', '$log', '$http', 'FB_RECIPES_URL', 'BasicStoredListMgr', 'StoredListMgrFactory',  
  	function ($scope, $log, $http, FB_RECIPES_URL, BasicStoredListMgr, StoredListMgrFactory) {
    currentTab=2;

    var storeMgr = StoredListMgrFactory.createBasicStoredListMgr(FB_RECIPES_URL);

    storeMgr.getItems().then(function(data) {
    	$scope.recipes = data;
    });

	$scope.addRecipe = function () {
		storeMgr.addItem({
		  category : "Christmas",
	      recipename : $scope.recipename,
	      onlist : false
		}).then(function () {
			$scope.recipename = '';
		});
	} // addRecipe

	$scope.deleteRecipe = function(item) {
		$log.debug('RecipelistCtrl: deleteRecipe: ', item);
		storeMgr.deleteItem(item);
	} // deleteRecipe

	$scope.updateRecipe = function(item) {
		$log.debug('RecipelistCtrl: updateRecipe: ', item);
		storeMgr.saveItem(item);
	} // updateRecipe

	// init  
	$scope.itemOrder = 'category';

	// $scope.showAllDef = false;
	// $scope.$watch('showAllDef', function(newValue) {
	// 	$scope.showAll = newValue ? ! newValue : undefined;
	// 	// undefined -show all, true - show unbought only
	// }); //$watch

  }]);
