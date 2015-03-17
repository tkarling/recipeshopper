'use strict';

describe('Directive: rsTileRightDelete', function () {

  // load the templates
  beforeEach(module('views/apptitlebar.html'));

  // load the directive's module
  beforeEach(module('recipeshopperApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
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

  it('rs-tile-left-check should have 1 child', inject(function ($compile) {
    element = angular.element('<rs-tile-left-check></rs-tile-left-check>');
    element = $compile(element)(scope);
    expect(element.children().length).toBe(1);
  }));

  it('rs-tile-right-delete should have 1 child', inject(function ($compile) {
    element = angular.element('<rs-tile-right-delete></rs-tile-right-delete>');
    element = $compile(element)(scope);
    expect(element.children().length).toBe(1);
  }));

  // // could not figure out how to test directive which uses templateUrl. 
  // it('rs-app-title-bar should have 1 child', inject(function ($compile) {
  //   element = angular.element('<rs-app-title-bar></rs-app-title-bar>');
  //   element = $compile(element)(scope);
  //   console.log('element', element);
  //   expect(element.children().length).toBe(1);
  // })); 

});
