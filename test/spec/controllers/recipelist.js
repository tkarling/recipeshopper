'use strict';

describe('Controller: RecipelistCtrl', function () {

  // load the controller's modules
  beforeEach(function () {
    module('recipeshopperApp');
    module('settingsMod.mock');
    module('storedListMod.mock');
  });

  var BaselistCtrl, RecipelistCtrl;
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

    RecipelistCtrl = $controller('RecipelistCtrl', {
      $scope: scope,
      FB_RECIPES_URL: mockUrl,
      StoredListMgrFactory: mockStoredListMgrFactory,
      settingsMgr: mockSettingsMgr
    });
  })); // beforeEach

  it('a test should pass', function () {
    expect(true).toEqual(true);
  }); // it

  describe('Before current user is set', function () {

    it('should init RecipelistCtrl specific items to empty, if current user is not set', function () {
      // check impact

      expect(scope.data.fbUrl).toEqual(mockUrl);
      expect(scope.data.fieldName).toEqual(undefined);
      expect(scope.data.fieldValue).toEqual(undefined);
    }); // it

    it('should handle handleCurrentUserSet w userId', function () {
      mockSettingsMgr.$$setMockedUser('mockUser');
      $rootScope.$broadcast('handleCurrentUserSet');
      scope.$root.$digest();

      // check impact
      expect(scope.data.fbUrl).toEqual(mockUrl);
      expect(scope.data.fieldName).toEqual(undefined);
      expect(scope.data.fieldValue).toEqual(undefined);
    }); // it

  }); // describe

  describe('After current user is set', function () {
    var testItems = [{recipename: 'soup'}, {recipename: 'sauce'}, {recipename: 'bread'}];

    beforeEach(function () {
      mockBasicStoredListMgr.$$setMockedItems(testItems);
      scope.setStoreId('mockUrl', 'isonlist', true);
      mockSettingsMgr.$$setMockedUser('mockUser');
      $rootScope.$broadcast('handleCurrentUserSet');
      scope.$root.$digest();
    }); // beforeEach

    it('should initialize items array, when items in DB', function () {
      // console.log('scope.data', scope.data);
      expect(scope.data.myItems.length).toEqual(3);
      expect(scope.data.myItems[0].recipename).toEqual(testItems[0].recipename);
      expect(scope.data.myItems[1].recipename).toEqual(testItems[1].recipename);
      expect(scope.data.myItems[2].recipename).toEqual(testItems[2].recipename);
    });

    it('should add recipe', function () {
      // set
      spyOn(mockBasicStoredListMgr, 'addItem').and.callThrough();

      // act
      scope.addRecipe('soup', 'thanksgiving');

      // check
      expect(mockBasicStoredListMgr.addItem).toHaveBeenCalled();
    });

    it('should delete recipe', function () {
      // set
      spyOn(mockBasicStoredListMgr, 'deleteItem').and.callThrough();

      // act
      scope.deleteRecipe(scope.data.myItems[1]);

      // check
      expect(mockBasicStoredListMgr.deleteItem).toHaveBeenCalled();
    });

    it('should save recipe', function () {
      // set
      spyOn(mockBasicStoredListMgr, 'saveItem').and.callThrough();

      // act
      scope.saveRecipe(scope.data.myItems[1]);

      // check
      expect(mockBasicStoredListMgr.saveItem).toHaveBeenCalled();
    });

  }); // describe


});
