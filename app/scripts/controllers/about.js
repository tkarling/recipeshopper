'use strict';

/**
 * @ngdoc function
 * @name recipeshopperApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the recipeshopperApp
 */
angular.module('aboutMod', []); 
angular.module('aboutMod')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    // currentTab=2;
  });
