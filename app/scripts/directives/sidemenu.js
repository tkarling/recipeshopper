'use strict';

/**
 * @ngdoc directive
 * @name mkDirectivesMod.directive:sideMenuDirectives
 * @description
 * # sideMenuDirectives
 */
angular
.module('mkDirectivesMod', []);

angular.module('mkDirectivesMod')
  .directive('mkSideMenuItem', function () {
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
  .directive('mkSideMenu', function () {
    return {
      template: '<div><md-sidenav class="md-sidenav-left md-whiteframe-z2" md-component-id="left"' +
                    'md-is-locked-open="$mdMedia(\'gt-md\')">' +
                    '<md-toolbar md-theme="green">' +
                      '<h1 class="md-toolbar-tools">{{menuTitle}}</h1>' +
                    '</md-toolbar>' +
                    '<md-content class="md-padding" ng-transclude>' +
                    '</md-content>' +
                '</md-sidenav></div>',
      scope: {
        menuTitle: '@'
      },
      restrict: 'E',
      transclude: true,
      link: function postLink(scope, element, attrs) {
        // console.log('mkSideMenu called');
      }
    };
  });
