// 'use strict';

/**
 * @ngdoc function
 * @name loginMod.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the loginMod
 */
 angular
.module('loginMod', [
  'authenticationMod',
]);

angular.module('loginMod')
  .controller('LoginCtrl', ['$scope', '$log', '$location', 'Authentication', 
    function ($scope, $log, $location, Authentication) {
  	// $scope.$on('$viewContentLoaded', function() {
  	// 	console.log($scope.myform);
  	// });
    
    currentTab=0;

    var setErrorMessage = function (errorMessage) {
      $scope.message = errorMessage;
      $log.debug("Login Failed!", $scope.message, errorMessage);
    } // setErrorMessage

    var loginAuthHandler = function (error, authData) {
      if (error) {
        $scope.$apply(setErrorMessage(error.message));
        $log.debug('logging out now');
        Authentication.logout();
      } else {
        $log.debug("Authenticated successfully with payload:", authData);
        $scope.$apply($location.path('/main'));
      }
    } // loginAuthHandler

    $scope.login = function () {
      Authentication.login($scope.user, loginAuthHandler);
    } // login

    $scope.logout = function () {
      Authentication.logout();
      // $location.path('/login'); // not really needed as on login page already
    } // logout

    var registerAuthHandler = function (error, authData) {
      if (error) {
        $scope.$apply(setErrorMessage(error.message));
        $log.debug('Registration failed.');
      } else {
        $log.debug("Registered successfully with payload:", authData);
        $scope.login();
      }
    } // registerAuthHandler

  	$scope.register = function () {
      Authentication.register($scope.user, registerAuthHandler);
  	} // register

    $scope.userEmail = Authentication.userEmail();
    $scope.userLoggedIn = Authentication.userLoggedIn();

  }]);
