'use strict';

/**
 * @ngdoc directive
 * @name recipeshopperApp.directive:rsRecipeDetails
 * @description
 * # rsRecipeDetails
 */
angular.module('recipeshopperApp')
  .directive('rsRecipeInfo', function ($log, $window) {
    return {
      templateUrl: 'views/recipeinfo.html',
      restrict: 'E',
      replace: true,
      link: function postLink(scope, element, attrs) {
        //console.log('rsRecipeInfo called');
        var imgMaxHeightStyle, imgMaxWidthStyle;
        scope.$watch(function () { return $window.innerHeight; }, function() {
          imgMaxHeightStyle = 'max-height: ' + ($window.innerHeight / 2) + 'px';
          scope.imgStyle = imgMaxHeightStyle + ';' + imgMaxWidthStyle +
          ';display:block;margin-left:auto;margin-right:auto';
          //$log.debug('RecipeDetailsController $watch: scope.imgStyle', scope.imgStyle);
        }); // $watch

        scope.$watch(function () { return $window.innerWidth; }, function() {
          imgMaxWidthStyle = 'max-width: ' + ($window.innerWidth-10) + 'px';
          scope.imgStyle = imgMaxHeightStyle + ';' + imgMaxWidthStyle +
          ';display:block;margin-left:auto;margin-right:auto';
          //$log.debug('RecipeDetailsController $watch: scope.imgStyle', scope.imgStyle);
        }); // $watch

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
  })
  .directive('rsRecipeInstructions', function () {
    return {
      templateUrl: 'views/recipeinstructions.html',
      restrict: 'E',
      replace: true,
      link: function postLink(scope, element, attrs) {
        //console.log('rsRecipeInstructions called');
      }
    };
  });
