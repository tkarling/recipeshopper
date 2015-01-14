'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('recipeshopperApp'));

  var MainCtrl,scope, mockStoredListMgrFactory, mockBasicStoredListMgr, mockUrl;
  var q, deferred;

  beforeEach(function () {
      mockUrl = 'mockUrl';

      mockBasicStoredListMgr = {
          getItems: function (fieldName, fieldValue) {
              deferred = q.defer();
              return deferred.promise;
          },
          addItem: function (item) {
              deferred = q.defer();
              return deferred.promise;
          },
          deleteItem: function (item) {
              deferred = q.defer();
              return deferred.promise;
          },
          saveItem: function (item) {
              deferred = q.defer();
              return deferred.promise;
          }
      }; // mockBasicStoredListMgr

      mockStoredListMgrFactory = {
        getStoredListMgr: function (fbUrl) {
              return mockBasicStoredListMgr;
        } //getStoredListMgr

      };
  });


  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _$log_, _$q_) {
    q= _$q_;
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope,
      $log: _$log_, 
      FB_SHOPPINGLIST_URL: mockUrl, 
      StoredListMgrFactory: mockStoredListMgrFactory
    });
  }));


  it('should toggle showAll between false/undefined, when showAllDef (check) toggles between true/ false', function () {
    expect(scope.showAllDef).toBe(false); 
    expect(scope.showAll).toBe(undefined);

    scope.$digest();
    scope.showAllDef = true;
    scope.$digest();

    expect(scope.showAllDef).toBe(true);
    expect(scope.showAll).toBe(false);

    scope.$digest();
    scope.showAllDef = false;
    scope.$digest();

    expect(scope.showAllDef).toBe(false);
    expect(scope.showAll).toBe(undefined);
  });

  it('should set scope.product&aisle to empty string after adding product', function () {
      expect(scope.product).toEqual(undefined);
      expect(scope.aisle).toEqual(undefined);

      scope.addProduct();
      deferred.resolve('');
      scope.$root.$digest();

      expect(scope.product).toEqual('');
      expect(scope.aisle).toEqual('');
  });

  it('should be able to call deleteProduct, saveProduct', function () {
      // spyOn(mockStoredListMgrFactory, 'getStoredListMgr');
      var item = {};
      scope.deleteProduct(item);
      scope.saveProduct(item);
  });

});
