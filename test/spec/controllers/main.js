'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's modules
  beforeEach(function () {
    module('recipeshopperApp');
    module('settingsMod.mock');
    module('storedListMod.mock');
  });

  var BaselistCtrl, MainCtrl;
  var scope, $rootScope;
  var mockUrl, mockStoredListMgrFactory, mockBasicStoredListMgr, mockSettingsMgr;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, _$rootScope_,
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

    MainCtrl = $controller('MainCtrl', {
      $scope: scope,
      FB_SHOPPINGLIST_URL: mockUrl,
      StoredListMgrFactory: mockStoredListMgrFactory,
      settingsMgr: mockSettingsMgr
    });
  })); // beforeEach

  it('a test should pass', function () {
    expect(true).toEqual(true);
  }); // it

  describe('Before current user is set', function () {

    it('should init MainCtrl specific items to empty, if current user is not set', function () {
      // check impact
      expect(scope.data.fbUrl).toEqual(mockUrl);
      expect(scope.data.fieldName).toEqual('isonlist');
      expect(scope.data.fieldValue).toEqual(true);
      expect(scope.data.showAll).toEqual(undefined);
    }); // it

    it('should handle handleCurrentUserSet w userId', function () {
      mockSettingsMgr.$$setMockedUser('mockUser');
      $rootScope.$broadcast('handleCurrentUserSet');
      scope.$root.$digest();

      // check impact
      expect(scope.data.fbUrl).toEqual(mockUrl);
      expect(scope.data.fieldName).toEqual('isonlist');
      expect(scope.data.fieldValue).toEqual(true);
      expect(scope.data.showAll).toEqual(undefined);
    }); // it

  }); // describe

  describe('After current user is set', function () {
    var testItems = [{product: 'carrots'}, {product: 'milk'}, {product: 'bread'}];

    beforeEach(function () {
      mockBasicStoredListMgr.$$setMockedItems(testItems);
      scope.setStoreId('mockUrl', 'isonlist', true);
      mockSettingsMgr.$$setMockedUser('mockUser');
      mockSettingsMgr.$$setMockedSettings({email: 'testuser@test.com',
        firstname:'TestFirstName',lastname:'TestLastName'});
      $rootScope.$broadcast('handleCurrentUserSet');
      scope.$root.$digest();
    }); // beforeEach

    it('should initialize items array, when items in DB', function () {
      // console.log('scope.data', scope.data);
      expect(scope.data.myItems.length).toEqual(3);
      expect(scope.data.myItems[0].product).toEqual(testItems[0].product);
      expect(scope.data.myItems[1].product).toEqual(testItems[1].product);
      expect(scope.data.myItems[2].product).toEqual(testItems[2].product);
    });

    it('should add item', function () {
      // set
      spyOn(mockBasicStoredListMgr, 'addItem').and.callThrough();

      // act
      scope.addProduct('carrots', 'veggies', 1);

      // check
      expect(mockBasicStoredListMgr.addItem).toHaveBeenCalled();
    });

    it('should remove item', function () {
      // set
      spyOn(mockBasicStoredListMgr, 'saveItem').and.callThrough();

      // act
      scope.removeItem(scope.data.myItems[1]);

      // check
      expect(mockBasicStoredListMgr.saveItem).toHaveBeenCalled();
    });

    it('should save item', function () {
      // set
      spyOn(mockBasicStoredListMgr, 'saveItem').and.callThrough();

      // act
      scope.saveItem(scope.data.myItems[1]);

      // check
      expect(mockBasicStoredListMgr.saveItem).toHaveBeenCalled();
    });

    it('should toggle showAll between false/undefined, when mySettings.doNotShowBoughtItems (check) toggles between true/ false', function () {
      expect(scope.data.mySettings.doNotShowBoughtItems).toBe(undefined);
      expect(scope.data.showAll).toBe(undefined);

      scope.data.mySettings.doNotShowBoughtItems = true;
      scope.updateShowAll();

      expect(scope.data.mySettings.doNotShowBoughtItems).toBe(true);
      expect(scope.data.showAll).toBe(false);

      scope.data.mySettings.doNotShowBoughtItems = false;
      scope.updateShowAll();

      expect(scope.data.mySettings.doNotShowBoughtItems).toBe(false);
      expect(scope.data.showAll).toBe(undefined);
    });

  }); // describe

});




