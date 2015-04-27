'use strict';

describe('Misc Directives:', function () {

  // load the templates
  beforeEach(module('views/apptitlebar.html'));
  beforeEach(module('views/sidemenu.html'));
  beforeEach(module('views/baselistitem.html'));

  // load the directive's module
  beforeEach(module('recipeshopperApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

   ////could not figure out how to test directive which uses templateUrl.
   //it('rs-side-menu directive can be created', inject(function ($compile) {
   //  element = angular.element('<rs-side-menu></rs-side-menu>');
   //  element = $compile(element)(scope);
   //  expect(element.children().length).toBe(1);
   //}));

   //// could not figure out how to test directive which uses templateUrl.
   //it('rs-app-title-bar directive can be created', inject(function ($compile) {
   //  element = angular.element('<rs-app-title-bar></rs-app-title-bar>');
   //  element = $compile(element)(scope);
   //  console.log('element', element);
   //  console.log('element.children()', element.children());
   //  expect(element.children().children().length).toBe(1);
   //}));

  describe('Most Directives:', function () {

  it('rs-icon directive can be created', inject(function ($compile) {
    element = angular.element('<rs-icon icon-name="ic_delete"></rs-icon>');
    element = $compile(element)(scope);
    expect(element.children().length).toBe(1);
  }));

  it('rs-search-bar directive can be created', inject(function ($compile) {
    element = angular.element('<rs-search-bar placeholder-text="Search for recipes"></rs-search-bar>');
    element = $compile(element)(scope);
    expect(element.children().length).toBe(1);
  }));

  it('rs-search-bar directive can be created when checkbox is shown', inject(function ($compile) {
    element = angular.element('<rs-search-bar show-checkbox="true" placeholder-text="Search for products"></rs-search-bar>');
    element = $compile(element)(scope);
    expect(element.children().length).toBe(1);
  }));

  it('rs-one-row-add-item-form directive can be created', inject(function ($compile) {
    element = angular.element('<rs-one-row-add-item-form></rs-one-row-add-item-form>');
    element = $compile(element)(scope);
    expect(element.children().length).toBe(1);
  }));

  it('rs-tile-content directive can be created', inject(function ($compile) {
    var gotoDetailsPage = function (item) {};
    element = angular.element('<rs-tile-content accented-text="acc Content" additional-text="add Content"' +
                'click-fn="gotoDetailsPage(\'link\')">1st row Content</rs-tile-content>');
    element = $compile(element)(scope);
    expect(element.children().length).toBe(2);
  }));

  }); // describe


});
