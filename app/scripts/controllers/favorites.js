'use strict';

/**
 * @ngdoc function
 * @name recipeshopperApp.controller:FavoritesCtrl
 * @description
 * # FavoritesCtrl
 * Controller of the recipeshopperApp
 */
angular.module('recipeshopperApp')
  .controller('FavoritesCtrl', ['$scope', '$log', '$http', '$location', 'FB_SHOPPINGLIST_URL', 'StoredListMgrFactory', 'settingsMgr', 
  	function ($scope, $log, $http, $location, FB_SHOPPINGLIST_URL, StoredListMgrFactory, settingsMgr) {

	if(! $scope.data) {
		$scope.data = {};
	}	
	$scope.data.fbUrl = FB_SHOPPINGLIST_URL;
	$scope.data.fieldName = 'recipeId';
	$scope.data.fieldValue = 'FAVORITES';

	$scope.addProduct = function (myProduct, aisle, amount) {
		// $log.debug('FavoritesCtrl: addProduct Attrs: ', myProduct, aisle, amount);
		return $scope.data.storeMgr.addItem({
		  recipeId: 'FAVORITES',
		  recipe : 'FAVORITES',
	      product : myProduct,
	      aisle : aisle,
	      amount : amount,
	      // unit : 'pcs',
	      isonlist : true,
	      isbought : false 
		});
	}; // addProduct

	$scope.toggleItemOnShoppingList = function(item) { // itemWasPutOnList
		// $log.debug('FavoritesCtrl: toggleItemOnShoppingList: ', item);
		if(item.isonlist) {
			item.isbought = false;
		}
		$scope.data.storeMgr.saveItem(item);
	}; // saveItem


  }]);
