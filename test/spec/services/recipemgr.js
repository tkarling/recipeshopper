'use strict';

describe('Service: recipeMgr', function () {

  // load the service's module
  beforeEach(module('recipeshopperApp'));

  // instantiate service
  var recipeMgr;
  beforeEach(inject(function (_recipeMgr_) {
    recipeMgr = _recipeMgr_;
  }));

  it('should do something', function () {
    expect(!!recipeMgr).toBe(true);
  });

});
