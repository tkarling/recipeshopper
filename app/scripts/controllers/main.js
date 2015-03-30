'use strict';

/**
 * @ngdoc function
 * @name recipeshopperApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the recipeshopperApp
 */

angular.module('recipeshopperApp')
  .controller('MainCtrl', ['$scope', '$log', '$http', '$location',  
  			  'FB_SHOPPINGLIST_URL', 'StoredListMgrFactory', 'settingsMgr', 
  	function ($scope, $log, $http, $location,
  			  FB_SHOPPINGLIST_URL, StoredListMgrFactory, settingsMgr) {  
	$log.debug('MainCtrl: init');
	// console.log('MainCtrl: init');

  	var setShowAll = function () {
  		// console.log('setShowAll called');
  		if($scope.data.mySettings && ($scope.data.mySettings != {})) {
	  		$scope.data.showAll = $scope.data.mySettings.doNotShowBoughtItems ? ! $scope.data.mySettings.doNotShowBoughtItems : undefined;
  		}
  	};

  	$scope.updateShowAll = function () {
  		setShowAll();
  		settingsMgr.saveSettings();
  		$log.debug('MainCtrl: updateShowAll: $scope.data.showAll', $scope.data.showAll);
  		$log.debug('MainCtrl: updateShowAll:  $scope.data.mySettings.doNotShowBoughtItems', $scope.data.mySettings.doNotShowBoughtItems);
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

	if(! $scope.data) {
		$scope.data = {};
	}	
	$scope.setStoreId(FB_SHOPPINGLIST_URL, 'isonlist', true);

	// additional mainCtrl specific init
	$scope.$on('handleCurrentUserSet', function () {
		$log.debug('MainCtrl: handleCurrentUserSet');
		setShowAll();
    });
	setShowAll();

	$scope.addProduct = function (myProduct, aisle, amount) {
		// $log.debug('MainCtrl: addProduct Attrs: ', myProduct, aisle, amount);
		return $scope.data.storeMgr.addItem({
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

	$scope.removeItem = function(item) {
		// $log.debug('MainCtrl: removeItem: ', item);
		item.isonlist = false;
		item.isbought = false;
		$scope.saveItem(item);
	}; // removeItem

  }]);

