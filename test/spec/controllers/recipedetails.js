'use strict';

describe('Controller: RecipeDetailsController', function () {

  // load the controller's module
  beforeEach(module('recipeshopperApp'));

  var RecipeDetailsController,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RecipeDetailsController = $controller('RecipeDetailsController', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
