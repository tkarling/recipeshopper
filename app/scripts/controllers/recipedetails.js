'use strict';

/**
 * @ngdoc function
 * @name recipeshopperApp.controller:RecipeDetailsController
 * @description
 * # RecipeDetailsController
 * Controller of the recipeshopperApp
 */

angular.module('recipeshopperApp')
  .controller('RecipeDetailsController', ['$scope', '$routeParams', '$log', '$location', '$http',
    'FB_RECIPES_URL', 'FB_SHOPPINGLIST_URL',
    'StoredListMgrFactory', 'settingsMgr', 'recipeMgr',
    function ($scope, $routeParams, $log, $location, $http,
              FB_RECIPES_URL, FB_SHOPPINGLIST_URL,
              StoredListMgrFactory, settingsMgr, recipeMgr) {

      // Start from first tab
      $scope.data = {};
      $scope.data.selectedTabIndex = Number($routeParams.tabId) || (($routeParams.itemId == 'Add') ? 0 : 1);

      $scope.recipe = {};
      // $log.debug('RecipeDetailsController: $routeParams.itemId', $routeParams.itemId);

      var ingredientsMgr;
      var setIngredientsMgrAndIngredients = function () {
        if ($scope.recipe && $scope.recipe.$id) {
          ingredientsMgr = StoredListMgrFactory.getUsersStoredListMgr(FB_SHOPPINGLIST_URL);
          ingredientsMgr.getItems('recipeId', $scope.recipe.$id).then(function (data) {
            $scope.ingredients = data;
            // $log.debug('setIngredientsMgrAndIngredients: $scope.ingredients: ', $scope.ingredients);
          });
        }
      };

      $scope.deleteIngredient = function (item) {
        ingredientsMgr.deleteItem(item);
      }; // deleteIngredient

      $scope.saveIngredient = function (item, itemWasPutOnList) {
        if (itemWasPutOnList) {
          item.isbought = false;
        }
        ingredientsMgr.saveItem(item);
      }; // saveIngredient

      var recipePtr;
      var initRecipe = function (recipeId) {
        var currentUser = settingsMgr.getCurrentUser();
        // $log.debug('RecipeDetailsController: initRecipe currentUser', currentUser);
        if (currentUser) {
          if (recipeId) {
            $scope.recipesMgr = StoredListMgrFactory.getUsersStoredListMgr(FB_RECIPES_URL);
            if ($scope.recipesMgr.noOfItems() == undefined) {
              // refresh page case
              $location.path('/recipelist');
            }
            if (recipeId != 'Add') {
              $scope.recipe = $scope.recipesMgr.getCopyOfItem(recipeId);
              if ($scope.recipe) {
                //$scope.recipe.instructions = $scope.recipe.instructions || 'Please click to add Instructions';
                setIngredientsMgrAndIngredients();
                $scope.recipextras = recipeMgr.getXtras(recipeId);
              }
            }
          }
        } else {
          $location.path('/login');
        }
      }; // initRecipe

      $scope.$on('handleCurrentUserSet', function () {
        initRecipe($routeParams.itemId);
      });
      initRecipe($routeParams.itemId);

      $scope.addOrSaveRecipe = function (updateUrl) {
        $log.debug('RecipeDetailsController: addOrSaveRecipe $scope.recipe', $scope.recipe);
        if ($scope.recipe.recipename) { // form/recipe is valid
          if (!$scope.recipe.$id) {
            // recipe has never been saved if it does not have id
            $scope.recipe.onlist = true;
            $scope.recipesMgr.addItem($scope.recipe).then(function (addedRecipeId) {
              // update url, so that you can return to it from product details page, if needed
              if (updateUrl) {
                var pagelink = '/recipedetails/' + addedRecipeId + '/Tab/' + $scope.data.selectedTabIndex;
                $location.path(pagelink);
              }
            });
          } else {
            $scope.recipesMgr.saveFromCopyOfItem($scope.recipe);
            recipeMgr.saveXtras();
          }
        }
      }; // addOrSaveRecipe

      $scope.getTitle = function () {
        var recipeName = $scope.recipe ? $scope.recipe.recipename : '';
        return ($routeParams.itemId == 'Add') ? 'Add Recipe' : recipeName;
      }; // getTitle

      $scope.gotoDetailsPage = function (item, fromListId, fromListName) {
        var pagelink = '/productdetails/ListId/' + fromListId + '/ListName/' + fromListName + '/Item/' + item.$id;
        $log.debug('RecipeDetailsController: gotoDetailsPage pagelink: ', pagelink);
        $location.path(pagelink);
      }; // gotoDetailsPage

      $scope.gotoAddPage = function (fromListId, fromListName) {
        var pagelink = '/productdetails/ListId/' + fromListId + '/ListName/' + fromListName + '/Item/Add';
        $log.debug('BaselistCtrl: pagelink: ', pagelink);
        $location.path(pagelink);
      };

      $scope.$watch(function () {
          return $scope.data.selectedTabIndex;
        },
        function (newValue, oldValue) {
          // tab changed
          // $log.debug('RecipeDetailsController: tab changed: newValue, oldValue', newValue, oldValue);
          if ((oldValue == 0) && (newValue != 0)) {
            $scope.addOrSaveRecipe(true); // true for updating url, so that you can return to this page, if needed
          }
        }
      );

    }]);
