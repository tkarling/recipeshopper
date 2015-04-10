'use strict';

/**
 * @ngdoc directive
 * @name recipeshopperApp.directive:rsProductDetails
 * @description
 * # rsProductDetails
 */
angular.module('recipeshopperApp')
  .directive('rsAislesMenu', function () {
    return {
      template: '<div>\
          <!-- <label>{{ currentItem.aisle ? \'Aisle:\' : \'Please Pick Aisle\' }} -->\
          <md-select ng-model="rsModel">\
            <md-option value="PROTEINS">PROTEINS</md-option>\
            <md-option value="DAIRY">DAIRY</md-option>\
            <md-option value="VEGGIES&FRUIT">VEGGIES&FRUIT</md-option>\
            <md-option value="GRAINS">GRAINS</md-option>\
            <md-option value="NUTS&SEEDS">NUTS&SEEDS</md-option>\
            <md-option value="EXTRAS">EXTRAS</md-option>\
            <md-option value="UNKNOWN">UNKNOWN</md-option>\
          </md-select>\
          <!-- </label> -->\
        </div>',
      scope: {
        rsModel: '='
      },
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        // console.log('rsAislesMenu called');
      }
    };
  })
  .directive('rsProductContent', function () {
    return {
      templateUrl: 'views/productcontent.html',
      restrict: 'E',
      replace: true,
      link: function postLink(scope, element, attrs) {
        // console.log('rsSideMenu called');
      }
    };
  });
