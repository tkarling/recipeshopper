'use strict';

describe('Service: Authentication', function () {

  // load the service's module
  beforeEach(module('recipeshopperApp'));

  // instantiate service
  var authentication;
  beforeEach(inject(function (_authentication_) {
    authentication = _authentication_;
  }));

  it('should do something', function () {
    expect(!!authentication).toBe(true);
  });

});
