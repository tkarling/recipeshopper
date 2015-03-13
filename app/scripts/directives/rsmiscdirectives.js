'use strict';

/**
 * @ngdoc directive
 * @name recipeshopperApp.directive:rsTileRightDelete
 * @description
 * # rsTileRightDelete
 */
angular.module('recipeshopperApp')
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
  });
