'use strict';

/**
 * @ngdoc overview
 * @name recipeshopperApp
 * @description
 * # recipeshopperApp
 *
 * Main module of the application.
 */
angular.module('recipeshopperApp', [
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
    'productsFromStringMod',
    'loginMod',
    'mkDirectivesMod'
  ])
  .config(function ($mdThemingProvider) {
    //will use the colors from default theme for any color not defined.
    $mdThemingProvider.theme('green')
      .primaryPalette('green');
  })
  .constant('FIREBASE_URL', 'https://recipeshopper.firebaseio.com')
  .constant('FB_SHOPPINGLIST_URL', '/shoppinglist')
  .constant('FB_RECIPES_URL', '/recipes')
  .constant('FB_RECIPE_XTRAS_URL', '/recipextradetails')
  .config(['localStorageServiceProvider', function (localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('ls');
  }])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/main', {
        templateUrl: 'views/main.html',
        controller: 'BaselistCtrl'
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
        controller: 'BaselistCtrl'
      })
      .when('/favorites', {
        templateUrl: 'views/favorites.html',
        controller: 'BaselistCtrl'
      })
      .when('/picdemo', {
        templateUrl: 'views/picdemo.html',
        controller: 'PicdemoCtrl'
      })
      .when('/productdetails/List/:listId/Item/:itemId', {
        templateUrl: 'views/productdetails.html',
        controller: 'ProductDetailsController'
      })
      .when('/productdetails/ListId/:listId/ListName/:listName/Item/:itemId', {
        templateUrl: 'views/productdetails.html',
        controller: 'ProductDetailsController'
      })
      .when('/recipedetails/:itemId', {
        templateUrl: 'views/recipedetails.html',
        controller: 'RecipeDetailsController'
      })
      .when('/recipedetails/:itemId/Tab/:tabId', {
        templateUrl: 'views/recipedetails.html',
        controller: 'RecipeDetailsController'
      })

      .otherwise({
        redirectTo: '/login'
      });
  })
  .controller('LeftCtrl', function ($scope, $rootScope, $timeout, $mdSidenav, $log, $location, settingsMgr, Authentication) {
    // Authentication must be a dependency for this controller, so that it will be initiated independent on which age user refreshes app
    // $log.debug('LeftCtrl: init controller');

    $scope.close = function () {
      $mdSidenav('left').close();
      // .then(function(){
      //   $log.debug("close LEFT is done");
      // });
    }; // $scope.close

    $scope.gotoPage = function (pagelink) {
      // $log.debug('LeftCtrl: pagelink: ', pagelink);
      $location.path(pagelink);
      $mdSidenav('left').close();
    }; // $scope.gotoPage

    $scope.logout = function () {
      Authentication.logout();
      $scope.gotoPage('/login');
    }; // $scope.logout

    var userLoggedIn;
    $scope.userLoggedIn = function () {
      return userLoggedIn;
    }

    userLoggedIn = settingsMgr.getCurrentUser() != '';
    // $log.debug('LeftCtrl: $scope.userLoggedIn: ', $scope.userLoggedIn());

    $scope.$on('handleCurrentUserSet', function () {
      userLoggedIn = settingsMgr.getCurrentUser() != '';
      // $log.debug('LeftCtrl: handleCurrentUserSet called', $scope.userLoggedIn());
    });

  });

