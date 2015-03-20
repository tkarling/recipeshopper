'use strict';

/**
 * @ngdoc service
 * @name recipeshopperApp.recipeMgr
 * @description
 * # recipeMgr
 * Factory in the recipeshopperApp.
 */
angular.module('recipeshopperApp')
  .factory('recipeMgr', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
