'use strict';

describe('Service: StoredListMgrFactory', function () {

  var mockSettingsMgr, mockBaseUrl, mockCurrentUser, mockMySettings;

  // load the service's module
  beforeEach(module('storedListMod'));

  beforeEach(function () {
    mockBaseUrl = 'mockBaseUrl';
    mockCurrentUser = 'mockUserId';

    mockSettingsMgr = {
      getCurrentUser: function () {
        // settingsMgrSpy.getCurrentUser();
        return mockCurrentUser;
      },
      getSettings: function () {
          // settingsMgrSpy.getSettings();
          return mockMySettings;
      },
      saveSettings: function () {
          deferred = q.defer();
          // settingsMgrSpy.saveSettings();
          return deferred.promise;
      }
    };

    module(function ($provide) {
          $provide.value('settingsMgr', mockSettingsMgr);
          $provide.value('FIREBASE_URL', mockBaseUrl);
    });
  }); // beforeEach

  // instantiate service
  var StoredListMgrFactory;
  beforeEach(inject(function (_StoredListMgrFactory_) {
    StoredListMgrFactory = _StoredListMgrFactory_;
  }));

  it('should do something', function () {
    expect(!!StoredListMgrFactory).toBe(true);
  });

  describe('getStoredListMgrs tests:', function() {

  it('should add first StoredListMgr, when mgr does not exist yet', function () {
    var StoredListMgrs = StoredListMgrFactory.getStoredListMgrs();
    expect(StoredListMgrs.length).toBe(0);

    var StoredListMgr = StoredListMgrFactory.getStoredListMgr('/demourl');

    StoredListMgrs = StoredListMgrFactory.getStoredListMgrs();
    expect(StoredListMgrs.length).toBe(1);
    expect(StoredListMgrs[0].fbUrl).toBe('mockBaseUrl/mockUserId/demourl');
    expect(StoredListMgrs[0].fieldNameOrVariableUrl).toBe(undefined);  
    expect(StoredListMgrs[0].fieldValue).toBe(undefined);  
  });

  it('should NOT add 2nd StoredListMgr, w same base Url', function () {
    var StoredListMgrs = StoredListMgrFactory.getStoredListMgrs();
    expect(StoredListMgrs.length).toBe(0);

    var StoredListMgr = StoredListMgrFactory.getStoredListMgr('/demourl');
    var StoredListMgr2 = StoredListMgrFactory.getStoredListMgr('/demourl');

    StoredListMgrs = StoredListMgrFactory.getStoredListMgrs();
    expect(StoredListMgrs.length).toBe(1);
    expect(StoredListMgrs[0].fbUrl).toBe('mockBaseUrl/mockUserId/demourl');
    expect(StoredListMgrs[0].fieldNameOrVariableUrl).toBe(undefined);  
    expect(StoredListMgrs[0].fieldValue).toBe(undefined);  
  });

  it('should add 2nd StoredListMgr w different baseUrl', function () {
    var StoredListMgrs = StoredListMgrFactory.getStoredListMgrs();
    expect(StoredListMgrs.length).toBe(0);

    var StoredListMgr = StoredListMgrFactory.getStoredListMgr('/demourl');
    var StoredListMgr2 = StoredListMgrFactory.getStoredListMgr('/demo2url');

    StoredListMgrs = StoredListMgrFactory.getStoredListMgrs();
    expect(StoredListMgrs.length).toBe(2);
    expect(StoredListMgrs[0].fbUrl).toBe('mockBaseUrl/mockUserId/demourl');
    expect(StoredListMgrs[0].fieldNameOrVariableUrl).toBe(undefined);  
    expect(StoredListMgrs[0].fieldValue).toBe(undefined);  
    expect(StoredListMgrs[1].fbUrl).toBe('mockBaseUrl/mockUserId/demo2url');
    expect(StoredListMgrs[1].fieldNameOrVariableUrl).toBe(undefined);  
    expect(StoredListMgrs[1].fieldValue).toBe(undefined);  
  });

  it('should add 2nd StoredListMgr w different variable Url', function () {
    var StoredListMgrs = StoredListMgrFactory.getStoredListMgrs();
    expect(StoredListMgrs.length).toBe(0);

    var StoredListMgr = StoredListMgrFactory.getStoredListMgr('/demourl', 'var1');
    var StoredListMgr2 = StoredListMgrFactory.getStoredListMgr('/demourl', 'var2');

    StoredListMgrs = StoredListMgrFactory.getStoredListMgrs();
    expect(StoredListMgrs.length).toBe(2);
    expect(StoredListMgrs[0].fbUrl).toBe('mockBaseUrl/mockUserId/demourl');
    expect(StoredListMgrs[0].fieldNameOrVariableUrl).toBe('var1');  
    expect(StoredListMgrs[0].fieldValue).toBe(undefined);  
    expect(StoredListMgrs[1].fbUrl).toBe('mockBaseUrl/mockUserId/demourl');
    expect(StoredListMgrs[1].fieldNameOrVariableUrl).toBe('var2');  
    expect(StoredListMgrs[1].fieldValue).toBe(undefined);  
  });

  it('should NOT add 2nd StoredListMgr w same variable Url', function () {
    var StoredListMgrs = StoredListMgrFactory.getStoredListMgrs();
    expect(StoredListMgrs.length).toBe(0);

    var StoredListMgr = StoredListMgrFactory.getStoredListMgr('/demourl', 'var1');
    var StoredListMgr2 = StoredListMgrFactory.getStoredListMgr('/demourl', 'var1');

    StoredListMgrs = StoredListMgrFactory.getStoredListMgrs();
    expect(StoredListMgrs.length).toBe(1);
    expect(StoredListMgrs[0].fbUrl).toBe('mockBaseUrl/mockUserId/demourl');
    expect(StoredListMgrs[0].fieldNameOrVariableUrl).toBe('var1');  
    expect(StoredListMgrs[0].fieldValue).toBe(undefined);  
  });

  it('should add 2nd StoredListMgr w different fieldname & field value', function () {
    var StoredListMgrs = StoredListMgrFactory.getStoredListMgrs();
    expect(StoredListMgrs.length).toBe(0);

    var StoredListMgr = StoredListMgrFactory.getStoredListMgr('/demourl', 'fname', 'fvalue');
    var StoredListMgr2 = StoredListMgrFactory.getStoredListMgr('/demourl', 'fname1', 'fvalue1');

    StoredListMgrs = StoredListMgrFactory.getStoredListMgrs();
    expect(StoredListMgrs.length).toBe(2);
    expect(StoredListMgrs[0].fbUrl).toBe('mockBaseUrl/mockUserId/demourl');
    expect(StoredListMgrs[0].fieldNameOrVariableUrl).toBe('fname');  
    expect(StoredListMgrs[0].fieldValue).toBe('fvalue');  
    expect(StoredListMgrs[1].fbUrl).toBe('mockBaseUrl/mockUserId/demourl');
    expect(StoredListMgrs[1].fieldNameOrVariableUrl).toBe('fname1');  
    expect(StoredListMgrs[1].fieldValue).toBe('fvalue1');  
  });

  it('should NOT add 2nd StoredListMgr w same fieldname & field value', function () {
    var StoredListMgrs = StoredListMgrFactory.getStoredListMgrs();
    expect(StoredListMgrs.length).toBe(0);

    var StoredListMgr = StoredListMgrFactory.getStoredListMgr('/demourl', 'fname', 'fvalue');
    var StoredListMgr2 = StoredListMgrFactory.getStoredListMgr('/demourl', 'fname', 'fvalue');

    StoredListMgrs = StoredListMgrFactory.getStoredListMgrs();
    expect(StoredListMgrs.length).toBe(1);
    expect(StoredListMgrs[0].fbUrl).toBe('mockBaseUrl/mockUserId/demourl');
    expect(StoredListMgrs[0].fieldNameOrVariableUrl).toBe('fname');  
    expect(StoredListMgrs[0].fieldValue).toBe('fvalue');  
  });

  }); // describe

  describe('getSharedStoredListMgr tests:', function() {

    it('should add first StoredListMgr, when mgr does not exist yet', function () {
      var StoredListMgrs = StoredListMgrFactory.getStoredListMgrs();
      expect(StoredListMgrs.length).toBe(0);

      var StoredListMgr = StoredListMgrFactory.getSharedStoredListMgr('/demourl');

      StoredListMgrs = StoredListMgrFactory.getStoredListMgrs();
      expect(StoredListMgrs.length).toBe(1);
      expect(StoredListMgrs[0].fbUrl).toBe('mockBaseUrl/demourl');
      expect(StoredListMgrs[0].fieldNameOrVariableUrl).toBe(undefined);  
      expect(StoredListMgrs[0].fieldValue).toBe(undefined);  
    });

  }); // describe

});


