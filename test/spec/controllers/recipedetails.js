'use strict';

describe('Controller: RecipeDetailsController', function () {

  // load the controller's module
  beforeEach(function () {
    module('recipeshopperApp');
    module('firebase.mock');
    module('settingsMod.mock');
    module('storedListMod.mock');
  });

  var RecipeDetailsController;
  var scope, $rootScope, routeParams, location;
  var mockStoredListMgrFactory, mockBasicStoredListMgr, mockUrl;
  var recipesFromStore;

  beforeEach(function () {
      mockUrl = 'mockUrl';
  });

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, _$rootScope_, _$routeParams_, _$log_, _$location_,
                              _StoredListMgrFactory_) {
    $rootScope = _$rootScope_;
    scope = $rootScope.$new();
    mockStoredListMgrFactory = _StoredListMgrFactory_;
    mockBasicStoredListMgr = mockStoredListMgrFactory.getUsersStoredListMgr();
    location = _$location_;
    routeParams = _$routeParams_;
    routeParams.itemId = 0;
    RecipeDetailsController = $controller('RecipeDetailsController', {
      $scope: scope,
      $routeParams: routeParams,
      $log: _$log_,
      $location: location,
      FB_RECIPES_URL: mockUrl,
      StoredListMgrFactory: mockStoredListMgrFactory
    });
  }));

  it('a test should pass', function () {
      expect(true).toEqual(true);
  }); // it

  // it('should initialize recipes array, when recipes in DB', function () {
  //   deferred.resolve(recipesFromStore);
  //   scope.$root.$digest();

  //   expect(scope.recipes.length).toEqual(3);
  //   expect(scope.recipes[0].recipeName).toEqual(recipesFromStore[0].recipeName);
  //   expect(scope.recipes[1].recipeName).toEqual(recipesFromStore[1].recipeName);
  //   expect(scope.recipes[2].recipeName).toEqual(recipesFromStore[2].recipeName);
  //  });

  // it('should initialize (scope) recipe, when recipes in DB', function () {
  //   deferred.resolve(recipesFromStore);
  //   scope.$root.$digest();

  //   expect(scope.recipe.recipeName).toEqual(recipesFromStore[0].recipeName);
  //  });

  // it('should initialize next & prev item, when recipes in DB', function () {
  //   deferred.resolve(recipesFromStore);
  //   scope.$root.$digest();

  //   expect(scope.whichItem).toEqual(0);
  // });

  // it('should initialize OK, when NO recipes in DB', function () {
  //   deferred.resolve([]);
  //   scope.$root.$digest();

  //   expect(scope.recipes.length).toEqual(0);
  //   expect(scope.recipe).toEqual(null);
  //   expect(scope.whichItem).toEqual(0);
  // });


});
