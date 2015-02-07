'use strict';

describe('Service: settingsMgr', function() {

  // load the service's module
  beforeEach(module('settingsMod'));

  var mockUrl, mockFirebaseRef, spymockFBObject; //mockFirebaseDataRef
  var q, deferred, $rootScope, $log;
  var $asObjectSpy, $setSpy, $loadedSpy, $saveSpy, $destroySpy;

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

    var mockFirebaseDataRef = function() {};

    mockFirebaseDataRef.prototype.$asObject = function() {
      // console.log('Settings:: $asObject');
      $asObjectSpy();
      spymockFBObject = new mockFBObject();
      return spymockFBObject;
    };

    mockFirebaseDataRef.prototype.$set = function(myKey, myData) {
      deferred = q.defer();
      $setSpy();
      return deferred.promise;
    };

    mockFirebaseRef = function(item) {
      // console.log('Settings: mockFirebaseRef');
      return new mockFirebaseDataRef();
    };

    module(function($provide) {
      $provide.value('$firebase', mockFirebaseRef);
      $provide.value('FIREBASE_URL', mockUrl);
    });

  });

  // instantiate service
  var settingsMgr;
  beforeEach(inject(function(_$rootScope_, _settingsMgr_, _$q_, _$log_) {
    settingsMgr = _settingsMgr_;
    q = _$q_;
    $log = _$log_;
    $rootScope = _$rootScope_;
  }));

  it('should do something', function() {
    expect(!!settingsMgr).toBe(true);
  });


  describe('Service: settingsMgr: before current user is set', function() {

      it('should get default setting, if current user is not set', function() {
        var result = settingsMgr.getSetting('shoppingListSortOrder');
        expect(result).toEqual('aisle');
      });

      it('set should not call $save, if current user is not set', function () {
        $saveSpy = jasmine.createSpy('$save spy');
        settingsMgr.setSetting('shoppingListSortOrder', 'recipe');
        $rootScope.$digest();
        expect($saveSpy).not.toHaveBeenCalled();

        var result = settingsMgr.getSetting('shoppingListSortOrder');
        expect(result).toEqual('recipe');
      });


      it('should add user', function() {
        $setSpy = jasmine.createSpy('$set spy');
        var userUid = 'testUid';
        var user = {
          firstname: 'Tuija', lastname: 'Karling'
        };
        settingsMgr.addUser(userUid, user);

        $rootScope.$digest();
        expect($setSpy).toHaveBeenCalled();

        expect($log.log.logs.length).toEqual(2);
        var urlInLog = $log.log.logs[0][0];
        expect(urlInLog).toEqual('mockUrl/users/');
        
        var userInfoInLog = $log.log.logs[1][0];
        expect(userInfoInLog.firstname).toEqual('Tuija');
        expect(userInfoInLog.lastname).toEqual('Karling');
        expect(userInfoInLog.shoppingListSortOrder).toEqual('aisle');
      });

      it('should set and get user', function() {
        // test setCurrentUser
        $loadedSpy = jasmine.createSpy('$loaded spy');
        $asObjectSpy = jasmine.createSpy('$asObjectSpy spy');
        var userUid = 'testUid';
        settingsMgr.setCurrentUser(userUid);
        $rootScope.$digest();

        expect($asObjectSpy).toHaveBeenCalled();
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
          settingsMgr.setCurrentUser('testUid');
          // note this writes one item to $log.log
      });

      it('should set and get setting', function () {
        $saveSpy = jasmine.createSpy('$save spy');
        settingsMgr.setSetting('shoppingListSortOrder', 'recipe');
        $rootScope.$digest();
        expect($saveSpy).toHaveBeenCalled();

        var result = settingsMgr.getSetting('shoppingListSortOrder');
        expect(result).toEqual('recipe');
      });


      it("should set user to ''(to be called e.g. before logout)", function() {
        $loadedSpy = jasmine.createSpy('$loaded spy');
        $asObjectSpy = jasmine.createSpy('$asObjectSpy spy');
        $destroySpy = jasmine.createSpy('$destroy spy');
        var userUid = '';
        settingsMgr.setCurrentUser(userUid);
        $rootScope.$digest();

        expect($asObjectSpy).not.toHaveBeenCalled();
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