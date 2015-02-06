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
      $log.debug('Login Failed!', $scope.message, errorMessage);
    }; // setErrorMessage

    var loginAuthHandler = function (error, authData) {
      if (error) {
        $scope.$apply(setErrorMessage(error.message));
        $log.debug('logging out now');
        Authentication.logout();
      } else {
        $log.debug('Authenticated successfully with payload:', authData);
        $scope.$apply($location.path('/main'));
      }
    }; // loginAuthHandler

    $scope.login = function () {
      Authentication.login($scope.user, loginAuthHandler);
    }; // login

    $scope.logout = function () {
      Authentication.logout();
      // $location.path('/login'); // not really needed as on login page already
    }; // logout

    var registerAuthHandler = function (error, authData) {
      if (error) {
        $scope.$apply(setErrorMessage(error.message));
        $log.debug('Registration failed.');
      } else {
        $log.debug('Registered successfully with payload:', authData);
        // $scope.login();
        settingsMgr.addUser(authData.uid, $scope.user).then(function(data) {
          $scope.login();
        });
      }
    }; // registerAuthHandler

  	$scope.register = function () {
      Authentication.register($scope.user, registerAuthHandler);
  	}; // register

    $scope.user = {};
    $scope.user.email = Authentication.userEmail();
    $scope.user.userLoggedIn = Authentication.userLoggedIn();

    $rootScope.$on('handleUserLoggedInChanged', function () {
        $scope.user.email = Authentication.userEmail();
        $scope.user.userLoggedIn = Authentication.userLoggedIn();
        // $scope.$apply($scope.user.userLoggedIn = Authentication.userLoggedIn());
        $log.debug('LoginCtrl: handleUserLoggedInChanged called', $scope.user.userLoggedIn);
    });

  }]);
