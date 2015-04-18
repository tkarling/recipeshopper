'use strict';

describe('Controller: FavoritesCtrl', function () {

  // load the controller's module
  beforeEach(module('recipeshopperApp'));
  var EFUNC = function () {};


  var BaselistCtrl, FavoritesCtrl;
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
        getUsersStoredListMgr: function (fbUrl) {
              return mockBasicStoredListMgr;
        } //getUsersStoredListMgr

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
  beforeEach(inject(function ($controller, _$rootScope_, _$q_) {
    q= _$q_;
    $rootScope = _$rootScope_;
    scope = $rootScope.$new();
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

  // beforeEach(function () {
  //   deferred.resolve(groceriesFromStore);
  //   scope.$root.$digest();
  // });

  it('a test should pass', function () {
      expect(true).toEqual(true);
  }); // it

  describe('Before current user is set:', function() {

    it('should init FavoritesCtrl specific items to empty, if current user is not set', function() {
      // check impact

      expect(scope.data.fbUrl).toEqual(mockUrl);
      expect(scope.data.fieldName).toEqual('recipeId');
      expect(scope.data.fieldValue).toEqual('FAVORITES');
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
      expect(scope.data.fieldName).toEqual('recipeId');
      expect(scope.data.fieldValue).toEqual('FAVORITES');
    }); // it

  }); // describe

  describe('After current user is set:', function() {

    beforeEach(function () {
      mockCurrentUser = 'moi';
      mockMySettings = {};
      mockItemsFromStore = [
        {product:'carrots', isonlist: true, isbought: false},
        {product:'milk', isonlist: true, isbought: false},
        {product:'bread', isonlist: true, isbought: false}];
      $rootScope.$broadcast('handleCurrentUserSet');
      deferred.resolve(mockItemsFromStore);
      scope.$root.$digest();
    }); // beforeEach

    it('should initialize groceries array, when groceries in DB', function () {
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

    it('should delete item', function() {
        // set
        basicStoredListMgrSpy.deleteItem = jasmine.createSpy('basicStoredListMgrSpy.deleteItem Spy');

        // act
        scope.deleteItem(scope.data.myItems[1]);

        // check
        expect(basicStoredListMgrSpy.deleteItem).toHaveBeenCalled();
    });

    it('should toggleItemOnShoppingList', function() {
        // set
        basicStoredListMgrSpy.saveItem = jasmine.createSpy('basicStoredListMgrSpy.saveItem Spy');

        // act
        scope.toggleItemOnShoppingList(scope.data.myItems[1]);

        // check
        expect(basicStoredListMgrSpy.saveItem).toHaveBeenCalled();
        expect(scope.data.myItems[1].isbought).toEqual(false);
    });

  }); // describe

});
