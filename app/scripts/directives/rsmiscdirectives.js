'use strict';

/**
 * @ngdoc directive
 * @name recipeshopperApp.directive:rsTileRightDelete
 * @description
 * # rsTileRightDelete
 */
angular.module('recipeshopperApp')
  .directive('rsSearchBar', function () {
    return {
      template: '<md-content layout="row">' +
                    '<md-input-container flex>' +
                        '<label>{{placeholderText}}</label>' +
                        '<input ng-model="query">' +
                    '</md-input-container>' +
                    '<md-checkbox ng-if="showCheckbox" md-no-ink aria-label="Do Not Show Bought"' +
                      'ng-model="mySettings.doNotShowBoughtItems" ng-change="updateShowAll()"' +
                      'class="md-primary">' +
                    '</md-checkbox>' +
                '</md-content>',
      restrict: 'E',
      replace: true,
      link: function postLink(scope, element, attrs) {
        scope.showCheckbox = attrs['showCheckbox'];
        scope.placeholderText = attrs['placeholderText'] || 'Search';
        // element.text('this is the rsTileRightDelete directive');
      }
    };
  })
  .directive('rsTileRightDelete', function () {
    return {
      template: '<div class="md-tile-right md-padding">' + 
                  '<md-button id="deleteitembutton" class="md-warn md-raised md-hue-2"' +
                    'ng-click="deleteItem(item)" aria-label="Delete">' +
                    '<md-icon md-svg-src="../bower_components/material-design-icons/action/svg/production/ic_delete_24px.svg">' +
                    '</md-icon>' +
                  '</md-button>' +
                '</div>',
      restrict: 'E',
      replace: true,
      link: function postLink(scope, element, attrs) {
        // element.text('this is the rsTileRightDelete directive');
      }
    };
  })
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
        scope.iconPath = '../bower_components/material-design-icons/action/svg/production/' + scope.iconName + '_24px.svg';
      }
    };
  });

