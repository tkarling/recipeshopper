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

  it('should add first StoredListMgr, when mgr does not exist yet', function () {
    var StoredListMgrs = StoredListMgrFactory.getStoredListMgrs();
    expect(StoredListMgrs.length).toBe(0);

    var StoredListMgr = StoredListMgrFactory.getStoredListMgr('demourl');

    StoredListMgrs = StoredListMgrFactory.getStoredListMgrs();
    expect(StoredListMgrs.length).toBe(1);
    expect(StoredListMgrs[0].fburl).toBe('demourl');
    expect(StoredListMgrs[0].variableUrl).toBe(undefined);  
  });

  it('should add different StoredListMgr', function () {
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

  it('should not add already existing StoredListMgr', function () {
    var StoredListMgrs = StoredListMgrFactory.getStoredListMgrs();
    expect(StoredListMgrs.length).toBe(0);

    var StoredListMgr = StoredListMgrFactory.getStoredListMgr('demourl');
    var SecondStoredListMgr = StoredListMgrFactory.getStoredListMgr('demourl');

    StoredListMgrs = StoredListMgrFactory.getStoredListMgrs();
    expect(StoredListMgrs.length).toBe(1);
    expect(StoredListMgrs[0].fburl).toBe('demourl');
    expect(StoredListMgrs[0].variableUrl).toBe(undefined);  
  });

  it('should not add StoredListMgr, and keep its variable url, when same fixed & variable url', function () {
    var StoredListMgrs = StoredListMgrFactory.getStoredListMgrs();
    expect(StoredListMgrs.length).toBe(0);

    var StoredListMgr = StoredListMgrFactory.getStoredListMgr('demourl', '/123/ingredients/');
    var SecondStoredListMgr = StoredListMgrFactory.getStoredListMgr('demourl', '/123/ingredients/');

    StoredListMgrs = StoredListMgrFactory.getStoredListMgrs();
    expect(StoredListMgrs.length).toBe(1);
    expect(StoredListMgrs[0].fburl).toBe('demourl');
    expect(StoredListMgrs[0].variableUrl).toBe('/123/ingredients/');  
  });

  it('should not add StoredListMgr, but change its variable url, when same fixed & but different variable url', function () {
    var StoredListMgrs = StoredListMgrFactory.getStoredListMgrs();
    expect(StoredListMgrs.length).toBe(0);

    var StoredListMgr = StoredListMgrFactory.getStoredListMgr('demourl', '/123/ingredients/');
    var SecondStoredListMgr = StoredListMgrFactory.getStoredListMgr('demourl', '/345/ingredients/');

    StoredListMgrs = StoredListMgrFactory.getStoredListMgrs();
    expect(StoredListMgrs.length).toBe(1);
    expect(StoredListMgrs[0].fburl).toBe('demourl');
    expect(StoredListMgrs[0].variableUrl).toBe('/345/ingredients/');  
  });

  it('should add StoredListMgr, if 1st v undefined, 2nd v not undefined', function () {
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

  it('should update 2nd variable url, if 1st v undefined and 2nd & 3rd v not undefined', function () {
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

  it('should add StoredListMgr, if 1st v not undefined, 2nd v undefined', function () {
    var StoredListMgrs = StoredListMgrFactory.getStoredListMgrs();
    expect(StoredListMgrs.length).toBe(0);

    var StoredListMgr = StoredListMgrFactory.getStoredListMgr('demourl', '/345/ingredients/');
    var SecondStoredListMgr = StoredListMgrFactory.getStoredListMgr('demourl');

    StoredListMgrs = StoredListMgrFactory.getStoredListMgrs();
    expect(StoredListMgrs.length).toBe(2);
    expect(StoredListMgrs[0].fburl).toBe('demourl');
    expect(StoredListMgrs[0].variableUrl).toBe('/345/ingredients/');  
    expect(StoredListMgrs[1].fburl).toBe('demourl');
    expect(StoredListMgrs[1].variableUrl).toBe(undefined);  
  });

});


describe('Service: BasicStoredListMgr', function () {

  // load the service's module
  beforeEach(module('storedListMod'));

  var mockUrl, mockFirebaseRef, mockFirebaseDataRef, spyTmockFirebase;
  var q, deferred,$rootScope, passPromise; 
  var $loadedSpy, $addSpy, $removeSpy, $saveSpy;

  beforeEach(function () {

      mockUrl = 'mockUrl';

      var tmockFirebase = function() {
      // var tmockFirebase = {
        // this.$list = [1,2,3];
        // return this.$list;
        // return this;
      };

      tmockFirebase.prototype = Array.prototype;

      tmockFirebase.prototype.$loaded = function() {
        deferred = q.defer();
        $loadedSpy();
        // tmockFirebase.$list = [1,2,3];
        // this[0] = 1;
        // this[1] = 2;
        // this[2] = 3;
        // // this = [1,2,3]
        // deferred.resolve(this);
        // console.log('this', this);

        return deferred.promise;
      };

      // tmockFirebase.prototype.$loaded = jasmine.createSpy('$loaded').andCallFake(function() {
      //   var items = [];
   
      //   if (passPromise) {
      //     return q.when(items);
      //   }
      //   else {
      //     return q.reject('something went wrong');
      //   }
      // });

      tmockFirebase.prototype.$add = function(item) {
        deferred = q.defer();
        $addSpy();
        return deferred.promise;
      };

      tmockFirebase.prototype.$remove = function(item) {
        deferred = q.defer();
        $removeSpy();
        return deferred.promise;
      };

      tmockFirebase.prototype.$save = function(item) {
        deferred = q.defer();
        $saveSpy();
        return deferred.promise;
      };

      mockFirebaseDataRef = {
        $asArray: function () {
          // console.log('BasicStoredListMgr: $asArray');
          // return tmockFirebase;
          return new tmockFirebase;
        }
      };

      mockFirebaseRef = function(item) {
        // console.log('BasicStoredListMgr: mockFirebaseRef');
        return mockFirebaseDataRef;
      };


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
      // passPromise = true;
   
      // var items;
     
      // BasicStoredListMgr.getItems().then(function(data) {
      //   items=data;
      // });
      // rootScope.$digest();
     
      // expect(tmockFirebase.$loaded).toHaveBeenCalled();
      // expect(items).toEqual([]);

      $loadedSpy = jasmine.createSpy('$loaded spy');

      var myItems = [];
      BasicStoredListMgr.getItems().then(function(data) {
        myItems = data;
        // console.log(myItems);
      });

      deferred.resolve([1,2,3]);
      $rootScope.$digest();

      expect($loadedSpy).toHaveBeenCalled();
      expect(myItems).toEqual([1,2,3]);
  });

  // it('should get items from local memory, if items are already fetched from store', function () {
  //   // DOES NOT WORK IN THIS FORMAT AS COULD NOT FIGURE OUT HOW TO SET this.data.items  
  //     // spyOn(spyLog, "loki");
  //     $loadedSpy = jasmine.createSpy('$loaded spy');
  //     var myItems = [];
  //     BasicStoredListMgr.getItems().then(function(data) {
  //       myItems = data;
  //       // console.log(myItems);
  //     });

  //     deferred.resolve([1,2,3]);
  //     $rootScope.$digest();

  //     expect($loadedSpy).toHaveBeenCalled();
  //     // expect(spyLog.loki).toHaveBeenCalledWith("$loaded");
  //     expect(myItems).toEqual([1,2,3]);

  //     myItems = [];
  //     BasicStoredListMgr.getItems().then(function(data) {
  //       myItems = data;
  //       // console.log(myItems);
  //     });

  //     $rootScope.$digest();
  //     expect($loadedSpy).not.toHaveBeenCalled();
  //     expect(myItems).toEqual([1,2,3]);
  // });

  it('should call $add, when adding item', function () {
      $addSpy = jasmine.createSpy('$add spy');
      var item = 1;
      BasicStoredListMgr.getItems();
      BasicStoredListMgr.addItem(item);
      expect($addSpy).toHaveBeenCalled();
  });

  it('should call $remove, when deleting item', function () {
      $removeSpy = jasmine.createSpy('$remove spy');
      var item = 1;
      BasicStoredListMgr.getItems();
      BasicStoredListMgr.deleteItem(item);
      expect($removeSpy).toHaveBeenCalled();
  });

  it('should call $save, when saving item', function () {
      $saveSpy = jasmine.createSpy('$save spy');
      var item = 1;
      BasicStoredListMgr.getItems();
      BasicStoredListMgr.saveItem(item);
      expect($saveSpy).toHaveBeenCalled();
  });

});
