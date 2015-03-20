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

   	var getGroceries = function () {
	    storeMgr = StoredListMgrFactory.getStoredListMgr(FB_SHOPPINGLIST_URL);
	    storeMgr.getItems('recipeId', 'FAVORITES').then(function(data) {
	    	$scope.groceries = data;
	    	// $log.debug('FavoritesCtrl: getGroceries $scope.mySettings', $scope.mySettings);
	    	// if($scope.groceries.length == 0) {
	    	// 	addDefaultItemsToList();
	    	// }
			// $log.debug('FavoritesCtrl: getGroceries $scope.groceries', $scope.groceries);
	    });
   	};

   	var getSettings = function() {
   		$scope.mySettings = settingsMgr.getSettings();
   	};

   	var initFromStores = function () {
        $scope.currentUser = settingsMgr.getCurrentUser();
		// $log.debug('FavoritesCtrl: initFromStores $scope.currentUser', $scope.currentUser);
    	if($scope.currentUser) {
    		getSettings();
    		getGroceries();
    	} else {
    		$location.path('/login');
    	}
   	};

	$scope.$on('handleCurrentUserSet', function () {
		$log.debug('FavoritesCtrl: handleCurrentUserSet call init from store');
		initFromStores();
    });

	// init  
	var storeMgr;
   	$scope.groceries = [];
   	$scope.mySettings = {};
	// $log.debug('FavoritesCtrl: call init from store');
	initFromStores();

	$scope.addProduct = function (myProduct, aisle, amount) {
		// $log.debug('FavoritesCtrl: addProduct Attrs: ', myProduct, aisle, amount);
		return storeMgr.addItem({
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

	$scope.deleteItem = function(item) {
		// $log.debug('FavoritesCtrl: deleteItem: ', item);
		storeMgr.deleteItem(item);
	}; // deleteItem

	$scope.saveItem = function(item, itemWasPutOnList) {
		// $log.debug('FavoritesCtrl: saveItem: ', item);
		if(itemWasPutOnList) {
			item.isbought = false;
		}
		storeMgr.saveItem(item);
	}; // saveItem


  }]);
