'use strict';

describe('Service: StoredListMgrFactory', function () {

  var mockFirebase, mockUrl;

  // load the service's module
  beforeEach(module('storedListMod'));

  // beforeEach(function () {

  //     mockFirebase = {

  //         getSomething: function () {
  //             return 'mockReturnValue';
  //         }
  //     };

  //     mockUrl = 'mockUrl';

  //     module(function ($provide) {
  //         $provide.value('$firebase', mockFirebase);
  //         $provide.value('FIREBASE_URL', mockUrl);
  //     });

  // });

  // instantiate service
  var StoredListMgrFactory;
  beforeEach(inject(function (_StoredListMgrFactory_) {
    StoredListMgrFactory = _StoredListMgrFactory_;
  }));

  it('should do something', function () {
    expect(!!StoredListMgrFactory).toBe(true);
  });

  it('should first add StoredListMgr, when mgr does not exist yet', function () {
    var StoredListMgrs = StoredListMgrFactory.getStoredListMgrs();
    expect(StoredListMgrs.length).toBe(0);

    var StoredListMgr = StoredListMgrFactory.getStoredListMgr('demourl');

    StoredListMgrs = StoredListMgrFactory.getStoredListMgrs();
    expect(StoredListMgrs.length).toBe(1);
    expect(StoredListMgrs[0].fburl).toBe('demourl');
    expect(StoredListMgrs[0].variableUrl).toBe(undefined);  
  });

  it('should add another StoredListMgr, when mgr does not exist yet', function () {
    var StoredListMgrs = StoredListMgrFactory.getStoredListMgrs();
    expect(StoredListMgrs.length).toBe(0);

    var StoredListMgr = StoredListMgrFactory.getStoredListMgr('demourl', '/123/ingredients/');
    var SecondStoredListMgr = StoredListMgrFactory.getStoredListMgr('demo2url', '/345/ingredients/');

    StoredListMgrs = StoredListMgrFactory.getStoredListMgrs();
    expect(StoredListMgrs.length).toBe(2);
    expect(StoredListMgrs[0].fburl).toBe('demourl');
    expect(StoredListMgrs[0].variableUrl).toBe('/123/ingredients/');  
    expect(StoredListMgrs[1].fburl).toBe('demo2url');
    expect(StoredListMgrs[1].variableUrl).toBe('/345/ingredients/');  
  });

  it('should not add StoredListMgr, when mgr exists already', function () {
    var StoredListMgrs = StoredListMgrFactory.getStoredListMgrs();
    expect(StoredListMgrs.length).toBe(0);

    var StoredListMgr = StoredListMgrFactory.getStoredListMgr('demourl');
    var SecondStoredListMgr = StoredListMgrFactory.getStoredListMgr('demourl');

    StoredListMgrs = StoredListMgrFactory.getStoredListMgrs();
    expect(StoredListMgrs.length).toBe(1);
    expect(StoredListMgrs[0].fburl).toBe('demourl');
    expect(StoredListMgrs[0].variableUrl).toBe(undefined);  
  });

  it('should not add StoredListMgr, and keep its variable url, when mgr with same fixed url & variable url exits', function () {
    var StoredListMgrs = StoredListMgrFactory.getStoredListMgrs();
    expect(StoredListMgrs.length).toBe(0);

    var StoredListMgr = StoredListMgrFactory.getStoredListMgr('demourl', '/123/ingredients/');
    var SecondStoredListMgr = StoredListMgrFactory.getStoredListMgr('demourl', '/123/ingredients/');

    StoredListMgrs = StoredListMgrFactory.getStoredListMgrs();
    expect(StoredListMgrs.length).toBe(1);
    expect(StoredListMgrs[0].fburl).toBe('demourl');
    expect(StoredListMgrs[0].variableUrl).toBe('/123/ingredients/');  
  });

  it('should not add StoredListMgr, but change its variable url, when mgr with same fixed url, but different variable url exists', function () {
    var StoredListMgrs = StoredListMgrFactory.getStoredListMgrs();
    expect(StoredListMgrs.length).toBe(0);

    var StoredListMgr = StoredListMgrFactory.getStoredListMgr('demourl', '/123/ingredients/');
    var SecondStoredListMgr = StoredListMgrFactory.getStoredListMgr('demourl', '/345/ingredients/');

    StoredListMgrs = StoredListMgrFactory.getStoredListMgrs();
    expect(StoredListMgrs.length).toBe(1);
    expect(StoredListMgrs[0].fburl).toBe('demourl');
    expect(StoredListMgrs[0].variableUrl).toBe('/345/ingredients/');  
  });

  it('should add StoredListMgr, if new mgr w existing fixed part has variable part but existing one has it undefined', function () {
    var StoredListMgrs = StoredListMgrFactory.getStoredListMgrs();
    expect(StoredListMgrs.length).toBe(0);

    var StoredListMgr = StoredListMgrFactory.getStoredListMgr('demourl');
    var SecondStoredListMgr = StoredListMgrFactory.getStoredListMgr('demourl', '/345/ingredients/');

    StoredListMgrs = StoredListMgrFactory.getStoredListMgrs();
    expect(StoredListMgrs.length).toBe(2);
    expect(StoredListMgrs[0].fburl).toBe('demourl');
    expect(StoredListMgrs[0].variableUrl).toBe(undefined);  
    expect(StoredListMgrs[1].fburl).toBe('demourl');
    expect(StoredListMgrs[1].variableUrl).toBe('/345/ingredients/');  
  });

  it('should not add StoredListMgr, but change its variable url, when mgr with same fixed url, but different variable url exists', function () {
    var StoredListMgrs = StoredListMgrFactory.getStoredListMgrs();
    expect(StoredListMgrs.length).toBe(0);

    var StoredListMgr = StoredListMgrFactory.getStoredListMgr('demourl');
    var SecondStoredListMgr = StoredListMgrFactory.getStoredListMgr('demourl', '/123/ingredients/');
    var ThirdStoredListMgr = StoredListMgrFactory.getStoredListMgr('demourl', '/345/ingredients/');

    StoredListMgrs = StoredListMgrFactory.getStoredListMgrs();
    expect(StoredListMgrs.length).toBe(2);
    expect(StoredListMgrs[0].fburl).toBe('demourl');
    expect(StoredListMgrs[0].variableUrl).toBe(undefined);  
    expect(StoredListMgrs[1].fburl).toBe('demourl');
    expect(StoredListMgrs[1].variableUrl).toBe('/345/ingredients/');  
  });

});


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
