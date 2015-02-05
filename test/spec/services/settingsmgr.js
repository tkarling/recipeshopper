'use strict';

describe('Service: settingsMgr', function() {

  // load the service's module
  beforeEach(module('settingsMod'));

  var mockUrl, mockFirebaseRef, spymockFBObject; //mockFirebaseDataRef
  var q, deferred, $rootScope, $log;
  var $setSpy, $loadedSpy;

  beforeEach(function() {

    mockUrl = 'mockUrl';

    var mockFBObject = function() {};

    mockFBObject.prototype.$loaded = function() {
      deferred = q.defer();
      $loadedSpy();
      return deferred.promise;
    };

    // mockFBObject.prototype.$remove = function(item) {
    //   deferred = q.defer();
    //   $removeSpy();
    //   return deferred.promise;
    // };

    // mockFBObject.prototype.$save = function(item) {
    //   deferred = q.defer();
    //   $saveSpy();
    //   return deferred.promise;
    // };

    // mockFirebaseDataRef = {
    //   $asObject: function() {
    //     // console.log('$asObject');
    //     spymockFBObject = new mockFBObject();
    //     return spymockFBObject;
    //   },

    //   $set: function(myKey, myData) {
    //     deferred = q.defer();
    //     $setSpy();
    //     return deferred.promise;
    //   }
    // };

    var mockFirebaseDataRef = function () {};

    mockFirebaseDataRef.prototype.$asObject = function() {
      // console.log('Settings:: $asObject');
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


  it('should get default setting', function() {
    var result;
    settingsMgr.getSetting('shoppingListSortOrder').then(function(value) {
      result = value;
    });

    $rootScope.$digest();
    expect(result).toEqual('aisle');
  });


  it('should add user', function() {
    $setSpy = jasmine.createSpy('$set spy');
    var userUid = 1;
    var user = {
      firstname: 'Tuija', lastname: 'Karling'
    };
    var addedUserInfo;
    settingsMgr.addUser(userUid, user);
    // settingsMgr.$$$setDataSettings(userInfo);

    $rootScope.$digest();
    expect($setSpy).toHaveBeenCalled();
    expect($log.log.logs.length).toEqual(1);
    var logToCheck = $log.log.logs[0][0];
    expect(logToCheck.firstname).toEqual('Tuija');
    expect(logToCheck.lastname).toEqual('Karling');
    expect(logToCheck.shoppingListSortOrder).toEqual('aisle');
  });


  // it('should add and set user', function() {
  //   var userUid = 1;
  //   var user = {
  //     firstname: 'Tuija', lastname: 'Karling'
  //   };
  //   var addedUserInfo, currentUserUid;
  //   settingsMgr.addUser(userUid, user).then(function(userInfo) {
  //     addedUserInfo = userInfo;
  //   });
  //   settingsMgr.setCurrentUser(userUid).then(function(setUserUid) {
  //     currentUserUid = setUserUid;
  //   });

  //   $rootScope.$digest();
  //   expect(addedUserInfo.myUid).toEqual(currentUserUid);
  // });


  it('should set setting', function () {
    var result;
    settingsMgr.getSetting('shoppingListSortOrder').then(function(value) {
      result = value;
    });
    $rootScope.$digest();
    expect(result).toEqual('aisle');

    settingsMgr.setSetting('shoppingListSortOrder', 'recipe');
    settingsMgr.getSetting('shoppingListSortOrder').then(function(value) {
      result = value;
    });
    $rootScope.$digest();
    expect(result).toEqual('recipe');
  });

});