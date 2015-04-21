'use strict';

describe('Controller: ProductDetailsController', function () {

  // load the controller's module
  beforeEach(function () {
    module('recipeshopperApp');
    module('settingsMod.mock');
    module('storedListMod.mock');
  });

  var ProductDetailsController;
  var scope, routeParams, location;
  var q, deferred;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProductDetailsController = $controller('ProductDetailsController', {
      $scope: scope
    });
  }));

  it('a test should pass', function () {
      expect(true).toEqual(true);
  }); // it

});
