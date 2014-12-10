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
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/main', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/main'
      });
  })
  .controller('TabCtrl', function ($scope) {
    this.setTab = function(tab){
      currentTab = tab;
    };

    this.isSet = function(tab){
      return (currentTab === tab);
    };

  });

var currentTab=2;
