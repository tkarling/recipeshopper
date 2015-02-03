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

    var mockUrl, mockFirebaseRef, mockFirebaseDataRef, spyTmockFirebase, spyLog;
    var q, deferred,$rootScope;

  // load the service's module
  beforeEach(module('storedListMod'));

  beforeEach(function () {

      spyLog = {
        loki: function(text) { 
          console.log(text);
        }
      };

      mockUrl = 'mockUrl';

      var tmockFirebase = function () {
      };

      tmockFirebase.prototype.$loaded = function() {
        deferred = q.defer();
        spyLog.loki('$loaded');
        // mockFirebaseRef.items = [1,2,3];
        return deferred.promise;
      };

      tmockFirebase.prototype.$add = function(item) {
        deferred = q.defer();
        spyLog.loki('$add');
        return deferred.promise;
      };

      tmockFirebase.prototype.$remove = function(item) {
        deferred = q.defer();
        spyLog.loki('$remove');
        return deferred.promise;
      };

      tmockFirebase.prototype.$save = function(item) {
        deferred = q.defer();
        spyLog.loki('$save');
        return deferred.promise;
      };

      mockFirebaseDataRef = {
        $asArray: function () {
          spyLog.loki('$asArray');
          spyTmockFirebase = new tmockFirebase;
          return spyTmockFirebase;
        }
      };

      mockFirebaseRef = function(item) {
        spyLog.loki('mockFirebaseRef');
        return mockFirebaseDataRef;
      };

  
    module(function($provide) {
    });


      module(function ($provide) {
          $provide.value('$firebase', mockFirebaseRef);
          $provide.value('FIREBASE_URL', mockUrl);
          // $provide.factory('tmockFirebase', function($q) {
          //     console.log('moi');
          //     var $loaded = jasmine.createSpy('$loaded').andCallFake(function() {
          //       var items = [];
           
          //       if (passPromise) {
          //         return $q.when(items);
          //       }
          //       else {
          //         return $q.reject('something went wrong');
          //       }
          //     });

          //     // var factory = {
          //     //   // console.log('created tmockFirebase');
          //     // }; 
 
          //     // factory.$loaded = function() {
          //     //   console.log('$loaded');
          //     // }
 
          //     // return factory;
  
          //     return {
          //       $loaded: function() {
          //         return $loaded;
          //       }
          //     };
          //   });

      });

  });

  // instantiate service
  var BasicStoredListMgr;
  beforeEach(inject(function (_$rootScope_, _BasicStoredListMgr_, _$q_) {
    BasicStoredListMgr = new _BasicStoredListMgr_('MainUrl','VarUrl');
    q = _$q_;
    $rootScope  = _$rootScope_;
  }));

  it('should do something', function () {
    expect(!!BasicStoredListMgr).toBe(true);
  });

  it('should call $loaded, when getting items for first time', function () {
      spyOn(spyLog, "loki");
      var myItems = [];
      BasicStoredListMgr.getItems().then(function(data) {
        myItems = data;
      });
      deferred.resolve([{$id:'moi'}]);
      $rootScope.$digest();
      // expect(myItems).toEqual([1,2,3]);
      expect(spyLog.loki).toHaveBeenCalledWith("$loaded");
  });

  // it('should get items from local memory, if items are already fetched from store', function () {
  //   // TEST NOT IMPLEMENTED 
  //   expect(!!BasicStoredListMgr).toBe(true);
  // });

  it('should call $add, when adding item', function () {
      spyOn(spyLog, "loki");
      var item = 1;
      BasicStoredListMgr.getItems();
      BasicStoredListMgr.addItem(item);
      expect(spyLog.loki).toHaveBeenCalledWith("$add");
  });

  it('should call $remove, when deleting item', function () {
      spyOn(spyLog, "loki");
      var item = 1;
      BasicStoredListMgr.getItems();
      BasicStoredListMgr.deleteItem(item);
      expect(spyLog.loki).toHaveBeenCalledWith("$remove");
  });

  it('should call $save, when saving item', function () {
      spyOn(spyLog, "loki");
      var item = 1;
      BasicStoredListMgr.getItems();
      BasicStoredListMgr.saveItem(item);
      expect(spyLog.loki).toHaveBeenCalledWith("$save");
  });

});
