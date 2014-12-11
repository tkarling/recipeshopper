'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('recipeshopperApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    console.log('moi');
    expect(scope.groceries.length).toBe(0);
  });

  it('should update showAll when showAllDef is updated', function () {
    expect(scope.showAllDef).toBe(false);
    expect(scope.showAll).toBe(undefined);
    scope.showAllDef = true;
    // Guess need to learn async tesing before this will work
    // expect(scope.showAllDef).toBe(true);
    // expect(scope.showAll).toBe(false);
  });
});
