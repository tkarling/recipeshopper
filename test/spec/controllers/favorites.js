'use strict';

describe('Controller: FavoritesCtrl', function () {

  // load the controller's module
  beforeEach(module('recipeshopperApp'));

  var FavoritesCtrl;
  var scope;
  var mockStoredListMgrFactory, mockBasicStoredListMgr, mockUrl, mockSettingsMgr;
  var groceriesFromStore;
  var q, deferred;
  var settingsMgrSpy = {getCurrentUser: null, getSettings: null, saveSettings: null};
  var basicStoredListMgrSpy = {getItemsSync: null, getItems: null, addItem: null, 
        deleteItem: null, saveItem: null};


  beforeEach(function () {
      groceriesFromStore = [{product:'carrots'}, {product:'milk'}, {product:'bread'}];
      mockUrl = 'mockUrl';

      var mockItemsFromStore = groceriesFromStore;
      mockBasicStoredListMgr = {
          getItemsSync: function(tellWhenLoaded, fieldName, fieldValue) {
            return mockItemsFromStore;
          },
          getItems: function (fieldName, fieldValue) {
              deferred = q.defer();
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

      var mockCurrentUser = {};
      var mockMySettings = {};
      mockSettingsMgr = {
          getCurrentUser: function () {
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
  });

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _$q_) {
    q= _$q_;
    scope = $rootScope.$new();
    FavoritesCtrl = $controller('FavoritesCtrl', {
      $scope: scope,
      FB_SHOPPINGLIST_URL: mockUrl, 
      StoredListMgrFactory: mockStoredListMgrFactory,
      settingsMgr: mockSettingsMgr
    });
  }));

  beforeEach(function () {
    deferred.resolve(groceriesFromStore);
    scope.$root.$digest();
  });

  it('a test should pass', function () {
      expect(true).toEqual(true);
  });

  it('should initialize groceries array, when groceries in DB', function () {
    expect(scope.groceries.length).toEqual(3); 
    expect(scope.groceries[0].product).toEqual(groceriesFromStore[0].product); 
    expect(scope.groceries[1].product).toEqual(groceriesFromStore[1].product); 
    expect(scope.groceries[2].product).toEqual(groceriesFromStore[2].product); 
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
      scope.deleteItem(scope.groceries[1]);

      // check
      expect(basicStoredListMgrSpy.deleteItem).toHaveBeenCalled();
  });

  it('should save item', function() {
      // set
      basicStoredListMgrSpy.saveItem = jasmine.createSpy('basicStoredListMgrSpy.saveItem Spy');

      // act
      scope.saveItem(scope.groceries[1]);

      // check
      expect(basicStoredListMgrSpy.saveItem).toHaveBeenCalled();
  });

});
