'use strict';

describe('Controller: BaselistCtrl', function () {

  // load the controller's module
  beforeEach(module('recipeshopperApp'));
  var EFUNC = function () {};

  var BaselistCtrl;
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
  });

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

  }));

  it('a test should pass', function () {
      expect(true).toEqual(true);
  });

  describe('BaselistCtrl: Before current user is set', function() {

    beforeEach(function () {
      settingsMgrSpy.getCurrentUser = jasmine.createSpy('settingsMgrSpy.getCurrentUser Spy');
      settingsMgrSpy.getSettings = jasmine.createSpy('settingsMgrSpy.getSettings Spy');
      basicStoredListMgrSpy.getItems = jasmine.createSpy('basicStoredListMgrSpy.getItems Spy');
    }); // beforeEach

    it('should init controller to empty, if current user is not set', function() {
      // check what was called
      expect(settingsMgrSpy.getCurrentUser).not.toHaveBeenCalled();
      expect(settingsMgrSpy.getSettings).not.toHaveBeenCalled();
      expect(basicStoredListMgrSpy.getItems).not.toHaveBeenCalled();

      // check impact
      expect(scope.data.storeMgr).toEqual({});
      expect(scope.data.mySettings).toEqual({});
      expect(scope.data.myItems).toEqual([]);
    }); // it

    it('should handle handleCurrentUserSet w userId', function() {
      mockCurrentUser = 'moi';
      mockMySettings = {};
      mockItemsFromStore = [{product:'carrots'}, {product:'milk'}, {product:'bread'}];
      $rootScope.$broadcast('handleCurrentUserSet');
      deferred.resolve(mockItemsFromStore);
      scope.$root.$digest();

      // check what was called
      expect(settingsMgrSpy.getCurrentUser).toHaveBeenCalled();
      expect(settingsMgrSpy.getSettings).toHaveBeenCalled();
      expect(basicStoredListMgrSpy.getItems).toHaveBeenCalled();

      // check impact
      expect(scope.data.storeMgr).not.toEqual({});
      expect(scope.data.mySettings).toEqual({});
      expect(scope.data.myItems).not.toEqual([]);

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
    });

    it('should initialize items array, when items in DB', function () {
      // console.log('scope.data', scope.data);
      expect(scope.data.myItems.length).toEqual(3); 
      expect(scope.data.myItems[0].product).toEqual(mockItemsFromStore[0].product); 
      expect(scope.data.myItems[1].product).toEqual(mockItemsFromStore[1].product); 
      expect(scope.data.myItems[2].product).toEqual(mockItemsFromStore[2].product); 
     }); 

    // it('should delete item', function() {
    //     // set
    //     basicStoredListMgrSpy.deleteItem = jasmine.createSpy('basicStoredListMgrSpy.deleteItem Spy');

    //     // act
    //     scope.deleteItem(scope.groceries[1]);

    //     // check
    //     expect(basicStoredListMgrSpy.deleteItem).toHaveBeenCalled();
    // });

    it('should save item', function() {
        // set
        basicStoredListMgrSpy.saveItem = jasmine.createSpy('basicStoredListMgrSpy.saveItem Spy');

        // act
        scope.saveItem(scope.data.myItems[1]);

        // check
        expect(basicStoredListMgrSpy.saveItem).toHaveBeenCalled();
    });

  }); // describe

});
