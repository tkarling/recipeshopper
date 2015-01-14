'use strict';

describe('Controller: RecipeDetailsController', function () {

  // load the controller's module
  beforeEach(module('recipeshopperApp'));

  var RecipeDetailsController;
  var scope, routeParams, location;
  var mockStoredListMgrFactory, mockBasicStoredListMgr, mockUrl;
  var recipesFromStore;
  var q, deferred;

  beforeEach(function () {
      recipesFromStore = [{recipeName:'porkkanalaatikko'}, {recipeName:'lanttulaatikko'}, {recipeName:'rosolli'}];
      mockUrl = 'mockUrl';

      mockBasicStoredListMgr = {
          getItems: function (fieldName, fieldValue) {
              deferred = q.defer();
              return deferred.promise;
          },
          addItem: function (item) {
              deferred = q.defer();
              return deferred.promise;
          },
          deleteItem: function (item) {
              deferred = q.defer();
              return deferred.promise;
          },
          saveItem: function (item) {
              deferred = q.defer();
              return deferred.promise;
          }
      }; // mockBasicStoredListMgr

      mockStoredListMgrFactory = {
        getStoredListMgr: function (fbUrl) {
              return mockBasicStoredListMgr;
        } //getStoredListMgr

      };
  });

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _$routeParams_, _$log_, _$location_, _$q_) {
    q= _$q_;
    scope = $rootScope.$new();
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

  it('should initialize recipes array, when recipes in DB', function () {
    deferred.resolve(recipesFromStore);
    scope.$root.$digest();

    expect(scope.recipes.length).toEqual(3); 
    expect(scope.recipes[0].recipeName).toEqual(recipesFromStore[0].recipeName); 
    expect(scope.recipes[1].recipeName).toEqual(recipesFromStore[1].recipeName); 
    expect(scope.recipes[2].recipeName).toEqual(recipesFromStore[2].recipeName); 
   }); 

  it('should initialize (scope) recipe, when recipes in DB', function () {
    deferred.resolve(recipesFromStore);
    scope.$root.$digest();

    expect(scope.recipe.recipeName).toEqual(recipesFromStore[0].recipeName); 
   }); 

  it('should initialize next & prev item, when recipes in DB', function () {
    deferred.resolve(recipesFromStore);
    scope.$root.$digest();

    expect(scope.whichItem).toEqual(0); 
    expect(scope.nextItem).toEqual(1); 
    expect(scope.prevItem).toEqual(2); 
  }); 

  it('can go to next item, when recipes in DB', function () {
    deferred.resolve(recipesFromStore);
    scope.$root.$digest();
    spyOn(location, 'path');

    scope.gotoNextItem();   
    expect(location.path).toHaveBeenCalledWith('/recipedetails/1'); 
  }); 

  it('can go to prev item, when recipes in DB', function () {
    deferred.resolve(recipesFromStore);
    scope.$root.$digest();
    spyOn(location, 'path');

    scope.gotoPrevItem();   
    expect(location.path).toHaveBeenCalledWith('/recipedetails/2'); 
  }); 

  it('should initialize OK, when NO recipes in DB', function () {
    deferred.resolve([]);
    scope.$root.$digest();

    expect(scope.recipes.length).toEqual(0); 
    expect(scope.recipe).toEqual(null); 
    expect(scope.whichItem).toEqual(0); 
    expect(scope.nextItem).toEqual(0); 
    expect(scope.prevItem).toEqual(0); 
  }); 


});
