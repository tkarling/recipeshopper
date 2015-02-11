'use strict';

/**
 * @ngdoc function
 * @name recipeshopperApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the recipeshopperApp
 */

angular.module('recipeshopperApp')
  .directive('lineThrough', function() {
  	return function (scope, element, attrs) {
 		var isBought = attrs['lineThrough'];
 		var watcherFn = function (watchscope) {
 			return watchscope.$eval(isBought);
 		};
 		scope.$watch(watcherFn, function(newValue) {
			// console.log('lineThrough: newValue: ' + newValue);
 			if(newValue) {
		 		element.find('span').addClass('rs-line-through');
		 	} else {
		 		element.find('span').removeClass('rs-line-through');
		 	}
 		});

		// var index = scope.$eval(attrs['lineThrough']);
		// console.log('index: ' + index); 
 		// (function () {	// IIFE not needed i this case
 		// }());
  	};
  })
  .constant('FB_SHOPPINGLIST_URL', 'https://recipeshopper.firebaseio.com/shoppinglist/')
  .controller('MainCtrl', ['$scope', '$log', '$http', 'FB_SHOPPINGLIST_URL', 'StoredListMgrFactory', 'settingsMgr', 
  	function ($scope, $log, $http, FB_SHOPPINGLIST_URL, StoredListMgrFactory, settingsMgr) {  

  	var setShowAll = function () {
  		$scope.showAll = $scope.mySettings.doNotShowBoughtItems ? ! $scope.mySettings.doNotShowBoughtItems : undefined;
  	}

  	$scope.updateShowAll = function () {
  		setShowAll();
  		settingsMgr.saveSettings();
  		$log.debug('MainCtrl: updateShowAll: $scope.showAll', $scope.showAll);
  		$log.debug('MainCtrl: updateShowAll:  $scope.mySettings.doNotShowBoughtItems', $scope.mySettings.doNotShowBoughtItems);
  	}

    //A QUICK WAY TO FILL EMPTY DB
	var addDefaultItemsToList =	function () {
		$log.debug('MainCtrl: addDefaultItemsToList started');
		$http.get('data/ce_w1.json').success(function(data){ 
			var items = data;  
			$log.debug('MainCtrl: addDefaultItemsToList: From Json: items', items);
			var item = {recipe : 'CE Dec-14 w1', isbought : false};
			for(var i = 0; i < items.length; i++) {
				for(var j = 0; j < items[i].products.length; j++) {
					item.product = items[i].products[j];
	      			item.aisle = items[i].aisle;
					// $log.debug(item);
					storeMgr.addItem(item);
				}
			}
		});
		$log.debug('MainCtrl: addDefaultItemsToList $scope.groceries', $scope.groceries);
	};


   	var getGroceries = function () {
	    storeMgr = StoredListMgrFactory.getStoredListMgr(FB_SHOPPINGLIST_URL);
	    storeMgr.getItems().then(function(data) {
	    	$scope.groceries = data;
	    	if($scope.groceries.length == 0) {
	    		addDefaultItemsToList();
	    	}
			// $log.debug('MainCtrl: getGroceries $scope.groceries', $scope.groceries);
	    });

	    // storeMgr.getItems('aisle', 'EXTRAS').then(function(data) {
	    // 	$scope.groceries = data;
	    // 	if($scope.groceries.length == 0) {
	    // 		addDefaultItemsToList();
	    // 	}
	    // });
   	}

   	var getSettings = function() {
   		$scope.mySettings = settingsMgr.getSettings();
  		setShowAll();
   	}

   	var initFromStores = function () {
        $scope.currentUser = settingsMgr.getCurrentUser();
		$log.debug('MainCtrl: initFromStores $scope.currentUser', $scope.currentUser);
    	if($scope.currentUser) {
    		getGroceries();
    		getSettings();
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
	$log.debug('MainCtrl: call init from store');
	initFromStores();

	$scope.addProduct = function () {
		storeMgr.addItem({
		  recipe : 'New recipe',
	      product : $scope.product,
	      aisle : $scope.aisle,
	      // amount : 5,
	      // unit : 'pcs',
	      isbought : false
	      // date: Firebase.ServerValue.TIMESTAMP
		}).then(function () {
			$scope.product = '';
			$scope.aisle = '';
		});
	}; // addProduct

	$scope.deleteProduct = function(item) {
		$log.debug('MainCtrl: deleteProduct: ', item);
		storeMgr.deleteItem(item);
	}; // deleteProduct

	$scope.saveProduct = function(item) {
		$log.debug('MainCtrl: saveProduct: ', item);
		storeMgr.saveItem(item);
	}; // saveProduct


  }]);

