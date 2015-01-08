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
  // .controller('MainCtrl', ['$scope', '$log', '$http', '$firebase', 'FB_SHOPPINGLIST_URL', 'localStorageService', 
  // 	function ($scope, $log, $http, $firebase, FB_SHOPPINGLIST_URL, localStorageService) {
  .controller('MainCtrl', ['$scope', '$log', '$http', 'FB_SHOPPINGLIST_URL', 'BasicStoredListMgr',  
  	function ($scope, $log, $http, FB_SHOPPINGLIST_URL, BasicStoredListMgr) {
    currentTab=1;

    var storeMgr = new BasicStoredListMgr(FB_SHOPPINGLIST_URL);
    storeMgr.getItems().then(function(data) {
    	$scope.groceries = data;
    });

	//FIREBASE IMPLEMENTATION
	// var ref = new Firebase('https://recipeshopper.firebaseio.com/');
	// var ref = new Firebase(FB_SHOPPINGLIST_URL);
	// var groceriesFromFB = $firebase(ref);

	// $scope.groceries = groceriesFromFB.$asArray();
	// $scope.groceries.$loaded().then(
	// 	function () {
	// 		$log.debug('loaded');
	// 		if($scope.groceries.length == 0) {
	// 			$log.debug('addidng items to FB');
	// 			$http.get('data/ce_w1.json').success(function(data){ 
	// 				var items = data;  
	// 				$log.debug('items', items);
	// 				var item = {recipe : "CE Dec-14 w1", isbought : false};
	// 				for(var i = 0; i < items.length; i++) {
	// 					for(var j = 0; j < items[i].products.length; j++) {
	// 						item.product = items[i].products[j];
	// 		      			item.aisle = items[i].aisle;
	// 						// $log.debug(item);
	// 						groceriesFromFB.$push(item);
	// 					}
	// 				}
	// 			});
	// 		}
	// 		$log.debug('$scope.groceries', $scope.groceries);
	// 	}
	// );


	$scope.addProduct = function () {
		storeMgr.addItem({
		  recipe : "New recipe",
	      product : $scope.product,
	      aisle : "aisle1",
	      amount : 5,
	      unit : "pcs",
	      isbought : false
	      // date: Firebase.ServerValue.TIMESTAMP
		}).then(function () {
			$scope.product = '';
		});
	} // addProduct

	$scope.deleteProduct = function(item) {
		$log.debug('MainCtrl: deleteProduct: ', item);
		storeMgr.deleteItem(item);
	} // deleteProduct

	$scope.updateIsBought = function(item) {
		$log.debug('MainCtrl: updateIsBought: ', item);
		storeMgr.saveItem(item);
	} // updateIsBought


	// init  
	$scope.itemOrder = 'aisle';
	$scope.showAllDef = false;

	$scope.$watch('showAllDef', function(newValue) {
		// console.log('newValue: ' + newValue);
		$scope.showAll = newValue ? ! newValue : undefined;
		// undefined -show all, true - show unbought only
	}); //$watch





    // LOCAL STORAGE RELATED IMPLEMENTATION
	// var groceriesInStore = [];
	// if(localStorageService) {
	// 	console.log('localStorageService exists');
	// 	groceriesInStore = localStorageService.get('groceries');
	// }
	// $scope.groceries = groceriesInStore || [];

	// $scope.$watch('groceries', function () {
	// 	if(localStorageService) {
	// 	  localStorageService.set('groceries', $scope.groceries);
	// 	}
	// }, true);

  	//INCLUDED JSON FILE RELATED IMPLEMENTATION
	// // read default set from jsonfile in case local storage is empty
	// if($scope.groceries.length === 0) {
	// 	$scope.groceries = [];
	// 	$http.get('data/joululista.json').success(function(data){ 
	// 	  $scope.groceries = data;
	// 	});
	// }

  }]);

