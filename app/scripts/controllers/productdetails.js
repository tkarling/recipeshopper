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
  		FB_SHOPPINGLIST_URL, settingsMgr, StoredListMgrFactory, productsFromString) {

  	// Start from first tab
	  $scope.data = {
      selectedTabIndex: 0,
      addPage: $routeParams.itemId == 'Add',
      aisles: productsFromString.getAisles()
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
        //$log.debug('ProductDetailsController: getStoreMgr listId', listId);
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
          if(! $scope.data.addPage) {
            $scope.currentItem = $scope.storeMgr.getCopyOfItem(productId);
          } else if (listId) { // add case
            $scope.currentItem.aisle = 'UNKNOWN';
            $scope.currentItem.recipeId = (listId == "ShoppingList") ?  'FAVORITES' : listId;
            $scope.currentItem.recipe = ((listId == "ShoppingList") || (listId == "FAVORITES")) ?  'FAVORITES' : listName;
          }
        }
    	} else { // user not logged in
        $location.path('/login');
      }
	}; // initItem

	$scope.$on('handleCurrentUserSet', function () {
        initItem($routeParams.itemId, $routeParams.listId, $routeParams.listName);
  });
  initItem($routeParams.itemId, $routeParams.listId, $routeParams.listName);

    var addManyItems = function () {
      var products = productsFromString.getProductsFromString($scope.data.addedItemsString,
        $scope.currentItem.recipeId, $scope.currentItem.recipe);
      $log.debug('ProductDetailsController addOrSaveItem products', products);
      for (var i = 0; i < products.length; i++) {
        $scope.storeMgr.addItem(products[i]);
      }
    }; // addManyItems

    var addItem = function() {
      $scope.currentItem.isonlist = true;
      $scope.currentItem.isbought = false;
      $scope.storeMgr.addItem($scope.currentItem);
    }

    $scope.addOrSaveItem = function (formValid) {
      $log.debug('ProductDetailsController: addOrSaveItem', $scope.currentItem);
      if ($scope.data.addedItemsString) {
        addManyItems();
      } else if(formValid) {
        if (!$scope.currentItem.$id) {
          // product has not been saved before
          addItem();
        } else {
          $scope.storeMgr.saveFromCopyOfItem($scope.currentItem);
        }
      }
    }; // saveOrAddItem

    $scope.getTitle = function () {
      var productName = $scope.currentItem ? $scope.currentItem.product : '';
      return ($scope.data.addPage) ? 'Add Product' : productName;
    }

  });
