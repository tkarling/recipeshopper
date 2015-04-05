'use strict';

describe('rsDetailPages Directives', function () {

  // load the templates
  beforeEach(module('views/productcontent.html'));

  // load the directive's module
  beforeEach(module('recipeshopperApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    var data = {};
    element = angular.element('<rs-aisles-menu rs-model="data.value"></rs-aisles-menu>');
    element = $compile(element)(scope);
    expect(element.children().length).toBe(1);
  }));

  ////could not figure out how to test directive which uses templateUrl.
  //it('rs-product-content directive can be created', inject(function ($compile) {
  //  element = angular.element('<rs-product-content></rs-product-content>');
  //  element = $compile(element)(scope);
  //  expect(element.children().length).toBe(1);
  //}));
});
