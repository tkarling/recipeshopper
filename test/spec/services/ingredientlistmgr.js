'use strict';

describe('Service: ingredientListMgr', function () {

  // load the service's module
  beforeEach(module('ingredientListMod'));

  // instantiate service
  var ingredientListMgr;
  beforeEach(inject(function (_ingredientListMgr_) {
    ingredientListMgr = _ingredientListMgr_;
  }));

  it('should do something', function () {
    expect(!!ingredientListMgr).toBe(true);
  });

});
