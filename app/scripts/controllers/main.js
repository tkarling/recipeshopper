'use strict';

/**
 * @ngdoc function
 * @name recipeshopperApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the recipeshopperApp
 */

angular.module('recipeshopperApp')
  .controller('MainCtrl', ['$scope', '$log', '$http', '$location', 'FB_SHOPPINGLIST_URL', 'StoredListMgrFactory', 'settingsMgr', 
  	function ($scope, $log, $http, $location, FB_SHOPPINGLIST_URL, StoredListMgrFactory, settingsMgr) {  

  	var setShowAll = function () {
  		$scope.showAll = $scope.mySettings.doNotShowBoughtItems ? ! $scope.mySettings.doNotShowBoughtItems : undefined;
  	};

  	$scope.updateShowAll = function () {
  		setShowAll();
  		settingsMgr.saveSettings();
  		$log.debug('MainCtrl: updateShowAll: $scope.showAll', $scope.showAll);
  		$log.debug('MainCtrl: updateShowAll:  $scope.mySettings.doNotShowBoughtItems', $scope.mySettings.doNotShowBoughtItems);
  	};

    //A QUICK WAY TO FILL EMPTY DB
	// var addDefaultItemsToList =	function () {
	// 	$log.debug('MainCtrl: addDefaultItemsToList started');
	// 	$http.get('data/ce_mar15_w1.json').success(function(data){ 
	// 		if($scope.groceries.length == 0) { // add items only if teh list is still emtpty
	// 			var items = data;  
	// 			$log.debug('MainCtrl: addDefaultItemsToList: From Json: items', items);
	// 			var item = {recipeId: 'CE Jan-15 w1', recipe : 'CE Jan-15 w1', isonlist: true, isbought : false};
	// 			for(var i = 0; i < items.length; i++) {
	// 				for(var j = 0; j < items[i].products.length; j++) {
	// 					item.product = items[i].products[j];
	// 	      			item.aisle = items[i].aisle;
	// 					// $log.debug(item);
	// 					storeMgr.addItem(item);
	// 				}
	// 			}
	// 		}

	// 	});
	// 	$log.debug('MainCtrl: addDefaultItemsToList $scope.groceries', $scope.groceries);
	// };


   	var getGroceries = function () {
	    storeMgr = StoredListMgrFactory.getStoredListMgr(FB_SHOPPINGLIST_URL);
	    storeMgr.getItems('isonlist', true).then(function(data) {
	    	$scope.groceries = data;
	    	// $log.debug('MainCtrl: getGroceries $scope.mySettings', $scope.mySettings);

	    	// if($scope.groceries.length == 0) {
	    	// 	addDefaultItemsToList();
	    	// }

			// $log.debug('MainCtrl: getGroceries $scope.groceries', $scope.groceries);
	    });
   	};

   	var getSettings = function() {
   		$scope.mySettings = settingsMgr.getSettings();
  		setShowAll();
   	};

   	var initFromStores = function () {
        $scope.currentUser = settingsMgr.getCurrentUser();
		// $log.debug('MainCtrl: initFromStores $scope.currentUser', $scope.currentUser);
    	if($scope.currentUser) {
    		getSettings();
    		getGroceries();
    	} else {
    		$location.path('/login');
    	}
   	};

	$scope.$on('handleCurrentUserSet', function () {
		$log.debug('MainCtrl: handleCurrentUserSet call init from store');
		initFromStores();
    });

	// init  
	var storeMgr;
   	$scope.groceries = [];
   	$scope.mySettings = {};
	// $log.debug('MainCtrl: call init from store');
	initFromStores();

	$scope.addProduct = function (myProduct, aisle, amount) {
		// $log.debug('MainCtrl: addProduct Attrs: ', myProduct, aisle, amount);
		return storeMgr.addItem({
		  recipeId: 'FAVORITES',
		  recipe : 'FAVORITES',
	      product : myProduct,
	      aisle : aisle,
	      amount : amount,
	      // unit : 'pcs',
	      isonlist : true,
	      isbought : false 
	      // date: Firebase.ServerValue.TIMESTAMP
		});
	}; // addProduct

	$scope.saveItem = function(item) {
		// $log.debug('MainCtrl: saveItem: ', item);
		storeMgr.saveItem(item);
	}; // saveItem

	$scope.removeItem = function(item) {
		// $log.debug('MainCtrl: removeItem: ', item);
		item.isonlist = false;
		item.isbought = false;
		storeMgr.saveItem(item);
	}; // saveItem

  }]);

