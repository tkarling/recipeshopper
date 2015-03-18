'use strict';

describe('Directive: rsTileRightDelete', function () {

  // load the templates
  beforeEach(module('views/apptitlebar.html'));
  beforeEach(module('views/sidemenu.html'));

  // load the directive's module
  beforeEach(module('recipeshopperApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  // //could not figure out how to test directive which uses templateUrl. 
  // it('rs-side-menu should have 1 children', inject(function ($compile) {
  //   element = angular.element('<rs-side-menu></rs-side-menu>');
  //   element = $compile(element)(scope);
  //   expect(element.children().length).toBe(1);
  // }));

  // // could not figure out how to test directive which uses templateUrl. 
  // it('rs-app-title-bar should have 1 child', inject(function ($compile) {
  //   element = angular.element('<rs-app-title-bar></rs-app-title-bar>');
  //   element = $compile(element)(scope);
  //   console.log('element', element);
  //   expect(element.children().length).toBe(1);
  // })); 

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
    var data = {};
    data.value = true;
    var saveItem = function () {};
    element = angular.element('<rs-tile-left-check ng-model="data.value" save-item-fn="saveItem()" aria-label="Is Bought"></rs-tile-left-check>');
    element = $compile(element)(scope);
    expect(element.children().length).toBe(1);
  }));

  it('rs-tile-content should have 1 child', inject(function ($compile) {
    var gotoDetailsPage = function (item) {};
    element = angular.element('<rs-tile-content accented-text="acc Content" additional-text="add Content"' + 
                'click-fn="gotoDetailsPage(\'link\')">1st row Content</rs-tile-content>');
    element = $compile(element)(scope);
    expect(element.children().length).toBe(2);
  }));

  it('rs-tile-right-delete should have 1 child', inject(function ($compile) {
    var data = {};
    data.value = true;
    var saveItem = function () {};
    element = angular.element('<rs-tile-right-delete></rs-tile-right-delete>');
    element = $compile(element)(scope);
    expect(element.children().length).toBe(1);
  }));

});
