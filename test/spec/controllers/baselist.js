'use strict';

describe('Controller: BaselistCtrl', function () {

  // load the controller's module
  beforeEach(function () {
    module('recipeshopperApp');
    module('settingsMod.mock');
    module('storedListMod.mock');
  });

  var BaselistCtrl;
  var scope, $rootScope;
  var mockUrl, mockStoredListMgrFactory, mockBasicStoredListMgr, mockSettingsMgr;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $compile, _$rootScope_,
                              _settingsMgrMock_, _StoredListMgrFactoryMock_) {
    $rootScope = _$rootScope_;
    scope = $rootScope.$new();
    mockUrl = 'mockUrl';
    mockSettingsMgr = _settingsMgrMock_;
    mockStoredListMgrFactory = _StoredListMgrFactoryMock_;
    mockBasicStoredListMgr = mockStoredListMgrFactory.getUsersStoredListMgr();

    BaselistCtrl = $controller('BaselistCtrl', {
      $scope: scope,
      StoredListMgrFactory: mockStoredListMgrFactory,
      settingsMgr: mockSettingsMgr
    });

  }));

  it('a test should pass', function () {
    expect(true).toEqual(true);
  });

  describe('Before current user is set', function () {

    beforeEach(function () {
      spyOn(mockSettingsMgr, 'getCurrentUser').and.callThrough();
      spyOn(mockSettingsMgr, 'getSettings').and.callThrough();
      spyOn(mockBasicStoredListMgr, 'getItems').and.callThrough();
    }); // beforeEach

    it('should init controller to empty, if current user is not set', function () {
      // check what was called
      expect(mockSettingsMgr.getCurrentUser).not.toHaveBeenCalled();
      expect(mockSettingsMgr.getSettings).not.toHaveBeenCalled();
      expect(mockBasicStoredListMgr.getItems).not.toHaveBeenCalled();

      // check impact
      expect(scope.data.storeMgr).toEqual({});
      expect(scope.data.mySettings).toEqual({});
      expect(scope.data.myItems).toEqual([]);
    }); // it

    it('should handle handleCurrentUserSet w userId', function () {
      mockBasicStoredListMgr.$$setMockedItems([{product: 'carrots'}, {product: 'milk'}, {product: 'bread'}]);
      scope.setStoreId('mockUrl', 'isonlist', true);
      mockSettingsMgr.$$setMockedUser('mockUser');
      mockSettingsMgr.$$setMockedSettings({email: 'testuser@test.com',
        firstname:'TestFirstName',lastname:'TestLastName'});
      $rootScope.$broadcast('handleCurrentUserSet');
      scope.$root.$digest();

      // check what was called
      expect(mockSettingsMgr.getCurrentUser).toHaveBeenCalled();
      expect(mockSettingsMgr.getSettings).toHaveBeenCalled();
      expect(mockBasicStoredListMgr.getItems).toHaveBeenCalled();

      // check impact
      expect(scope.data.storeMgr).not.toEqual({});
      expect(scope.data.mySettings.email).toEqual('testuser@test.com');
      expect(scope.data.myItems.length).toEqual(3);
    }); // it

  }); // describe

  describe('After current user is set', function () {

    var testItems = [{product: 'carrots'}, {product: 'milk'}, {product: 'bread'}];
    beforeEach(function () {
      mockBasicStoredListMgr.$$setMockedItems(testItems);
      scope.setStoreId('mockUrl', 'isonlist', true);
      mockSettingsMgr.$$setMockedUser('mockUser');
      $rootScope.$broadcast('handleCurrentUserSet');
      scope.$root.$digest();
    });

    it('should initialize items array, when items in DB', function () {
      expect(scope.data.myItems.length).toEqual(3);
      expect(scope.data.myItems[0].product).toEqual(testItems[0].product);
      expect(scope.data.myItems[1].product).toEqual(testItems[1].product);
      expect(scope.data.myItems[2].product).toEqual(testItems[2].product);
    });

    it('should delete item', function () {
      // set
      spyOn(mockBasicStoredListMgr, 'deleteItem').and.callThrough();

      // act
      scope.deleteItem(scope.data.myItems[1]);

      // check
      expect(mockBasicStoredListMgr.deleteItem).toHaveBeenCalled();
    });

    it('should save item', function () {
      // set
      spyOn(mockBasicStoredListMgr, 'saveItem').and.callThrough();

      // act
      scope.saveItem(scope.data.myItems[1]);

      // check
      expect(mockBasicStoredListMgr.saveItem).toHaveBeenCalled();
    });

  }); // describe

});
