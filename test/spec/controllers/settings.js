'use strict';

describe('Controller: SettingsCtrl', function () {

  // load the controller's module
  beforeEach(function () {
    module('recipeshopperApp');
    module('firebase.mock');
    module('settingsMod.mock');
    module('storedListMod.mock');
  });

  var SettingsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SettingsCtrl = $controller('SettingsCtrl', {
      $scope: scope
    });
  }));

  it('a test should pass', function () {
      expect(true).toEqual(true);
  });

  // it('should attach a list of awesomeThings to the scope', function () {
  //   expect(scope.awesomeThings.length).toBe(3);
  // });
});
