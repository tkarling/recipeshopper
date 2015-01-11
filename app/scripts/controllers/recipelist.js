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
  .controller('RecipelistCtrl', ['$scope', '$log', '$http', 'FB_RECIPES_URL', 'BasicStoredListMgr',  
  	function ($scope, $log, $http, FB_RECIPES_URL, BasicStoredListMgr) {
  // .controller('RecipelistCtrl', ['$scope', '$http', '$firebase', 'localStorageService', function ($scope, $http, $firebase, localStorageService) {
    currentTab=2;

    var storeMgr = new BasicStoredListMgr();
    storeMgr.setUrl(FB_RECIPES_URL);
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
  // .directive('lineThrough', function() {
  // 	return function (scope, element, attrs) {
 	// 	var isBought = attrs['lineThrough'];
 	// 	var watcherFn = function (watchscope) {
 	// 		return watchscope.$eval(isBought);
 	// 	};
 	// 	scope.$watch(watcherFn, function(newValue) {
		// 	// console.log('lineThrough: newValue: ' + newValue);
 	// 		if(newValue) {
		//  		element.find('span').addClass('rs-line-through');
		//  	} else {
		//  		element.find('span').removeClass('rs-line-through');
		//  	}
 	// 	});

		// // var index = scope.$eval(attrs['lineThrough']);
		// // console.log('index: ' + index); 
 	// 	// (function () {	// IIFE not needed i this case
 	// 	// }());
  // 	};
  // })
 //  .controller('RecipelistCtrl', ['$scope', '$http', '$firebase', 'localStorageService', function ($scope, $http, $firebase, localStorageService) {
 //    currentTab=2;

 //    // LOCAL STORAGE RELATED IMPLEMENTATION
	// // var groceriesInStore = [];
	// // if(localStorageService) {
	// // 	console.log('localStorageService exists');
	// // 	groceriesInStore = localStorageService.get('groceries');
	// // }
	// // $scope.groceries = groceriesInStore || [];

	// // $scope.$watch('groceries', function () {
	// // 	if(localStorageService) {
	// // 	  localStorageService.set('groceries', $scope.groceries);
	// // 	}
	// // }, true);

 //  	//INCLUDED JSON FILE RELATED IMPLEMENTATION
	// // // read default set from jsonfile in case local storage is empty
	// // if($scope.groceries.length === 0) {
	// // 	$scope.groceries = [];
	// // 	$http.get('data/joululista.json').success(function(data){ 
	// // 	  $scope.groceries = data;
	// // 	});
	// // }

	// //FIREBASE IMPLEMENTATION
	// var ref = new Firebase('https://recipeshopper.firebaseio.com/recipes');
	// var groceriesFromFB = $firebase(ref);

	// $scope.groceries = groceriesFromFB.$asArray();

	// $scope.addProduct = function () {
	// 	groceriesFromFB.$push({
	// 	  recipe : "New recipe",
	//       product : $scope.product,
	//       aisle : "aisle1",
	//       amount : 5,
	//       unit : "pcs",
	//       isbought : false,
	//       date: Firebase.ServerValue.TIMESTAMP
	// 	}).then(function () {
	// 		$scope.product = '';
	// 	});
	// } // addProduct

	// $scope.deleteProduct = function(item) {
	// 	// console.log('deleteProduct: ');
	// 	// console.log(item);
	// 	groceriesFromFB.$remove(item.$id);
	// } // deleteProduct

	// $scope.updateIsBought = function(item) {
	// 	// console.log('Updating is bought for:', item);
	// 	groceriesFromFB.$update(item.$id, {isbought: item.isbought});
	// } // updateIsBought

	// // init  
	// $scope.itemOrder = 'aisle';
	// $scope.showAllDef = false;

	// $scope.$watch('showAllDef', function(newValue) {
	// 	// console.log('newValue: ' + newValue);
	// 	$scope.showAll = newValue ? ! newValue : undefined;
	// 	// undefined -show all, true - show unbought only
	// }); //$watch

 //  }]);

