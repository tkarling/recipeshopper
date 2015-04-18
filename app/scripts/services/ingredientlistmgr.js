'use strict';

/**
 * @ngdoc service
 * @name ingredientListMod.ingredientListMgr
 * @description
 * # ingredientListMgr
 * Factory in the ingredientListMod.
 */

angular.module('ingredientListMod', [
    'storedListMod',
  ]);

angular.module('ingredientListMod')
  .factory('ingredientListMgr', function () {

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
