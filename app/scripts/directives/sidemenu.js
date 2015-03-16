'use strict';

/**
 * @ngdoc directive
 * @name recipeshopperApp.directive:sideMenuDirectives
 * @description
 * # sideMenuDirectives
 */
angular.module('recipeshopperApp')
  .directive('rsSideMenuItem', function () {
    return {
      template: '<md-item-content>' +
                      '<md-button ng-disabled="! userLoggedInFn()" ng-click="clickActionFn()">' +
                        '<md-icon md-svg-src="{{iconPath}}"></md-icon>' +
                        '<span>{{menuItemText}}</span>' +
                      '</md-button>' +
                  '</md-item-content>',
      scope: {
        userLoggedInFn: '&',
        clickActionFn: '&',
        menuItemText: '@',
        iconName: '@'
      },
      restrict: 'E',
      replace: true,
      link: function postLink(scope, element, attrs) {
        // console.log('rsSideMenuItem called');
        scope.iconPath = '../bower_components/material-design-icons/action/svg/production/' + scope.iconName + '_24px.svg';
      }
    };
  })
  .directive('rsSideMenu', function () {
    return {
      templateUrl: 'views/sidemenu.html',
      restrict: 'E',
      replace: true,
      link: function postLink(scope, element, attrs) {
        // console.log('rsSideMenu called');
      }
    };
  });