describe('Service: BasicStoredListMgr', function () {

  // load the service's module
  beforeEach(module('storedListMod'));
  var EFUNC = function () {};

  var mockUrl, mockFirebaseRef;
  var q, deferred, $rootScope; 
  var fbSpy = { $loaded: EFUNC, $add: EFUNC, $remove: EFUNC, $save: EFUNC };

  beforeEach(function () {

      mockUrl = 'mockUrl';

      var tmockFirebase = function() {
      };

      tmockFirebase.prototype = Array.prototype;

      tmockFirebase.prototype.$loaded = function() {
        deferred = q.defer();
        fbSpy.$loaded();
        return deferred.promise;
      };

      tmockFirebase.prototype.$add = function(item) {
        deferred = q.defer();
        fbSpy.$add();
        return deferred.promise;
      };

      tmockFirebase.prototype.$remove = function(item) {
        deferred = q.defer();
        fbSpy.$remove();
        return deferred.promise;
      };

      tmockFirebase.prototype.$save = function(item) {
        deferred = q.defer();
        fbSpy.$save();
        return deferred.promise;
      };

      mockFirebaseRef = function(item) {
        // this.orderByChild = function(a) {
        //   return a;
        // };

        // this.orderByChild = function(a) {
        //   deferred = q.defer();
        //   // fbSpy.$save();
        //   return deferred.promise;
        // };

        return new tmockFirebase;
      };

      // mockFirebaseRef.orderByChild = function(a) {
      //   // fbSpy.$save();
      //   return a;
      // };

      // mockFirebaseRef.prototype.orderByChild = function(a) {
      //   deferred = q.defer();
      //   // fbSpy.$save();
      //   return deferred.promise;
      // };

      module(function ($provide) {
          $provide.value('$firebaseArray', mockFirebaseRef);
          $provide.value('FIREBASE_URL', mockUrl);
      });

  });

  beforeEach(inject(function (_$rootScope_, _$q_) {
    q = _$q_;
    $rootScope  = _$rootScope_;
  }));

  describe('mgr w no params and no variable part', function() {
  // e.g. recipe list, album list

    var BasicStoredListMgr;
    beforeEach(inject(function (_BasicStoredListMgr_) {
      BasicStoredListMgr = new _BasicStoredListMgr_('MainUrl');
      var myData = BasicStoredListMgr.$$getData();
      expect(myData.ref).not.toBeNull();
      expect(myData.fbUrl).toEqual('MainUrl');
      expect(myData.fieldNameOrVariableUrl).toEqual(undefined);
      expect(myData.fieldValue).toEqual(undefined);
    }));

    it('should have data per spec after getItems', function () {
      fbSpy.$loaded = jasmine.createSpy('$loaded spy');

      BasicStoredListMgr.getItems().then(function(data) {
        var myItems = data;
      });

      expect(fbSpy.$loaded).toHaveBeenCalled();
      var myData = BasicStoredListMgr.$$getData();
      expect(myData.ref).not.toBeNull();
      expect(myData.fbUrl).toEqual('MainUrl');
      expect(myData.fieldNameOrVariableUrl).toEqual(undefined);
      expect(myData.fieldValue).toEqual(undefined);
    }); // it

    it('should have data per spec after getItemsSync', function () {
      fbSpy.$loaded = jasmine.createSpy('$loaded spy');

      var myItems = BasicStoredListMgr.getItemsSync(true);

      expect(fbSpy.$loaded).toHaveBeenCalled();
      var myData = BasicStoredListMgr.$$getData();
      expect(myData.ref).not.toBeNull();
      expect(myData.fbUrl).toEqual('MainUrl');
      expect(myData.fieldNameOrVariableUrl).toEqual(undefined);
      expect(myData.fieldValue).toEqual(undefined);
    }); // it

  }); // describe

  describe('mgr w no params and variable url', function() {
  // e.g. current album pics

    var BasicStoredListMgr;
    beforeEach(inject(function (_BasicStoredListMgr_) {
      BasicStoredListMgr = new _BasicStoredListMgr_('MainUrl');
      var myData = BasicStoredListMgr.$$getData();
      expect(myData.ref).not.toBeNull();
      expect(myData.fbUrl).toEqual('MainUrl');
      expect(myData.fieldNameOrVariableUrl).toEqual(undefined);
      expect(myData.fieldValue).toEqual(undefined);
    }));

    it('should have data per spec after getItems', function () {
      fbSpy.$loaded = jasmine.createSpy('$loaded spy');

      BasicStoredListMgr.getItems('variablePart').then(function(data) {
        var myItems = data;
      });

      expect(fbSpy.$loaded).toHaveBeenCalled();
      var myData = BasicStoredListMgr.$$getData();
      expect(myData.ref).not.toBeNull();
      expect(myData.fbUrl).toEqual('MainUrl');
      expect(myData.fieldNameOrVariableUrl).toEqual('variablePart');
      expect(myData.fieldValue).toEqual(undefined);
    }); // it

    it('should have data per spec after getItemsSync', function () {
      fbSpy.$loaded = jasmine.createSpy('$loaded spy');

      var myItems = BasicStoredListMgr.getItemsSync(true, 'variablePart');

      expect(fbSpy.$loaded).toHaveBeenCalled();
      var myData = BasicStoredListMgr.$$getData();
      expect(myData.ref).not.toBeNull();
      expect(myData.fbUrl).toEqual('MainUrl');
      expect(myData.fieldNameOrVariableUrl).toEqual('variablePart');
      expect(myData.fieldValue).toEqual(undefined);
    }); // it

  }); // describe


  // cannot use following as cannot figure ou how to mock orderByChild
  // describe('mgr w field params and no variable part', function() {
  // //e.g. shopping list, favorites

  //   var BasicStoredListMgr;
  //   beforeEach(inject(function (_BasicStoredListMgr_) {
  //     BasicStoredListMgr = new _BasicStoredListMgr_('MainUrl', 'fieldType', 'fieldValue');
  //     var myData = BasicStoredListMgr.$$getData();
  //     expect(myData.ref).not.toBeNull();
  //     expect(myData.fbUrl).toEqual('MainUrl');
  //     expect(myData.fieldNameOrVariableUrl).toEqual('fieldType');
  //     expect(myData.fieldValue).toEqual('fieldValue');
  //   }));

  //   it('should have data per spec after getItems', function () {
  //     fbSpy.$loaded = jasmine.createSpy('$loaded spy');

  //     BasicStoredListMgr.getItems().then(function(data) {
  //       var myItems = data;
  //     });

  //     expect(fbSpy.$loaded).toHaveBeenCalled();
  //     var myData = BasicStoredListMgr.$$getData();
  //     expect(myData.ref).not.toBeNull();
  //     expect(myData.fbUrl).toEqual('MainUrl');
  //     expect(myData.fieldNameOrVariableUrl).toEqual('fieldType');
  //     expect(myData.fieldValue).toEqual('fieldValue');
  //   }); // it

  //   it('should have data per spec after getItemsSync', function () {
  //     fbSpy.$loaded = jasmine.createSpy('$loaded spy');

  //     var myItems = BasicStoredListMgr.getItemsSync(true);

  //     expect(fbSpy.$loaded).toHaveBeenCalled();
  //     var myData = BasicStoredListMgr.$$getData();
  //     expect(myData.ref).not.toBeNull();
  //     expect(myData.fbUrl).toEqual('MainUrl');
  //     expect(myData.fieldNameOrVariableUrl).toEqual('fieldType');
  //     expect(myData.fieldValue).toEqual('fieldValue');
  //   }); // it

  // }); // describe

  // // cannot use following as cannot figure ou how to mock orderByChild
  // describe('mgr w no params and variable fields', function() {
  // //e.g. ingredients on recipe

  //   var BasicStoredListMgr;
  //   beforeEach(inject(function (_BasicStoredListMgr_) {
  //     BasicStoredListMgr = new _BasicStoredListMgr_('MainUrl');
  //     var myData = BasicStoredListMgr.$$getData();
  //     expect(myData.ref).not.toBeNull();
  //     expect(myData.fbUrl).toEqual('MainUrl');
  //     expect(myData.fieldNameOrVariableUrl).toEqual(undefined);
  //     expect(myData.fieldValue).toEqual(undefined);
  //   }));

  //   it('should have data per spec after getItems', function () {
  //     fbSpy.$loaded = jasmine.createSpy('$loaded spy');

  //     BasicStoredListMgr.getItems('fieldType', 'fieldValue').then(function(data) {
  //       var myItems = data;
  //     });

  //     expect(fbSpy.$loaded).toHaveBeenCalled();
  //     var myData = BasicStoredListMgr.$$getData();
  //     expect(myData.ref).not.toBeNull();
  //     expect(myData.fbUrl).toEqual('MainUrl');
  //     expect(myData.fieldNameOrVariableUrl).toEqual('fieldType');
  //     expect(myData.fieldValue).toEqual('fieldValue');
  //   }); // it

  //   it('should have data per spec after getItemsSync', function () {
  //     fbSpy.$loaded = jasmine.createSpy('$loaded spy');

  //     var myItems = BasicStoredListMgr.getItemsSync(true, 'fieldType', 'fieldValue');

  //     expect(fbSpy.$loaded).toHaveBeenCalled();
  //     var myData = BasicStoredListMgr.$$getData();
  //     expect(myData.ref).not.toBeNull();
  //     expect(myData.fbUrl).toEqual('MainUrl');
  //     expect(myData.fieldNameOrVariableUrl).toEqual('fieldType');
  //     expect(myData.fieldValue).toEqual('fieldValue');
  //   }); // it

  // }); // describe



  describe('After service is created', function() {

    // instantiate service
    var BasicStoredListMgr;
    beforeEach(inject(function (_BasicStoredListMgr_) {
      BasicStoredListMgr = new _BasicStoredListMgr_('MainUrl'); //,'fieldtype', 'fieldvalue'
    }));

    it('should do something', function () {
      expect(!!BasicStoredListMgr).toBe(true);
    });

    it('should get items from FB when getting items for 1st time', function () {
        fbSpy.$loaded = jasmine.createSpy('$loaded spy');

        var myItems = [];
        BasicStoredListMgr.getItems().then(function(data) {
          myItems = data;
          // console.log(myItems);
        });

        deferred.resolve([1,2,3]);
        $rootScope.$digest();

        expect(fbSpy.$loaded).toHaveBeenCalled();
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
        fbSpy.$add = jasmine.createSpy('$add spy');
        var item = 1;
        BasicStoredListMgr.getItems();
        BasicStoredListMgr.addItem(item);
        expect(fbSpy.$add).toHaveBeenCalled();
    });

    it('should call $remove, when deleting item', function () {
        fbSpy.$remove = jasmine.createSpy('$remove spy');
        var item = 1;
        BasicStoredListMgr.getItems();
        BasicStoredListMgr.deleteItem(item);
        expect(fbSpy.$remove).toHaveBeenCalled();
    });

    it('should call $save, when saving item', function () {
        fbSpy.$save = jasmine.createSpy('$save spy');
        var item = 1;
        BasicStoredListMgr.getItems();
        BasicStoredListMgr.saveItem(item);
        expect(fbSpy.$save).toHaveBeenCalled();
    });

  }); // describe

});
