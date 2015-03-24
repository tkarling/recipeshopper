'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('recipeshopperApp'));
  var EFUNC = function () {};

  var BaselistCtrl, MainCtrl;
  var scope, $rootScope;
  var mockStoredListMgrFactory, mockBasicStoredListMgr, mockSettingsMgr;
  var mockUrl, mockCurrentUser, mockMySettings, mockItemsFromStore;
  var q, deferred;
  var settingsMgrSpy = {getCurrentUser: EFUNC, getSettings: EFUNC, saveSettings: EFUNC};
  var basicStoredListMgrSpy = {getItemsSync: EFUNC, getItems: EFUNC, addItem: EFUNC, 
        deleteItem: EFUNC, saveItem: EFUNC};

  beforeEach(function () {
      mockUrl = 'mockUrl';

      mockBasicStoredListMgr = {
          getItemsSync: function(tellWhenLoaded, fieldName, fieldValue) {
            basicStoredListMgrSpy.getItemsSync();
            return mockItemsFromStore;
          },
          getItems: function (fieldName, fieldValue) {
              deferred = q.defer();
              basicStoredListMgrSpy.getItems();
              return deferred.promise;
          },
          addItem: function (item) {
              deferred = q.defer();
              basicStoredListMgrSpy.addItem(item);
              return deferred.promise;
          },
          deleteItem: function (item) {
              deferred = q.defer();
              basicStoredListMgrSpy.deleteItem(item);
              return deferred.promise;
          },
          saveItem: function (item) {
              deferred = q.defer();
              basicStoredListMgrSpy.saveItem(item);
              return deferred.promise;
          }
      }; // mockBasicStoredListMgr

      mockStoredListMgrFactory = {
        getStoredListMgr: function (fbUrl) {
              return mockBasicStoredListMgr;
        } //getStoredListMgr

      };

      mockSettingsMgr = {
          getCurrentUser: function () {
            settingsMgrSpy.getCurrentUser();
            return mockCurrentUser;
          },
          getSettings: function () {
              settingsMgrSpy.getSettings();
              return mockMySettings;
          },
          saveSettings: function () {
              deferred = q.defer();
              settingsMgrSpy.saveSettings();
              return deferred.promise;
          }
      }; 
  }); // beforeEach

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $compile, _$rootScope_, _$q_) {
    q= _$q_;
    $rootScope = _$rootScope_;
    scope = $rootScope.$new();
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

  describe('Before current user is set', function() {

    it('should init MainCtrl specific items to empty, if current user is not set', function() {
      // check impact

      expect(scope.data.fbUrl).toEqual(mockUrl);
      expect(scope.data.fieldName).toEqual('isonlist');
      expect(scope.data.fieldValue).toEqual(true);
      expect(scope.data.showAll).toEqual(undefined);
    }); // it

    it('should handle handleCurrentUserSet w userId', function() {
      mockCurrentUser = 'moi';
      mockMySettings = {};
      mockItemsFromStore = [{product:'carrots'}, {product:'milk'}, {product:'bread'}];
      $rootScope.$broadcast('handleCurrentUserSet');

      deferred.resolve(mockItemsFromStore);
      scope.$root.$digest();

      // check impact
      expect(scope.data.fbUrl).toEqual(mockUrl);
      expect(scope.data.fieldName).toEqual('isonlist');
      expect(scope.data.fieldValue).toEqual(true);
      expect(scope.data.showAll).toEqual(undefined);
    }); // it

  }); // describe

  describe('MainCtrl: After current user is set', function() {

    beforeEach(function () {
      mockCurrentUser = 'moi';
      mockMySettings = {};
      mockItemsFromStore = [{product:'carrots'}, {product:'milk'}, {product:'bread'}];
      $rootScope.$broadcast('handleCurrentUserSet');
      deferred.resolve(mockItemsFromStore);
      scope.$root.$digest();
    }); // beforeEach

    it('should initialize items array, when items in DB', function () {
      // console.log('scope.data', scope.data);
      expect(scope.data.myItems.length).toEqual(3); 
      expect(scope.data.myItems[0].product).toEqual(mockItemsFromStore[0].product); 
      expect(scope.data.myItems[1].product).toEqual(mockItemsFromStore[1].product); 
      expect(scope.data.myItems[2].product).toEqual(mockItemsFromStore[2].product); 
     }); 

    it('should add item', function() {
        // set
        basicStoredListMgrSpy.addItem = jasmine.createSpy('basicStoredListMgrSpy.addItem Spy');

        // act
        scope.addProduct('carrots', 'veggies', 1);

        // check
        expect(basicStoredListMgrSpy.addItem).toHaveBeenCalled();
    });

    it('should remove item', function() {
        // set
        basicStoredListMgrSpy.saveItem = jasmine.createSpy('basicStoredListMgrSpy.saveItem Spy');

        // act
        scope.removeItem(scope.data.myItems[1]);

        // check
        expect(basicStoredListMgrSpy.saveItem).toHaveBeenCalled();
    });

    it('should save item', function() {
        // set
        basicStoredListMgrSpy.saveItem = jasmine.createSpy('basicStoredListMgrSpy.saveItem Spy');

        // act
        scope.saveItem(scope.data.myItems[1]);

        // check
        expect(basicStoredListMgrSpy.saveItem).toHaveBeenCalled();
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




