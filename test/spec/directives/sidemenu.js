'use strict';

describe('Directive: sideMenu', function () {

  // load the directive's module
  beforeEach(module('mkDirectivesMod'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should init line-through', inject(function ($compile) {
    var item = {};
    item.value = true;
    element = angular.element('<div line-through="item.value"><div><span>Moi</span></div></div>');
    element = $compile(element)(scope);
    expect(element.children().length).toBe(1);
    // console.log('set line-through: ', element.children().eq(0));
    // expect(element.find('span').eq(0).hasClass('rs-line-through')).toBe(true);
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

 
});
