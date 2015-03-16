'use strict';

describe('Directive: sideMenu', function () {

  // load the directive's module
  beforeEach(module('recipeshopperApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('rs-side-menu-item should have 1 child', inject(function ($compile) {
    var userLoggedIn = function() {
      return true;
    };
    var clickAction = function() {};
    element = angular.element('<rs-side-menu-item user-logged-in-fn="userLoggedIn()"' + 
      'click-action-fn="clickAction()" menu-item-text="Shopping List"' +
      'icon-name="ic_shopping_cart"></rs-side-menu-item>');
    element = $compile(element)(scope);
    expect(element.children().length).toBe(1);
  }));

  // cold not figure out how to test directive which uses templateUrl. The path may be messed up
  // it('rs-side-menu should have 2 children', inject(function ($compile) {
  //   element = angular.element('<rs-side-menu></rs-side-menu>');
  //   element = $compile(element)(scope);
  //   expect(element.children().length).toBe(2);
  // }));
});
