'use strict';

describe('Service: recipeMgr', function () {

  // load the service's module
  beforeEach(module('recipeshopperApp'));

  var mockUrl;
  // instantiate service

  beforeEach(function() {
    mockUrl = 'mockUrl';

    module(function($provide) {
      //$provide.value('$firebaseObject', mockFirebaseRef);
      $provide.value('FIREBASE_URL', mockUrl);
      $provide.value('FB_RECIPE_XTRAS_URL', mockUrl);
    });

  });

  var recipeMgr;
  beforeEach(inject(function (_recipeMgr_) {
    recipeMgr = _recipeMgr_;
  }));

  it('should do something', function () {
    expect(!!recipeMgr).toBe(true);
  });

});
