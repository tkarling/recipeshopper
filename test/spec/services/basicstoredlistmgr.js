'use strict';



describe('Service: BasicStoredListMgr', function () {

  var mockFirebase, mockUrl;

  // load the service's module
  beforeEach(module('storedListMod'));

  beforeEach(function () {

      mockFirebase = {

          getSomething: function () {
              return 'mockReturnValue';
          }
      };

      mockUrl = 'mockUrl';

      module(function ($provide) {
          $provide.value('$firebase', mockFirebase);
          $provide.value('FIREBASE_URL', mockUrl);
      });

  });

  // instantiate service
  var BasicStoredListMgr;
  beforeEach(inject(function (_BasicStoredListMgr_) {
    BasicStoredListMgr = _BasicStoredListMgr_;
  }));

  it('should do something', function () {
    expect(!!BasicStoredListMgr).toBe(true);
  });

  // it('should set url & refs when created', function () {
  //   // TEST NOT IMPLEMENTED 
  //   expect(!!BasicStoredListMgr).toBe(true);
  // });

  // it('should call fb methods to get items as an array, if there are NO existing items', function () {
  //   // TEST NOT IMPLEMENTED 
  //   expect(!!BasicStoredListMgr).toBe(true);
  // });

  // it('should NOT call fb methods to get items as an array, if there are existing items', function () {
  //   // TEST NOT IMPLEMENTED 
  //   expect(!!BasicStoredListMgr).toBe(true);
  // });

  // it('should call fb method to add an item', function () {
  //   // TEST NOT IMPLEMENTED 
  //   expect(!!BasicStoredListMgr).toBe(true);
  // });

  // it('should call fb method to remove an item', function () {
  //   // TEST NOT IMPLEMENTED 
  //   expect(!!BasicStoredListMgr).toBe(true);
  // });

});
