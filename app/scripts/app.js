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
    'storedListMod', 
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
      .otherwise({
        redirectTo: '/login'
      });
  })
  .controller('TabController', ['$scope', '$timeout', '$rootScope', 'Authentication', 
    function ($scope, $timeout, $rootScope, Authentication) {
    console.log('TabController created');  
    $scope.setTab = function(tab){
      currentTab = tab;
    };

    $scope.isSet = function(tab){
      return (currentTab === tab);
    };

    $rootScope.$on('handleUserLoggedInChanged', function () {
        $scope.userLoggedIn = Authentication.userLoggedIn();
        console.log('I am received');
    });

  }]);

var currentTab=2;
