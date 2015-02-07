'use strict';

/**
 * @ngdoc function
 * @name loginMod.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the loginMod
 */
 angular
.module('loginMod', [
  'authenticationMod', 'settingsMod',
]);

angular.module('loginMod')
  .controller('LoginCtrl', ['$scope', '$rootScope', '$log', '$location', 'Authentication', 'settingsMgr',
    function ($scope, $rootScope, $log, $location, Authentication, settingsMgr) { // , settingsMgr
    $log.debug('LoginCtrl: init controller');
  	// $scope.$on('$viewContentLoaded', function() {
  	// 	console.log($scope.myform);
  	// });
    
    var setErrorMessage = function (errorMessage) {
      $scope.message = errorMessage;
      $log.debug('LoginCtrl:setErrorMessage', $scope.message, errorMessage);
    }; // setErrorMessage

    $scope.login = function () {
      Authentication.login($scope.inputUser).then(function (authData) {
          $log.debug('Authenticated successfully with payload:', authData);
          settingsMgr.setCurrentUser(authData.uid).then(function () {
              $location.path('/main');
          }).catch(function(error) {
              setErrorMessage(error.message);
              $log.error('ERROR: getting user info from store after logging in failed');
          });
      }).catch(function(error) {
          setErrorMessage(error.message);
          $log.debug('LoginCtrl: login: logging out now');
          Authentication.logout();
      });
    }; // login

    $scope.logout = function () {
      Authentication.logout();
    }; // logout

  	$scope.register = function () {
      Authentication.register($scope.inputUser).then(function (authData) {
          $log.debug('Registered successfully with payload:', authData);
          settingsMgr.addUser(authData.uid, $scope.inputUser).then(function(data) {
              $scope.login();
          }).catch(function(error) {
              setErrorMessage(error.message);
              $log.error('ERROR: adding user to store after registering failed');
          });
      }).catch(function(error) {
          setErrorMessage(error.message);
      });
  	}; // register

    $scope.user = {};
    $scope.user.userLoggedIn = settingsMgr.getCurrentUser() != '';
    $scope.user.firstname = settingsMgr.getSetting('firstname');

    $rootScope.$on('handleCurrentUserSet', function () {
        $scope.user.userLoggedIn = settingsMgr.getCurrentUser() != '';
        $scope.user.firstname = settingsMgr.getSetting('firstname');
        $log.debug('LoginCtrl: handleCurrentUserSet called', $scope.user.userLoggedIn, $scope.user.firstname);
    });

  }]);
