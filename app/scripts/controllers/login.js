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
  .controller('LoginCtrl', ['$scope', '$log', '$location', 'Authentication', 'settingsMgr',
    function ($scope, $log, $location, Authentication, settingsMgr) { // , settingsMgr
    $log.debug('LoginCtrl: init controller');
    
    var setErrorMessage = function (errorMessage) {
      $scope.message = errorMessage;
      $log.debug('LoginCtrl:setErrorMessage', $scope.message, errorMessage);
    }; // setErrorMessage

    $scope.login = function () {
      return Authentication.login($scope.user).then(function (authData) {
          $log.debug('Authenticated successfully with payload:', authData);
          settingsMgr.setCurrentUser(authData.uid).then(function () {
              $location.path('/main');
          }).catch(function(error) {
              setErrorMessage(error.message);
              $log.error('ERROR: getting user info from store after logging in failed');
          });
      }).catch(function(error) {
          setErrorMessage(error.message);
          $log.error('ERROR: logging in after registering failed');
          $log.debug('LoginCtrl: login: logging out now');
          Authentication.logout();
      });
    }; // login

    $scope.logout = function () {
      Authentication.logout();
    }; // logout

  	$scope.register = function () {
      Authentication.register($scope.user).then(function (authData) {
          $log.debug('LoginCtrl: Registered successfully with payload:', authData);
          $scope.login().then(function() {
            settingsMgr.addUser(authData.uid, $scope.user);
            // this method is no async anymore, error handling needs to be provided as function
            // .then(function() {
            // }).catch(function(error) {
            //     setErrorMessage(error.message);
            //     $log.error('ERROR: adding user to store after registering failed');
            // });
          });
      }).catch(function(error) {
          setErrorMessage(error.message);
      });
  	}; // register

    // should not stay on login or register page in case already logged in
    if(settingsMgr.getCurrentUser()) {
      $location.path('/main');
    }
    $scope.$on('handleCurrentUserSet', function () {
        if(settingsMgr.getCurrentUser()) {
          $location.path('/main');
        }
    });

  }]);
