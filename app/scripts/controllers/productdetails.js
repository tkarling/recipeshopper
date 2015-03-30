'use strict';

/**
 * @ngdoc function
 * @name recipeshopperApp.controller:ProductDetailsController
 * @description
 * # ProductDetailsController
 * Controller of the recipeshopperApp
 */
angular.module('recipeshopperApp')
  .controller('ProductDetailsController', function ($scope, $routeParams, $log, $location,
  		$firebaseObject, FB_SHOPPINGLIST_URL, settingsMgr, StoredListMgrFactory) {

  	// Start from first tab
	$scope.data = {
      selectedTabIndex : 0
    };
    $scope.currentItem = {};
    $log.debug('ProductDetailsController: $routeParams.listId, $routeParams.itemId', $routeParams.listId, $routeParams.itemId);

    var setStoreMgr = function() {
    	if($routeParams.listId == "ShoppingList") {
    		$scope.storeMgr = StoredListMgrFactory.getStoredListMgr(FB_SHOPPINGLIST_URL, 'isonlist', true);
    	} else if($routeParams.listId == "Favorites") { 
    		$scope.storeMgr = StoredListMgrFactory.getStoredListMgr(FB_SHOPPINGLIST_URL, 'recipeId', 'FAVORITES');
    	} else { // a recipe
    		$scope.storeMgr = StoredListMgrFactory.getStoredListMgr(FB_SHOPPINGLIST_URL);
    	}
    }; // setStoreMgr

	var initObject = function() {
      var currentUser = settingsMgr.getCurrentUser();
		// $log.debug('ProductDetailsController: initObject currentUser', currentUser);
    	if(currentUser) {
        if($routeParams.itemId) {
          setStoreMgr();
          $scope.currentItem = $scope.storeMgr.getItem($routeParams.itemId);
        }
    	} else {
        $location.path('/login');
      }
	}; // initObject

	$scope.$on('handleCurrentUserSet', function () {
        initObject();
    });
    initObject();

	$scope.saveObject = function () {
	    $log.debug('ProductDetailsController: saveObject', $scope.currentItem);
	    $scope.storeMgr.saveItem($scope.currentItem);
	}; // saveObject

  });
