'use strict';

describe('Directive: rsRecipeDetails', function () {

  // load the templates
  beforeEach(module('views/recipeinfo.html'));
  beforeEach(module('views/recipeingredients.html'));

  // load the directive's module
  beforeEach(module('recipeshopperApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  ////could not figure out how to test directive which uses templateUrl.
  //it('rs-product-content directive can be created', inject(function ($compile) {
  //  element = angular.element('<rs-recipe-details></rs-recipe-details>');
  //  element = $compile(element)(scope);
  //  expect(element.children().length).toBe(1);
  //}));

});
