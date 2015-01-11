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


  it('should toggle showAll between false/undefined, when showAllDef (check) toggles between true/ false', function () {
    expect(scope.showAllDef).toBe(false);
    expect(scope.showAll).toBe(undefined);

    scope.$digest();
    scope.showAllDef = true;
    scope.$digest();

    expect(scope.showAllDef).toBe(true);
    expect(scope.showAll).toBe(false);

    scope.$digest();
    scope.showAllDef = false;
    scope.$digest();

    expect(scope.showAllDef).toBe(false);
    expect(scope.showAll).toBe(undefined);
  });
});
