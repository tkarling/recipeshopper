'use strict';

describe('Service: productsFromString', function () {

  // load the service's module
  beforeEach(module('productsFromStringMod'));

  // instantiate service
  var productsFromString;
  beforeEach(inject(function (_productsFromString_) {
    productsFromString = _productsFromString_;
  }));

  it('should do something', function () {
    expect(!!productsFromString).toBe(true);
  });

});
