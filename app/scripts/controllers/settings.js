'use strict';

/**
 * @ngdoc function
 * @name recipeshopperApp.controller:SettingsCtrl
 * @description
 * # SettingsCtrl
 * Controller of the recipeshopperApp
 */
angular.module('recipeshopperApp')
  .controller('SettingsCtrl', function ($scope, $log, settingsMgr) {
  	$log.debug('SettingsCtrl: init controller');

  	$scope.saveSettings = function () {
  		$log.debug('SettingsCtrl: saveSettings');
  		settingsMgr.saveSettings();
  	}

  	var initSettings = function () {
  		$scope.mySettings = settingsMgr.getSettings();
	  	$log.debug('SettingsCtrl: initSettings: $scope.mySettings', $scope.mySettings);
  	}

  	$scope.mySettings = {};

	$scope.$on('handleCurrentUserSet', function () {
        $scope.currentUser = settingsMgr.getCurrentUser();
		$log.debug('SettingsCtrl: handleCurrentUserSet $scope.currentUser', $scope.currentUser);
    	if($scope.currentUser) {
		  	initSettings();
    	} 
    });


    $scope.currentUser = settingsMgr.getCurrentUser();
 	$log.debug('SettingsCtrl: $scope.currentUser', $scope.currentUser);
 	if($scope.currentUser) {
	  	initSettings();
	  }
  });
