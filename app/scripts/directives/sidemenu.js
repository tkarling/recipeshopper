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
  .directive('lineThrough', function() {
    return function (scope, element, attrs) {
        var shouldLineThrough = attrs['lineThrough'];
        var watcherFn = function (watchscope) {
          return watchscope.$eval(shouldLineThrough);
        };
        scope.$watch(watcherFn, function(newValue) {
          // console.log('lineThrough: newValue: ' + newValue);
          if(newValue) {
            element.find('span').addClass('rs-line-through');
          } else {
            element.find('span').removeClass('rs-line-through');
          }
        });
    };
  })
  .directive('mkSideMenuItem', function () {
    return {
      template: '<md-list-item>' +
                      '<md-button ng-disabled="! userLoggedInFn()" ng-click="clickActionFn()">' +
                        '<md-icon md-svg-src="{{iconPath}}"></md-icon>' +
                        '<span>{{menuItemText}}</span>' +
                      '</md-button>' +
                  '</md-list-item>',
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
                    '<md-toolbar>' +
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
