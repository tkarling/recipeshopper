'use strict';

/**
 * @ngdoc overview
 * @name recipeshopperApp
 * @description
 * # recipeshopperApp
 *
 * Main module of the application.
 */
angular
  .module('recipeshopperApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'ngMaterial',
    'ngAria',
    'ngMessages',
    'storedListMod', 
    'settingsMod', 
    'fileReaderMod',
    'loginMod'
  ])
  .config(function($mdThemingProvider) {
    //will use the colors from default theme for any color not defined.
    $mdThemingProvider.theme('green')
      .primaryPalette('green');
  })
  .constant('FIREBASE_URL', 'https://recipeshopper.firebaseio.com')
  .config(['localStorageServiceProvider', function(localStorageServiceProvider){
    localStorageServiceProvider.setPrefix('ls');
  }])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/main', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'LoginCtrl'
      })
      .when('/settings', {
        templateUrl: 'views/settings.html',
        controller: 'SettingsCtrl'
      })
      .when('/recipelist', {
        templateUrl: 'views/recipelist.html',
        controller: 'RecipelistCtrl'
      })
      .when('/picdemo', {
        templateUrl: 'views/picdemo.html', 
        controller: 'PicdemoCtrl' // change this to PicdemoCtrl later
      })
      .when('/recipedetails/:itemId', {
        templateUrl: 'views/recipedetails.html',
        controller: 'RecipeDetailsController'
      })

      .otherwise({
        redirectTo: '/login'
      });
  })
  .controller('AppCtrl', function($scope, $timeout, $mdSidenav, $log, $location, settingsMgr) {
    $scope.toggleLeft = function() {
      $mdSidenav('left').toggle();
      // .then(function(){
      //     $log.debug("toggle left is done");
      // });
    };

    $scope.gotoPage = function(pagelink){
      $log.debug('AppCtrl: pagelink: ', pagelink);
      $location.path(pagelink);
    };

    $scope.userLoggedIn = settingsMgr.getCurrentUser() != '';
      $log.debug('AppCtrl: $scope.userLoggedIn: ', $scope.userLoggedIn);

    $scope.$on('handleCurrentUserSet', function () {
        $scope.userLoggedIn = settingsMgr.getCurrentUser() != '';
        $log.debug('AppCtrl: handleCurrentUserSet called', $scope.userLoggedIn);
    });

  })
  .controller('LeftCtrl', function($scope, $rootScope, $timeout, $mdSidenav, $log, $location, settingsMgr, Authentication) {
    // Authentication must be a dependency for this controller, so that it will be initiated independent on which age user refreshes app
    $log.debug('LeftCtrl: init controller');

    $scope.close = function() {
      $mdSidenav('left').close();
      // .then(function(){
      //   $log.debug("close LEFT is done");
      // });
    };

    $scope.gotoPage = function(pagelink){
      $log.debug('LeftCtrl: pagelink: ', pagelink);
      $location.path(pagelink);
      $mdSidenav('left').close();
    };

    $scope.userLoggedIn = settingsMgr.getCurrentUser() != '';
    $log.debug('LeftCtrl: $scope.userLoggedIn: ', $scope.userLoggedIn);

    $scope.$on('handleCurrentUserSet', function () {
        $scope.userLoggedIn = settingsMgr.getCurrentUser() != '';
        $log.debug('LeftCtrl: handleCurrentUserSet called', $scope.userLoggedIn);
    });

  });

