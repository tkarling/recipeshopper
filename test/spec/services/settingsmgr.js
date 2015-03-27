'use strict';

describe('Service: settingsMgr', function() {

  // load the service's module
  beforeEach(module('settingsMod'));

  var mockUrl, mockFirebaseRef, spymockFBObject; //mockFirebaseDataRef
  var q, deferred, $rootScope, $log, $http, backend;
  var $setSpy, $loadedSpy, $saveSpy, $destroySpy;

  beforeEach(function() {

    mockUrl = 'mockUrl';

    var mockFBObject = function() {};

    mockFBObject.prototype.$loaded = function() {
      deferred = q.defer();
      $loadedSpy();
      return deferred.promise;
    };

    mockFBObject.prototype.$save = function() {
      deferred = q.defer();
      $saveSpy();
      return deferred.promise;
    };

    mockFBObject.prototype.$destroy = function() {
      deferred = q.defer();
      $destroySpy();
      return deferred.promise;
    };

    mockFirebaseRef = function(item) {
      // console.log('BasicStoredListMgr: mockFirebaseRef');
      return new mockFBObject;
    };

    mockFirebaseRef.prototype.set = function(myKey, myData) {
      deferred = q.defer();
      $setSpy();
      return deferred.promise;
    };

    module(function($provide) {
      $provide.value('$firebaseObject', mockFirebaseRef);
      $provide.value('FIREBASE_URL', mockUrl);
    });

  });

  beforeEach(inject(function ($httpBackend) {
    // console.log('backend.expect');
    backend = $httpBackend;
    backend.expect("GET", "data/defaultsettings.json").respond(
      {'shoppingListSortOrder' : 'aisle',
        'doNotShowBoughtItems' : false,
       'recipeSortOrder': 'recipename'});
  }));

  // instantiate service
  var settingsMgr;
  beforeEach(inject(function(_$rootScope_, _settingsMgr_, _$q_, _$log_, _$http_) {
    settingsMgr = _settingsMgr_;
    q = _$q_;
    $log = _$log_;
    $rootScope = _$rootScope_;
    $http = _$http_;
    backend.flush();
  }));

  it('should do something', function() {
    expect(!!settingsMgr).toBe(true);
  });


  describe('Service: settingsMgr: before current user is set', function() {

      it('should get default settings, if current user is not set', function() {
        var mySettings = settingsMgr.getSettings();
        expect(mySettings.shoppingListSortOrder).toEqual('aisle');
        expect(mySettings.recipeSortOrder).toEqual('recipename');
      });

      it('saveSettings should not call $save, if current user is not set', function () {
        var mySettings = settingsMgr.getSettings();
        expect(mySettings.shoppingListSortOrder).toEqual('aisle');
        $saveSpy = jasmine.createSpy('$save spy');

        mySettings.shoppingListSortOrder = 'recipe';
        settingsMgr.saveSettings();
        $rootScope.$digest();

        expect($saveSpy).not.toHaveBeenCalled();
        expect(mySettings.shoppingListSortOrder).toEqual('recipe');
      });


      it('should get default setting, if current user is not set', function() {
        var result = settingsMgr.getSetting('shoppingListSortOrder');
        expect(result).toEqual('aisle');
      });

      it('set should not call $save, if current user is not set', function () {
        expect(settingsMgr.getSetting('shoppingListSortOrder')).toEqual('aisle');
        $saveSpy = jasmine.createSpy('$save spy');

        settingsMgr.setSetting('shoppingListSortOrder', 'recipe');
        $rootScope.$digest();

        expect($saveSpy).not.toHaveBeenCalled();
        expect(settingsMgr.getSetting('shoppingListSortOrder')).toEqual('recipe');
      });


      it('should add user', function() {
        $setSpy = jasmine.createSpy('$set spy');
        var userUid = 'testUid';
        var user = {
          firstname: 'Tuija', lastname: 'Karling'
        };
        settingsMgr.addUser(userUid, user);

        $rootScope.$digest();
        // expect($setSpy).toHaveBeenCalled();

        expect($log.log.logs.length).toEqual(2);
        var urlInLog = $log.log.logs[0][0];
        expect(urlInLog).toEqual('mockUrl/users/testUid');
        
        var userInfoInLog = $log.log.logs[1][0];
        expect(userInfoInLog.firstname).toEqual('Tuija');
        expect(userInfoInLog.lastname).toEqual('Karling');
        expect(userInfoInLog.shoppingListSortOrder).toEqual('aisle');
      });

      it('should set and get user', function() {
        // test setCurrentUser
        $loadedSpy = jasmine.createSpy('$loaded spy');
        var userUid = 'testUid';
        settingsMgr.setCurrentUser(userUid);
        $rootScope.$digest();

        expect($loadedSpy).toHaveBeenCalled();
        
        expect($log.log.logs.length).toEqual(1);
        var urlInLog = $log.log.logs[0][0];
        expect(urlInLog).toEqual('mockUrl/users/testUid');

        // test getCurrentUser
        var resultUid = settingsMgr.getCurrentUser();
        expect(resultUid).toEqual('testUid');
      });

  });

  describe('Service: settingsMgr: after current user is set', function() {

      beforeEach (function() {
          $loadedSpy = jasmine.createSpy('$loaded spy');

          settingsMgr.setCurrentUser('testUid');
          // note this writes one item to $log.log
          $rootScope.$digest();

          expect($loadedSpy).toHaveBeenCalled();
          expect(settingsMgr.getCurrentUser()).toEqual('testUid');
          expect(settingsMgr.getSetting('firstname')).toEqual(undefined);
          expect(settingsMgr.getSetting('lastname')).toEqual(undefined);
          // expect(settingsMgr.getSetting('shoppingListSortOrder')).toEqual('aisle');
      });

      it('should set and get setting w get & aet setting', function () {
        $saveSpy = jasmine.createSpy('$save spy');

        settingsMgr.setSetting('shoppingListSortOrder', 'recipe');
        $rootScope.$digest();

        expect($saveSpy).toHaveBeenCalled();
        expect(settingsMgr.getSetting('shoppingListSortOrder')).toEqual('recipe');
      });


      it('should set and get settings w get & save settings', function () {
        var mySettings = settingsMgr.getSettings();
        // expect(mySettings.shoppingListSortOrder).toEqual('aisle');
        $saveSpy = jasmine.createSpy('$save spy');

        mySettings.shoppingListSortOrder = 'recipe';
        settingsMgr.saveSettings();
        $rootScope.$digest();

        expect($saveSpy).toHaveBeenCalled();
        expect(mySettings.shoppingListSortOrder).toEqual('recipe');
      });


      it("should set user to ''(to be called e.g. before logout)", function() {
        $loadedSpy = jasmine.createSpy('$loaded spy');
        $destroySpy = jasmine.createSpy('$destroy spy');
        var userUid = '';
        settingsMgr.setCurrentUser(userUid);
        $rootScope.$digest();

        expect($loadedSpy).not.toHaveBeenCalled();
        expect($destroySpy).toHaveBeenCalled();
        
        // test all is reset
        expect(settingsMgr.getCurrentUser()).toEqual('');
        expect(settingsMgr.getSetting('firstname')).toEqual(undefined);
        expect(settingsMgr.getSetting('lastname')).toEqual(undefined);
        expect(settingsMgr.getSetting('shoppingListSortOrder')).toEqual('aisle');
      });


  });

});