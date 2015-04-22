'use strict';

describe('Service: StoredListMgrFactory', function () {

  var mockSettingsMgr, mockBaseUrl, mockCurrentUser, mockBaseUrlwUser, mockMySettings;

  // load the service's module
  beforeEach(function () {
    module('storedListMod');
    module('settingsMod.mock');
    module('firebase.mock');
  });

  beforeEach(function () {
    mockBaseUrl = 'https://recipeshopper.firebaseio.com';
    mockCurrentUser = 'mockUserId';
    mockBaseUrlwUser = mockBaseUrl + '/' + mockCurrentUser;

    module(function ($provide) {
      $provide.value('FIREBASE_URL', mockBaseUrl);
    });
  }); // beforeEach

  // instantiate service
  var StoredListMgrFactory;
  beforeEach(inject(function (_StoredListMgrFactory_, _settingsMgr_) {
    StoredListMgrFactory = _StoredListMgrFactory_;
    mockSettingsMgr = _settingsMgr_;
    mockSettingsMgr.$$setMockedUser(mockCurrentUser);
  }));

  it('should do something', function () {
    expect(!!StoredListMgrFactory).toBe(true);
  });

  describe('$$getStoredListMgrs tests:', function () {

    it('should add first StoredListMgr, when mgr does not exist yet', function () {
      var StoredListMgrs = StoredListMgrFactory.$$getStoredListMgrs();
      expect(StoredListMgrs.length).toBe(0);

      var StoredListMgr = StoredListMgrFactory.getUsersStoredListMgr('/demourl');

      StoredListMgrs = StoredListMgrFactory.$$getStoredListMgrs();
      expect(StoredListMgrs.length).toBe(1);
      expect(StoredListMgrs[0].fbUrl).toBe(mockBaseUrlwUser + '/demourl');
      expect(StoredListMgrs[0].fieldNameOrVariableUrl).toBe(undefined);
      expect(StoredListMgrs[0].fieldValue).toBe(undefined);
    });

    it('should NOT add 2nd StoredListMgr, w same base Url', function () {
      var StoredListMgrs = StoredListMgrFactory.$$getStoredListMgrs();
      expect(StoredListMgrs.length).toBe(0);

      var StoredListMgr = StoredListMgrFactory.getUsersStoredListMgr('/demourl');
      var StoredListMgr2 = StoredListMgrFactory.getUsersStoredListMgr('/demourl');

      StoredListMgrs = StoredListMgrFactory.$$getStoredListMgrs();
      expect(StoredListMgrs.length).toBe(1);
      expect(StoredListMgrs[0].fbUrl).toBe(mockBaseUrlwUser + '/demourl');
      expect(StoredListMgrs[0].fieldNameOrVariableUrl).toBe(undefined);
      expect(StoredListMgrs[0].fieldValue).toBe(undefined);
    });

    it('should add 2nd StoredListMgr w different baseUrl', function () {
      var StoredListMgrs = StoredListMgrFactory.$$getStoredListMgrs();
      expect(StoredListMgrs.length).toBe(0);

      var StoredListMgr = StoredListMgrFactory.getUsersStoredListMgr('/demourl');
      var StoredListMgr2 = StoredListMgrFactory.getUsersStoredListMgr('/demo2url');

      StoredListMgrs = StoredListMgrFactory.$$getStoredListMgrs();
      expect(StoredListMgrs.length).toBe(2);
      expect(StoredListMgrs[0].fbUrl).toBe(mockBaseUrlwUser + '/demourl');
      expect(StoredListMgrs[0].fieldNameOrVariableUrl).toBe(undefined);
      expect(StoredListMgrs[0].fieldValue).toBe(undefined);
      expect(StoredListMgrs[1].fbUrl).toBe(mockBaseUrlwUser + '/demo2url');
      expect(StoredListMgrs[1].fieldNameOrVariableUrl).toBe(undefined);
      expect(StoredListMgrs[1].fieldValue).toBe(undefined);
    });

    it('should add 2nd StoredListMgr w different variable Url', function () {
      var StoredListMgrs = StoredListMgrFactory.$$getStoredListMgrs();
      expect(StoredListMgrs.length).toBe(0);

      var StoredListMgr = StoredListMgrFactory.getUsersStoredListMgr('/demourl', 'var1');
      var StoredListMgr2 = StoredListMgrFactory.getUsersStoredListMgr('/demourl', 'var2');

      StoredListMgrs = StoredListMgrFactory.$$getStoredListMgrs();
      expect(StoredListMgrs.length).toBe(2);
      expect(StoredListMgrs[0].fbUrl).toBe(mockBaseUrlwUser + '/demourl');
      expect(StoredListMgrs[0].fieldNameOrVariableUrl).toBe('var1');
      expect(StoredListMgrs[0].fieldValue).toBe(undefined);
      expect(StoredListMgrs[1].fbUrl).toBe(mockBaseUrlwUser + '/demourl');
      expect(StoredListMgrs[1].fieldNameOrVariableUrl).toBe('var2');
      expect(StoredListMgrs[1].fieldValue).toBe(undefined);
    });

    it('should NOT add 2nd StoredListMgr w same variable Url', function () {
      var StoredListMgrs = StoredListMgrFactory.$$getStoredListMgrs();
      expect(StoredListMgrs.length).toBe(0);

      var StoredListMgr = StoredListMgrFactory.getUsersStoredListMgr('/demourl', 'var1');
      var StoredListMgr2 = StoredListMgrFactory.getUsersStoredListMgr('/demourl', 'var1');

      StoredListMgrs = StoredListMgrFactory.$$getStoredListMgrs();
      expect(StoredListMgrs.length).toBe(1);
      expect(StoredListMgrs[0].fbUrl).toBe(mockBaseUrlwUser + '/demourl');
      expect(StoredListMgrs[0].fieldNameOrVariableUrl).toBe('var1');
      expect(StoredListMgrs[0].fieldValue).toBe(undefined);
    });

    it('should add 2nd StoredListMgr w different fieldname & field value', function () {
      var StoredListMgrs = StoredListMgrFactory.$$getStoredListMgrs();
      expect(StoredListMgrs.length).toBe(0);

      var StoredListMgr = StoredListMgrFactory.getUsersStoredListMgr('/demourl', 'fname', 'fvalue');
      var StoredListMgr2 = StoredListMgrFactory.getUsersStoredListMgr('/demourl', 'fname1', 'fvalue1');

      StoredListMgrs = StoredListMgrFactory.$$getStoredListMgrs();
      expect(StoredListMgrs.length).toBe(2);
      expect(StoredListMgrs[0].fbUrl).toBe(mockBaseUrlwUser + '/demourl');
      expect(StoredListMgrs[0].fieldNameOrVariableUrl).toBe('fname');
      expect(StoredListMgrs[0].fieldValue).toBe('fvalue');
      expect(StoredListMgrs[1].fbUrl).toBe(mockBaseUrlwUser + '/demourl');
      expect(StoredListMgrs[1].fieldNameOrVariableUrl).toBe('fname1');
      expect(StoredListMgrs[1].fieldValue).toBe('fvalue1');
    });

    it('should NOT add 2nd StoredListMgr w same fieldname & field value', function () {
      var StoredListMgrs = StoredListMgrFactory.$$getStoredListMgrs();
      expect(StoredListMgrs.length).toBe(0);

      var StoredListMgr = StoredListMgrFactory.getUsersStoredListMgr('/demourl', 'fname', 'fvalue');
      var StoredListMgr2 = StoredListMgrFactory.getUsersStoredListMgr('/demourl', 'fname', 'fvalue');

      StoredListMgrs = StoredListMgrFactory.$$getStoredListMgrs();
      expect(StoredListMgrs.length).toBe(1);
      expect(StoredListMgrs[0].fbUrl).toBe(mockBaseUrlwUser + '/demourl');
      expect(StoredListMgrs[0].fieldNameOrVariableUrl).toBe('fname');
      expect(StoredListMgrs[0].fieldValue).toBe('fvalue');
    });

  }); // describe

  describe('getSharedStoredListMgr tests:', function () {

    it('should add first StoredListMgr, when mgr does not exist yet', function () {
      var StoredListMgrs = StoredListMgrFactory.$$getStoredListMgrs();
      expect(StoredListMgrs.length).toBe(0);

      var StoredListMgr = StoredListMgrFactory.getSharedStoredListMgr('/demourl');

      StoredListMgrs = StoredListMgrFactory.$$getStoredListMgrs();
      expect(StoredListMgrs.length).toBe(1);
      expect(StoredListMgrs[0].fbUrl).toBe(mockBaseUrl + '/demourl');
      expect(StoredListMgrs[0].fieldNameOrVariableUrl).toBe(undefined);
      expect(StoredListMgrs[0].fieldValue).toBe(undefined);
    }); // it

  }); // describe

  describe('prepare for logout tests:', function () {
    beforeEach( function() {

    }); // beforeEach

    it('should delete all mgrs', function () {
      // set
      var StoredListMgr = StoredListMgrFactory.getUsersStoredListMgr('/demourl', 'fname', 'fvalue');
      var StoredListMgr2 = StoredListMgrFactory.getUsersStoredListMgr('/demourl', 'fname1', 'fvalue1');
      var StoredListMgrs = StoredListMgrFactory.$$getStoredListMgrs();
      expect(StoredListMgrs.length).toBe(2);

      // act
      StoredListMgrFactory.prepareForLogout();

      // test
      StoredListMgrs = StoredListMgrFactory.$$getStoredListMgrs();
      expect(StoredListMgrs.length).toBe(0);
    }); // it

  }); // describe

});


