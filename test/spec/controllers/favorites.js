'use strict';

describe('Controller: FavoritesCtrl', function () {

  // load the controller's modules
  beforeEach(function () {
    module('recipeshopperApp');
    module('settingsMod.mock');
    module('storedListMod.mock');
  });

  var BaselistCtrl, FavoritesCtrl;
  var scope, $rootScope;
  var mockUrl, mockStoredListMgrFactory, mockBasicStoredListMgr, mockSettingsMgr;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, _$rootScope_,
                              _settingsMgr_, _StoredListMgrFactory_) {
    $rootScope = _$rootScope_;
    scope = $rootScope.$new();
    mockUrl = 'mockUrl';
    mockSettingsMgr = _settingsMgr_;
    mockStoredListMgrFactory = _StoredListMgrFactory_;
    mockBasicStoredListMgr = mockStoredListMgrFactory.getUsersStoredListMgr();

    BaselistCtrl = $controller('BaselistCtrl', {
      $scope: scope,
      StoredListMgrFactory: mockStoredListMgrFactory,
      settingsMgr: mockSettingsMgr
    });

    FavoritesCtrl = $controller('FavoritesCtrl', {
      $scope: scope,
      FB_SHOPPINGLIST_URL: mockUrl,
      StoredListMgrFactory: mockStoredListMgrFactory,
      settingsMgr: mockSettingsMgr
    });
  })); // beforeEach

  it('a test should pass', function () {
    expect(true).toEqual(true);
  }); // it

  describe('Before current user is set:', function () {

    it('should init FavoritesCtrl specific items to empty, if current user is not set', function () {
      // check impact
      expect(scope.data.fbUrl).toEqual(mockUrl);
      expect(scope.data.fieldName).toEqual('recipeId');
      expect(scope.data.fieldValue).toEqual('FAVORITES');
    }); // it

    it('should handle handleCurrentUserSet w userId', function () {
      mockSettingsMgr.$$setMockedUser('mockUser');
      $rootScope.$broadcast('handleCurrentUserSet');
      scope.$root.$digest();

      // check impact
      expect(scope.data.fbUrl).toEqual(mockUrl);
      expect(scope.data.fieldName).toEqual('recipeId');
      expect(scope.data.fieldValue).toEqual('FAVORITES');
    }); // it

  }); // describe

  describe('After current user is set:', function () {
    var testItems = [
      {product: 'carrots', isonlist: true, isbought: false},
      {product: 'milk', isonlist: true, isbought: false},
      {product: 'bread', isonlist: true, isbought: false}];

    beforeEach(function () {
      mockBasicStoredListMgr.$$setMockedItems(testItems);
      scope.setStoreId('mockUrl', 'isonlist', true);
      mockSettingsMgr.$$setMockedUser('mockUser');
      $rootScope.$broadcast('handleCurrentUserSet');
      scope.$root.$digest();
    }); // beforeEach

    it('should initialize groceries array, when groceries in DB', function () {
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

    it('should delete item', function () {
      // set
      spyOn(mockBasicStoredListMgr, 'deleteItem').and.callThrough();

      // act
      scope.deleteItem(scope.data.myItems[1]);

      // check
      expect(mockBasicStoredListMgr.deleteItem).toHaveBeenCalled();
    });

    it('should toggleItemOnShoppingList', function () {
      // set
      spyOn(mockBasicStoredListMgr, 'saveItem').and.callThrough();

      // act
      scope.toggleItemOnShoppingList(scope.data.myItems[1]);

      // check
      expect(mockBasicStoredListMgr.saveItem).toHaveBeenCalled();
      expect(scope.data.myItems[1].isbought).toEqual(false);
    });

  }); // describe

});
