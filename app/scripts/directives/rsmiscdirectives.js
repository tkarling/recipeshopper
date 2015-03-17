'use strict';

/**
 * @ngdoc directive
 * @name recipeshopperApp.directive:rsTileRightDelete
 * @description
 * # rsTileRightDelete
 */
angular.module('recipeshopperApp')
  .directive('rsSideMenu', function () {
    return {
      templateUrl: 'views/sidemenu.html',
      restrict: 'E',
      replace: true,
      link: function postLink(scope, element, attrs) {
        // console.log('rsSideMenu called');
      }
    };
  })
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
  .directive('rsTileLeftCheck', function () {
    return {
      template: '<div class="md-tile-left">' + 
                  '<md-checkbox md-no-ink aria-label="{{ariaLabel}}" ng-model="item.isbought"' +
                    'class="md-primary" ng-change="saveItem(item)">' +
                  '</md-checkbox>' +
                '</div>',
      // scope: {
      //   saveItemFn: '&',
      //   ariaLabel: '@',
      //   myModel: '='
      // },
      restrict: 'E',
      replace: true,
      link: function postLink(scope, element, attrs) {
        // console.log('rsTileLeftCheck called');
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