describe('Service: BasicStoredListMgr', function () {

  // load the service's module
  beforeEach(function () {
    module('storedListMod');
    module('firebase.mock');
  });

  var mockBaseUrl;
  var $rootScope;

  beforeEach(function () {
    mockBaseUrl = 'https://recipeshopper.firebaseio.com';

    module(function ($provide) {
      $provide.value('FIREBASE_URL', mockBaseUrl);
    });
  });

  beforeEach(inject(function (_$rootScope_) {
    $rootScope = _$rootScope_;
  }));

  describe('mgr w no params and no variable part', function () {
    // e.g. recipe list, album list

    var BasicStoredListMgr, myData;
    beforeEach(inject(function (_BasicStoredListMgr_) {
      // set
      BasicStoredListMgr = new _BasicStoredListMgr_(mockBaseUrl + '/MainUrl');
      myData = BasicStoredListMgr.$$getData();
      expect(myData.fbUrl).toEqual(mockBaseUrl + '/MainUrl');
      expect(myData.fieldNameOrVariableUrl).toEqual(undefined);
      expect(myData.fieldValue).toEqual(undefined);
      expect(myData.ref).not.toBeNull();
      expect(myData.items).not.toBeDefined;
    })); // beforeEach

    afterEach(function () {
      // test
      expect(myData.fbUrl).toEqual(mockBaseUrl + '/MainUrl');
      expect(myData.fieldNameOrVariableUrl).toEqual(undefined);
      expect(myData.fieldValue).toEqual(undefined);
      expect(myData.items).toBeDefined;
      expect(myData.items.$loaded()).toBeDefined;
    }); //afterEach

    it('should get Items Async', function () {
      // act
      BasicStoredListMgr.getItems().then(function (data) {
        var myItems = data;
      });
    }); // it

    it('should get Items Sync', function () {
      // act
      BasicStoredListMgr.getItemsSync(true);
    }); // it

  }); // describe

  describe('mgr w no params and variable url', function () {
    // e.g. current album pics

    var BasicStoredListMgr, myData;
    beforeEach(inject(function (_BasicStoredListMgr_) {
      // set
      BasicStoredListMgr = new _BasicStoredListMgr_(mockBaseUrl + '/MainUrl');
      myData = BasicStoredListMgr.$$getData();
      expect(myData.fbUrl).toEqual(mockBaseUrl + '/MainUrl');
      expect(myData.fieldNameOrVariableUrl).toEqual(undefined);
      expect(myData.fieldValue).toEqual(undefined);
      expect(myData.ref).not.toBeNull();
      expect(myData.items).not.toBeDefined;
    }));

    afterEach(function () {
      // test
      expect(myData.fbUrl).toEqual(mockBaseUrl + '/MainUrl');
      expect(myData.fieldNameOrVariableUrl).toEqual('variablePart');
      expect(myData.fieldValue).toEqual(undefined);
      expect(myData.items).toBeDefined;
      expect(myData.items.$loaded()).toBeDefined;
    }); //afterEach

    it('should get Items Async', function () {
      // act
      BasicStoredListMgr.getItems('variablePart').then(function (data) {
        var myItems = data;
      });
    }); // it

    it('should get Items Sync', function () {
      // act
      BasicStoredListMgr.getItemsSync(true, 'variablePart');
    }); // it

  }); // describe

  describe('mgr w no params and variable field names', function () {
    // e.g. recipe ingredients

    var BasicStoredListMgr, myData;
    beforeEach(inject(function (_BasicStoredListMgr_) {
      // set
      BasicStoredListMgr = new _BasicStoredListMgr_(mockBaseUrl + '/MainUrl');
      myData = BasicStoredListMgr.$$getData();
      expect(myData.fbUrl).toEqual(mockBaseUrl + '/MainUrl');
      expect(myData.fieldNameOrVariableUrl).toEqual(undefined);
      expect(myData.fieldValue).toEqual(undefined);
      expect(myData.ref).not.toBeNull();
      expect(myData.items).not.toBeDefined;
    }));

    afterEach(function () {
      // test
      expect(myData.fbUrl).toEqual(mockBaseUrl + '/MainUrl');
      expect(myData.fieldNameOrVariableUrl).toEqual('fieldType');
      expect(myData.fieldValue).toEqual('fieldValue');
      expect(myData.items).toBeDefined;
      expect(myData.items.$loaded()).toBeDefined;
    }); //afterEach

    it('should get Items Async', function () {
      // act
      BasicStoredListMgr.getItems('fieldType', 'fieldValue').then(function (data) {
        var myItems = data;
      });
    }); // it

    it('should get Items Sync', function () {
      // act
      BasicStoredListMgr.getItemsSync(true, 'fieldType', 'fieldValue');
    }); // it

  }); // describe

  describe('mgrw field params and no variable part', function () {
    // e.g. recipe ingredients

    var BasicStoredListMgr, myData;
    beforeEach(inject(function (_BasicStoredListMgr_) {
      // set
      BasicStoredListMgr = new _BasicStoredListMgr_(mockBaseUrl + '/MainUrl', 'fieldType', 'fieldValue');
      myData = BasicStoredListMgr.$$getData();
      expect(myData.fbUrl).toEqual(mockBaseUrl + '/MainUrl');
      expect(myData.fieldNameOrVariableUrl).toEqual('fieldType');
      expect(myData.fieldValue).toEqual('fieldValue');
      expect(myData.ref).not.toBeNull();
      expect(myData.items).not.toBeDefined;
    }));

    afterEach(function () {
      // test
      expect(myData.fbUrl).toEqual(mockBaseUrl + '/MainUrl');
      expect(myData.fieldNameOrVariableUrl).toEqual('fieldType');
      expect(myData.fieldValue).toEqual('fieldValue');
      expect(myData.items).toBeDefined;
      expect(myData.items.$loaded()).toBeDefined;
    }); //afterEach

    it('should get Items Async', function () {
      // act
      BasicStoredListMgr.getItems().then(function (data) {
        var myItems = data;
      });
    }); // it

    it('should get Items Sync', function () {
      // act
      BasicStoredListMgr.getItemsSync(true);
    }); // it

  }); // describe

  describe('After service is created & items are got', function () {

    // instantiate service
    var BasicStoredListMgr, myData;
    beforeEach(inject(function (_BasicStoredListMgr_) {
      BasicStoredListMgr = new _BasicStoredListMgr_(mockBaseUrl + '/MainUrl'); //,'fieldtype', 'fieldvalue'
      BasicStoredListMgr.getItems().then(function (data) {
        var myItems = data;
      });
      myData = BasicStoredListMgr.$$getData();
      expect(myData.fbUrl).toEqual(mockBaseUrl + '/MainUrl');
      expect(myData.fieldNameOrVariableUrl).toEqual(undefined);
      expect(myData.fieldValue).toEqual(undefined);
      expect(myData.items).toBeDefined;
      expect(myData.items.$loaded()).toBeDefined;
    }));

    it('should do something', function () {
      expect(!!BasicStoredListMgr).toBe(true);
    });

    //it('should get items from local memory, if items are already fetched from store', function () {
    //  // DOES NOT WORK IN THIS FORMAT AS COULD NOT FIGURE OUT HOW TO SET this.data.items
    //  // to an array w items
    //  // This is also why cannot test noOfItems, getItem, etc.
    //  spyOn(myData.items, '$loaded').and.callThrough();
    //  BasicStoredListMgr.getItems().then(function(data) {
    //    // set data
    //  });
    //  //expect(myData.items.$loaded).not.toHaveBeenCalled();
    //});

    it('should add item', function () {
      spyOn(myData.items, '$add').and.callThrough();
      var item = 1;
      BasicStoredListMgr.addItem(item);
      expect(myData.items.$add).toHaveBeenCalled();
    });

    it('should delete item', function () {
      spyOn(myData.items, '$remove').and.callThrough();
      var item = 1;
      BasicStoredListMgr.deleteItem(item);
      expect(myData.items.$remove).toHaveBeenCalled();
    });

    it('should save item', function () {
      spyOn(myData.items, '$save').and.callThrough();
      var item = 1;
      BasicStoredListMgr.saveItem(item);
      expect(myData.items.$save).toHaveBeenCalled();
    });

  }); // describe

});
