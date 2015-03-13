'use strict';

describe('Directive: rsTileRightDelete', function () {

  // load the directive's module
  beforeEach(module('recipeshopperApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<rs-tile-right-delete></rs-tile-right-delete>');
    element = $compile(element)(scope);
    expect(element.hasClass('md-tile-right')).toBe(true);
  }));
});
