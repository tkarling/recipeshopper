'use strict';

/**
 * @ngdoc directive
 * @name recipeshopperApp.directive:rsTileRightDelete
 * @description
 * # rsTileRightDelete
 */
angular.module('recipeshopperApp')
  .directive('rsAppTitleBar', function () {
    return {
      templateUrl: 'views/apptitlebar.html',
      // template: '<p></p>',
      restrict: 'E',
      replace: true,
      link: function postLink(scope, element, attrs) {
        console.log('rsAppTitleBar called');
      }
    };
  })
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
          // console.log('rsSearchBar called');
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
        // console.log('rsTileRightDelete called');
      }
    };
  });
