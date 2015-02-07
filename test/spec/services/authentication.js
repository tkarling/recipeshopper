'use strict';

describe('Service: Authentication', function () {

  beforeEach(module('authenticationMod'));

  var q, deferred, $rootScope, $log;
  var $authWithPasswordSpy, $createUserSpy, $unauthSpy, prepareForLogoutSpy;

  beforeEach(function () {

    var mockUrl = 'mockUrl';

    // var mockFBAuthObject = function() {};

    // mockFBAuthObject.prototype.$loaded = function() {
    //   deferred = q.defer();
    //   $loadedSpy();
    //   return deferred.promise;
    // };

    // mockFBAuthObject.prototype.$save = function() {
    //   deferred = q.defer();
    //   $saveSpy();
    //   return deferred.promise;
    // };

    // mockFBAuthObject.prototype.$destroy = function() {
    //   deferred = q.defer();
    //   $destroySpy();
    //   return deferred.promise;
    // };

    var mockFirebaseAuthRef = function() {};

    // mockFirebaseAuthRef.prototype.$asObject = function() {
    //   // console.log('Settings:: $asObject');
    //   $asObjectSpy();
    //   return new mockFBAuthObject();
    // };

    mockFirebaseAuthRef.prototype.$authWithPassword = function(user) {
      deferred = q.defer();
      $authWithPasswordSpy();
      return deferred.promise;
    };

    mockFirebaseAuthRef.prototype.$createUser = function(user) {
      deferred = q.defer();
      $createUserSpy();
      return deferred.promise;
    };

    mockFirebaseAuthRef.prototype.$unauth = function() {
      deferred = q.defer();
      $unauthSpy();
      return deferred.promise;
    };

    var mockFirebaseAuth = function(item) {
      // console.log('Settings: mockFirebaseRef');
      return new mockFirebaseAuthRef();
    };

    var mockStoredListMgrFactory = {
        prepareForLogout: function () {
          deferred = q.defer();
          prepareForLogoutSpy();
          return deferred.promise;
        }
      };

    module(function ($provide) {
        $provide.value('$firebaseAuth', mockFirebaseAuth);
        $provide.value('FIREBASE_URL', mockUrl);
        $provide.value('StoredListMgrFactory', mockStoredListMgrFactory);
    });

  });

  // instantiate service
  var Authentication;
  beforeEach(inject(function(_$rootScope_, _Authentication_, _$q_, _$log_) {
    Authentication = _Authentication_;
    q = _$q_;
    $log = _$log_;
    $rootScope = _$rootScope_;
  }));

  it('should do something', function() {
    expect(!!Authentication).toBe(true);
    expect(Authentication.userLoggedIn()).toEqual(false);
  });

  it('should call $authWithPassword, when logging in', function () {
      var myUid = '';
      $authWithPasswordSpy = jasmine.createSpy('$authWithPassword spy');

      Authentication.login({
          email: 'a@a.com',
          password: 'password'
        }).then(function (authData) {
            myUid = authData.uid;
        });
      deferred.resolve({uid:'123'});
      $rootScope.$digest();

      expect($authWithPasswordSpy).toHaveBeenCalled();
      expect(myUid).toEqual('123');
  });

  it('should call $createUser, when registering', function () {
      var myUid = '';
      $createUserSpy = jasmine.createSpy('$createUser spy');

      Authentication.register({
          email: 'a@a.com',
          password: 'password'
        }).then(function (authData) {
            myUid = authData.uid;
        });
      deferred.resolve({uid:'123'});
      $rootScope.$digest();

      expect($createUserSpy).toHaveBeenCalled();
      expect(myUid).toEqual('123');
  });

  it('should prepare StoredListMgr & call $unauth, when logging out', function () {
      $unauthSpy = jasmine.createSpy('$unauth spy');
      prepareForLogoutSpy = jasmine.createSpy('prepareForLogout spy');

      Authentication.logout();

      expect(prepareForLogoutSpy).toHaveBeenCalled();
      expect($unauthSpy).toHaveBeenCalled();
  });

});

