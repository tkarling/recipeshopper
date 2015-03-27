'use strict';

/**
 * @ngdoc filter
 * @name recipeshopperApp.filter:miscFilters
 * @function
 * @description
 * # miscFilters
 * Filter in the recipeshopperApp.
 */
angular.module('recipeshopperApp')
  .filter('titleCase', function() {
   // by hollandben from https://gist.github.com/maruf-nc/5625869
      return function(str) {
          return (str == undefined || str === null) ? '' : str.replace(/_|-/, ' ').replace(/\w\S*/g, function(txt){
              return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
          });
      }
  });
