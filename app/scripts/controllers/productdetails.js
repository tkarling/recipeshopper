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
    // $log.debug('ProductDetailsController: $routeParams.listId, $routeParams.itemId', $routeParams.listId, $routeParams.itemId);

    var getStoreMgr = function(listId) {
      var result = null;
    	if(listId == "ShoppingList") {
    		result = StoredListMgrFactory.getStoredListMgr(FB_SHOPPINGLIST_URL, 'isonlist', true);
    	} else if(listId == "FAVORITES") { 
    		result = StoredListMgrFactory.getStoredListMgr(FB_SHOPPINGLIST_URL, 'recipeId', 'FAVORITES');
    	} else { // a recipe
    		result = StoredListMgrFactory.getStoredListMgr(FB_SHOPPINGLIST_URL);
    	}
      return result;
    }; // getStoreMgr

	var initItem = function(productId, listId, listName) {
      var currentUser = settingsMgr.getCurrentUser();
		// $log.debug('ProductDetailsController: initItem currentUser', currentUser);
    	if(currentUser) {
        if(productId) {
          $scope.storeMgr = getStoreMgr(listId);
          if($scope.storeMgr.noOfItems() == undefined) {
                // refresh page case
                $location.path('/main');
              }
          if(productId != 'Add') {
            $scope.currentItem = $scope.storeMgr.getCopyOfItem(productId);
          } else if (listId) { 
            $scope.currentItem.recipeId = (listId == "ShoppingList") ?  'FAVORITES' : listId;
            $scope.currentItem.recipe = ((listId == "ShoppingList") || (listId == "FAVORITES")) ?  'FAVORITES' : listName;
          }
        }
    	} else {
        $location.path('/login');
      }
	}; // initItem

	$scope.$on('handleCurrentUserSet', function () {
        initItem($routeParams.itemId, $routeParams.listId, $routeParams.listName);
  });
  initItem($routeParams.itemId, $routeParams.listId, $routeParams.listName);

	$scope.addOrSaveItem = function () {
	    $log.debug('ProductDetailsController: saveOrAddItem', $scope.currentItem);
      if(! $scope.currentItem.$id) { 
        // product has not been saved before
        $scope.currentItem.isonlist = true;
        $scope.currentItem.isbought = false;
        $scope.storeMgr.addItem($scope.currentItem);
      } else {
        $scope.storeMgr.saveFromCopyOfItem($scope.currentItem);
      }
	}; // saveOrAddItem

  $scope.getTitle = function() {
    var productName = $scope.currentItem ? $scope.currentItem.product : '';
    return ($routeParams.itemId == 'Add') ? 'Add Product' : productName;
  }

  });
