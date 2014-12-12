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
    'LocalStorageModule'
  ])
  .config(['localStorageServiceProvider', function(localStorageServiceProvider){
    localStorageServiceProvider.setPrefix('ls');
  }])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/main', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/recipedetails', {
        templateUrl: 'views/recipedetails.html',
        controller: 'RecipeDetailsController'
      })
      .otherwise({
        redirectTo: '/main'
      });
  })
  .controller('TabController', function ($scope) {
    $scope.setTab = function(tab){
      currentTab = tab;
    };

    $scope.isSet = function(tab){
      return (currentTab === tab);
    };

  });

var currentTab=2;
