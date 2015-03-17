'use strict';

describe('Directive: sideMenu', function () {

   // load the templates
  beforeEach(module('views/sidemenu.html'));

  // load the directive's module
  beforeEach(module('recipeshopperApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('mk-side-menu-item should have 1 child', inject(function ($compile) {
    var userLoggedIn = function() {
      return true;
    };
    var clickAction = function() {};
    element = angular.element('<mk-side-menu-item user-logged-in-fn="userLoggedIn()"' + 
      'click-action-fn="clickAction()" menu-item-text="Shopping List"' +
      'icon-name="ic_shopping_cart"></mk-side-menu-item>');
    element = $compile(element)(scope);
    expect(element.children().length).toBe(1);
  }));

  it('mk-side-menu should have 1 child', inject(function ($compile) {
    element = angular.element('<mk-side-menu menu-title="Recipe Shopper"></mk-side-menu>');
    element = $compile(element)(scope);
    expect(element.children().length).toBe(1);
  }));

  // //could not figure out how to test directive which uses templateUrl. 
  // it('rs-side-menu should have 1 children', inject(function ($compile) {
  //   element = angular.element('<rs-side-menu></rs-side-menu>');
  //   element = $compile(element)(scope);
  //   expect(element.children().length).toBe(1);
  // }));
  
});
