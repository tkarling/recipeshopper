'use strict';

/**
 * @ngdoc function
 * @name recipeshopperApp.controller:BaselistCtrl
 * @description
 * # BaselistCtrl
 * Controller of the recipeshopperApp
 */
angular.module('recipeshopperApp')
  .controller('BaselistCtrl', ['$scope', '$log', '$location', 'StoredListMgrFactory', 'settingsMgr', 
  	function ($scope, $log, $location, StoredListMgrFactory, settingsMgr) {   	
	$log.debug('BaselistCtrl: init');
	// console.log('BaselistCtrl: init');
 
	// init  
	if(! $scope.data) {
		$scope.data = {};
	}
	$scope.data.storeMgr = {};
   	$scope.data.myItems = [];
   	$scope.data.mySettings = {};

   	$scope.setStoreId = function (fbUrl, fieldName, fieldValue) {
	   	$scope.data.fbUrl = fbUrl;
		$scope.data.fieldName = fieldName;
		$scope.data.fieldValue = fieldValue;
		initFromStores();
   	}; // setStoreId

   	var getSettings = function() {
   		$scope.data.mySettings = settingsMgr.getSettings();
   	};

   	var getItems = function (fbUrl, fieldName, fieldValue) {
	    $scope.data.storeMgr = StoredListMgrFactory.getStoredListMgr(fbUrl, fieldName, fieldValue);
	    $scope.data.storeMgr.getItems().then(function(receivedItems) {
	    	$scope.data.myItems = receivedItems;
	    });
   	};

   	var initFromStores = function () { 
        var currentUser = settingsMgr.getCurrentUser();
		// $log.debug('BaselistCtrl: initFromStores currentUser', currentUser);
    	if(currentUser) {
    		getSettings();
    		if($scope.data.fbUrl) {
	    		// $log.debug('BaselistCtrl: initFromStores getting items from store', $scope.data.fbUrl);
	    		getItems($scope.data.fbUrl, $scope.data.fieldName, $scope.data.fieldValue);
    		}
    	} else {
    		$location.path('/login');
    	}
   	};

	$scope.$on('handleCurrentUserSet', function () {
		$log.debug('BaselistCtrl: handleCurrentUserSet call init from store');
		initFromStores(); 
    });

	$scope.saveItem = function(item) {
		// $log.debug('BaselistCtrl: saveItem: ', item);
		$scope.data.storeMgr.saveItem(item);
	}; // saveItem

	$scope.deleteItem = function(item) {
		// $log.debug('BaselistCtrl: deleteItem: ', item);
		$scope.data.storeMgr.deleteItem(item);
	}; // deleteItem


  }]);
