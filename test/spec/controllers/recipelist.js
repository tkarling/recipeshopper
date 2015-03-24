'use strict';

describe('Controller: RecipelistCtrl', function () {

  // load the controller's module
  beforeEach(module('recipeshopperApp'));
  var EFUNC = function () {};

  var BaselistCtrl, RecipelistCtrl;
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

describe('Before current user is set', function() {

    it('should init RecipelistCtrl specific items to empty, if current user is not set', function() {
      // check impact

      expect(scope.data.fbUrl).toEqual(mockUrl);
      expect(scope.data.fieldName).toEqual(undefined);
      expect(scope.data.fieldValue).toEqual(undefined);
    }); // it

    it('should handle handleCurrentUserSet w userId', function() {
      mockCurrentUser = 'moi';
      mockMySettings = {};
      mockItemsFromStore = [{recipename:'soup'}, {recipename:'sauce'}, {recipename:'bread'}];
      $rootScope.$broadcast('handleCurrentUserSet');

      deferred.resolve(mockItemsFromStore);
      scope.$root.$digest();

      // check impact
      expect(scope.data.fbUrl).toEqual(mockUrl);
      expect(scope.data.fieldName).toEqual(undefined);
      expect(scope.data.fieldValue).toEqual(undefined);
    }); // it

  }); // describe

  describe('After current user is set', function() {

    beforeEach(function () {
      mockCurrentUser = 'moi';
      mockMySettings = {};
      mockItemsFromStore = [{recipename:'soup'}, {recipename:'sauce'}, {recipename:'bread'}];
      $rootScope.$broadcast('handleCurrentUserSet');
      deferred.resolve(mockItemsFromStore);
      scope.$root.$digest();
    }); // beforeEach

    it('should initialize items array, when items in DB', function () {
      // console.log('scope.data', scope.data);
      expect(scope.data.myItems.length).toEqual(3); 
      expect(scope.data.myItems[0].recipename).toEqual(mockItemsFromStore[0].recipename); 
      expect(scope.data.myItems[1].recipename).toEqual(mockItemsFromStore[1].recipename); 
      expect(scope.data.myItems[2].recipename).toEqual(mockItemsFromStore[2].recipename); 
     }); 

    it('should add recipe', function() {
        // set
        basicStoredListMgrSpy.addItem = jasmine.createSpy('basicStoredListMgrSpy.addItem Spy');

        // act
        scope.addRecipe('soup', 'thanksgiving');

        // check
        expect(basicStoredListMgrSpy.addItem).toHaveBeenCalled();
    });

    it('should delete recipe', function() {
        // set
        basicStoredListMgrSpy.deleteItem = jasmine.createSpy('basicStoredListMgrSpy.deleteItem Spy');

        // act
        scope.deleteRecipe(scope.data.myItems[1]);

        // check
        expect(basicStoredListMgrSpy.deleteItem).toHaveBeenCalled();
    });

    it('should save recipe', function() {
        // set
        basicStoredListMgrSpy.saveItem = jasmine.createSpy('basicStoredListMgrSpy.saveItem Spy');

        // act
        scope.saveRecipe(scope.data.myItems[1]);

        // check
        expect(basicStoredListMgrSpy.saveItem).toHaveBeenCalled();
    });

  }); // describe


});
