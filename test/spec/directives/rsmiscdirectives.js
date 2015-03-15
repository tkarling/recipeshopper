'use strict';

describe('Directive: rsTileRightDelete', function () {

  // load the directive's module
  beforeEach(module('recipeshopperApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make rs-tile-right-delete visible', inject(function ($compile) {
    element = angular.element('<rs-tile-right-delete></rs-tile-right-delete>');
    element = $compile(element)(scope);
    expect(element.hasClass('md-tile-right')).toBe(true);
  }));

  it('rs-search-bar should have 1 child', inject(function ($compile) {
    element = angular.element('<rs-search-bar></rs-search-bar>');
    element = $compile(element)(scope);
    expect(element.children().length).toBe(1);
  }));

  it('rs-search-bar should have 2 children', inject(function ($compile) {
    element = angular.element('<rs-search-bar show-checkbox="true"></rs-search-bar>');
    element = $compile(element)(scope);
    expect(element.children().length).toBe(1);
  }));

  it('rs-side-menu-item should have 1 child', inject(function ($compile) {
    element = angular.element('<rs-side-menu-item user-logged-in="true" click-action-fn="logout()"></rs-side-menu-item>');
    element = $compile(element)(scope);
    expect(element.children().length).toBe(1);
  }));

});
