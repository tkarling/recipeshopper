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
	//$log.debug('MainCtrl: init');
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
  		// $log.debug('MainCtrl: updateShowAll: $scope.data.showAll', $scope.data.showAll);
  		// $log.debug('MainCtrl: updateShowAll:  $scope.data.mySettings.doNotShowBoughtItems', $scope.data.mySettings.doNotShowBoughtItems);
  	};

 	if(! $scope.data) {
		$scope.data = {};
	}
	$scope.setStoreId(FB_SHOPPINGLIST_URL, 'isonlist', true);

	// additional mainCtrl specific init
	$scope.$on('handleCurrentUserSet', function () {
		//$log.debug('MainCtrl: handleCurrentUserSet');
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
		});
	}; // addProduct

	$scope.removeItem = function(item) {
		// $log.debug('MainCtrl: removeItem: ', item);
		item.isonlist = false;
		item.isbought = false;
		$scope.saveItem(item);
	}; // removeItem

  }]);

