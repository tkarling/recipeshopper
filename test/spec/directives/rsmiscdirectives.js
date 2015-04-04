'use strict';

describe('Misc Directives:', function () {

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


  it('rs-tile-left-check directive can be created', inject(function ($compile) {
    var data = {};
    data.value = true;
    var saveItem = function () {};
    element = angular.element('<rs-tile-left-check ng-model="data.value" save-item-fn="saveItem()" aria-label="Is Bought"></rs-tile-left-check>');
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

  it('rs-tile-right-delete-sub directive can be created', inject(function ($compile) {
    var deleteItem = function () {};
    element = angular.element('<rs-tile-right-delete-sub delete-fn="deleteItem()"></rs-tile-right-delete-sub>');
    element = $compile(element)(scope);
    expect(element.children().length).toBe(1);
  }));

  it('rs-tile-right-delete directive can be created', inject(function ($compile) {
    var deleteItem = function () {};
    element = angular.element('<rs-tile-right-delete delete-fn="deleteItem()" show-actions="true"></rs-tile-right-delete>');
    element = $compile(element)(scope);
    expect(element.children().length).toBe(2);
  }));

});
