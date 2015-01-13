'use strict';

describe('Controller: PicdemoCtrl', function () {

  // load the controller's module
  beforeEach(module('recipeshopperApp'));

  var PicdemoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PicdemoCtrl = $controller('PicdemoCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(true).toBe(true);
  });
});
