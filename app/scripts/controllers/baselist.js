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
   	$scope.data.mySettings = {};
   	$scope.data.myItems = [];
	$scope.data.setShowAll = function () {
	};

   	var getSettings = function() {
   		$scope.data.mySettings = settingsMgr.getSettings();
  		$scope.data.setShowAll();
   	};

   	var getItems = function (fbUrl, fieldName, fieldValue) {
	    $scope.data.storeMgr = StoredListMgrFactory.getStoredListMgr(fbUrl);
	    $scope.data.storeMgr.getItems(fieldName, fieldValue).then(function(receivedItems) {
	    	$scope.data.myItems = receivedItems;
	    });
   	};

   	var initFromStores = function (fbUrl, fieldName, fieldValue) {
        var currentUser = settingsMgr.getCurrentUser();
		$log.debug('BaselistCtrl: initFromStores currentUser', currentUser);
    	if(currentUser) {
    		getSettings();
    		getItems(fbUrl, fieldName, fieldValue);
    	} else {
    		$location.path('/login');
    	}
   	};

	$scope.saveItem = function(item) {
		// $log.debug('BaselistCtrl: saveItem: ', item);
		$scope.data.storeMgr.saveItem(item);
	}; // saveItem

	$scope.$on('handleCurrentUserSet', function () {
		$log.debug('BaselistCtrl: handleCurrentUserSet call init from store');
		initFromStores($scope.data.fbUrl, $scope.data.fieldName, $scope.data.fieldValue);
    });

	initFromStores($scope.data.fbUrl, $scope.data.fieldName, $scope.data.fieldValue);

  }]);
