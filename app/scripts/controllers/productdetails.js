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
    	} else if($routeParams.listId == "FAVORITES") { 
    		$scope.storeMgr = StoredListMgrFactory.getStoredListMgr(FB_SHOPPINGLIST_URL, 'recipeId', 'FAVORITES');
    	} else { // a recipe
    		$scope.storeMgr = StoredListMgrFactory.getStoredListMgr(FB_SHOPPINGLIST_URL);
    	}
    }; // setStoreMgr

	var initItem = function() {
      var currentUser = settingsMgr.getCurrentUser();
		// $log.debug('ProductDetailsController: initItem currentUser', currentUser);
    	if(currentUser) {
        if($routeParams.itemId) {
          setStoreMgr();
          if($routeParams.itemId != 'Add') {
            $scope.currentItem = $scope.storeMgr.getItem($routeParams.itemId);
          } else if ($routeParams.listId) { // no need to set recipe in page refresh case
            $scope.currentItem.recipeId = ($routeParams.listId == "ShoppingList") ?  'FAVORITES' : $routeParams.listId;
            $scope.currentItem.recipe = ($routeParams.listId == "ShoppingList") ?  'FAVORITES' : $routeParams.listId;
          }
        }
    	} else {
        $location.path('/login');
      }
	}; // initItem

	$scope.$on('handleCurrentUserSet', function () {
        initItem();
    });
    initItem();

	$scope.addOrSaveItem = function () {
	    $log.debug('ProductDetailsController: saveOrAddItem', $scope.currentItem);
      if($routeParams.itemId == 'Add') {
        $scope.currentItem.isonlist = true;
        $scope.currentItem.isbought = false;
        $scope.storeMgr.addItem($scope.currentItem);
      } else {
        $scope.storeMgr.saveItem($scope.currentItem);
      }
	}; // saveOrAddItem

  $scope.getTitle = function() {
    var productName = $scope.currentItem ? $scope.currentItem.product : '';
    return ($routeParams.itemId == 'Add') ? 'Add Product' : productName;
  }

  });
