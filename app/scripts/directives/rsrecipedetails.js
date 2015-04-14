'use strict';

/**
 * @ngdoc directive
 * @name recipeshopperApp.directive:rsRecipeDetails
 * @description
 * # rsRecipeDetails
 */
angular.module('recipeshopperApp')
  .directive('rsRecipeInfo', function () {
    return {
      templateUrl: 'views/recipeinfo.html',
      restrict: 'E',
      replace: true,
      link: function postLink(scope, element, attrs) {
        //console.log('rsRecipeInfo called');
      }
    };
  })
  .directive('rsRecipeIngredients', function () {
    return {
      templateUrl: 'views/recipeingredients.html',
      restrict: 'E',
      replace: true,
      link: function postLink(scope, element, attrs) {
        //console.log('rsRecipeIngredients called');
      }
    };
  });
