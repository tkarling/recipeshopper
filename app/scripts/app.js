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
    'storedListMod', 
    'settingsMod', 
    'fileReaderMod',
    'loginMod'
  ])
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
  .controller('AppCtrl', function($scope, $timeout, $mdSidenav, $log) {
    $scope.toggleLeft = function() {
      $mdSidenav('left').toggle();
      // .then(function(){
      //     $log.debug("toggle left is done");
      // });
    };
  })
  .controller('LeftCtrl', function($scope, $rootScope, $timeout, $mdSidenav, $log, $location, Authentication) {
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

    $rootScope.$on('handleUserLoggedInChanged', function () {
        $scope.userLoggedIn = Authentication.userLoggedIn();
        $log.debug('LeftCtrl: handleUserLoggedInChanged called', $scope.userLoggedIn);
    });

  });

