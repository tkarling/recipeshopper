'use strict';

/**
 * @ngdoc service
 * @name recipeshopperApp.recipeMgr
 * @description
 * # recipeMgr
 * Factory in the recipeshopperApp.
 */
angular.module('recipeshopperApp')
  .factory('recipeMgr', function ($log, $firebaseObject,
                                  FIREBASE_URL, FB_RECIPE_XTRAS_URL,
                                  settingsMgr) {
    var data = {};
    var recipe = {};
    // Public API here

    var getXtrasFromDB = function(recipeId) {
      var myUid = settingsMgr.getCurrentUser();
      recipe.recipeId = recipeId;
      var fbUrl = FIREBASE_URL + '/' + myUid + FB_RECIPE_XTRAS_URL + '/' + recipeId;
      //$log.debug('recipeMgr: getXtrasFromDB fbUrl: ', fbUrl);
      data.ref = new Firebase(fbUrl);
      recipe.xtras = $firebaseObject(data.ref);
      return recipe.xtras;
    }; // getXtrasFromDB

    return {
      getXtras: function (recipeId) {
        if(recipeId == recipe.recipeId) {
          return recipe.xtras;
        } // else
        return getXtrasFromDB(recipeId);
      },
      saveXtras: function() {
        if(recipe.xtras) {
          //$log.debug('recipeMgr: saveXtras recipe.xtras: ', recipe.xtras);
          recipe.xtras.$save();
        }
      }
    };
  });
