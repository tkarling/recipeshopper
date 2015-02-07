'use strict';

describe('Controller: LoginCtrl', function () {

  // load the controller's module
  beforeEach(module('loginMod'));

  var LoginCtrl, scope;
  var q, deferred, $rootScope, $log;
  var loginSpy, registerSpy, logoutSpy;
  var setCurrentUserSpy, addUserSpy;
  var mockAuthentication, mockSettingsMgr;

  beforeEach(function () {
      mockAuthentication = {
        login: function (user, authHandler) {
              deferred = q.defer();
              loginSpy();
              return deferred.promise;
        }, //login

        register: function (user, authHandler) {
              deferred = q.defer();
              registerSpy();
              return deferred.promise;
        }, //register

        logout: function() {
            logoutSpy();
        } // logout

        // userLoggedIn: function () {
        //   return true;
        // } // userLoggedIn
      };

      mockSettingsMgr = {
        getCurrentUser: function () {
          return '123';
        }, // getCurrentUser

        getSetting: function (setting) {
          return 'result';
        }, // getSetting

        setCurrentUser: function (myUid) {
              deferred = q.defer();
              setCurrentUserSpy();
              return deferred.promise;
        }, // setCurrentUser

        addUser: function (myUid, user) {
              deferred = q.defer();
              addUserSpy();
              return deferred.promise;
        }, // addUser

      };
  });

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, _$rootScope_, _$log_, _$location_, _$q_) {
      q= _$q_;
      $log = _$log_;
      $rootScope = _$rootScope_;
      scope = $rootScope.$new();
      LoginCtrl = $controller('LoginCtrl', {
        $scope: scope,
        Authentication: mockAuthentication,
        settingsMgr: mockSettingsMgr
      });
  }));

  it('a test should pass', function () {
      expect(true).toEqual(true);
  });

  it('should call A.login & S.set user, when logging in w success', function () {
      loginSpy = jasmine.createSpy('login spy');
      setCurrentUserSpy = jasmine.createSpy('setCurrentUser spy');

      scope.login({
          email: 'a@a.com',
          password: 'password'
        });
      deferred.resolve({uid:'123'});
      $rootScope.$digest();

      expect(loginSpy).toHaveBeenCalled();
      expect(setCurrentUserSpy).toHaveBeenCalled();
      expect(scope.message).toEqual(undefined);
  });

  it('should set error msg, when logging in fails', function () {
      loginSpy = jasmine.createSpy('login spy');
      logoutSpy = jasmine.createSpy('logout spy');
      setCurrentUserSpy = jasmine.createSpy('setCurrentUser spy');

      scope.login({
          email: 'a@a.com',
          password: 'password'
        });
      deferred.reject({message: 'error is this'});
      $rootScope.$digest();

      expect(loginSpy).toHaveBeenCalled();
      expect(logoutSpy).toHaveBeenCalled();
      expect(setCurrentUserSpy).not.toHaveBeenCalled();
      expect(scope.message).toEqual('error is this');
  });

  it('should set error msg & write to error log, when getting usr data from db after logging in fails', function () {
      loginSpy = jasmine.createSpy('login spy');
      logoutSpy = jasmine.createSpy('logout spy');
      setCurrentUserSpy = jasmine.createSpy('setCurrentUser spy');

      scope.login({
          email: 'a@a.com',
          password: 'password'
        });
      deferred.resolve({uid:'123'});
      $rootScope.$digest();
      deferred.reject({message: 'error is this'});
      $rootScope.$digest();

      expect(loginSpy).toHaveBeenCalled();
      expect(logoutSpy).not.toHaveBeenCalled();
      expect(setCurrentUserSpy).toHaveBeenCalled();
      expect(scope.message).toEqual('error is this');
      expect($log.error.logs.length).toEqual(1);
      var errorInLog = $log.error.logs[0][0];
      expect(errorInLog).toEqual('ERROR: getting user info from store after logging in failed');

  });

  it('should call A.logout, when logging out', function () {
      logoutSpy = jasmine.createSpy('logout spy');

      scope.logout();
      $rootScope.$digest();

      expect(logoutSpy).toHaveBeenCalled();
  });

  it('should call A.register, A.login and S.add user, when registering in w success', function () {
      registerSpy = jasmine.createSpy('register spy');
      addUserSpy = jasmine.createSpy('addUser spy');
      loginSpy = jasmine.createSpy('login spy');

      scope.register({
          email: 'a@a.com',
          password: 'password'
        });
      deferred.resolve({uid:'123'});
      $rootScope.$digest();
      deferred.resolve({firstname:'Tuija', lastname:'Karling'});
      $rootScope.$digest();

      expect(registerSpy).toHaveBeenCalled();
      expect(addUserSpy).toHaveBeenCalled();
      expect(loginSpy).toHaveBeenCalled();
      expect(scope.message).toEqual(undefined);
  });

  it('should set error msg, when registering fails', function () {
      registerSpy = jasmine.createSpy('register spy');
      addUserSpy = jasmine.createSpy('addUser spy');
      loginSpy = jasmine.createSpy('login spy');

      scope.register({
          email: 'a@a.com',
          password: 'password'
        });
      deferred.reject({message: 'error is this'});
      $rootScope.$digest();

      expect(registerSpy).toHaveBeenCalled();
      expect(addUserSpy).not.toHaveBeenCalled();
      expect(loginSpy).not.toHaveBeenCalled();
      expect(scope.message).toEqual('error is this');
  });

  it('should set error msg & write to error log, when adding usr to db after registering fails', function () {
      registerSpy = jasmine.createSpy('register spy');
      addUserSpy = jasmine.createSpy('addUser spy');
      loginSpy = jasmine.createSpy('login spy');

      scope.register({
          email: 'a@a.com',
          password: 'password'
        });
      deferred.resolve({uid:'123'});
      $rootScope.$digest();
      deferred.reject({message: 'error is this'});
      $rootScope.$digest();

      expect(registerSpy).toHaveBeenCalled();
      expect(addUserSpy).toHaveBeenCalled();
      expect(loginSpy).not.toHaveBeenCalled();
      expect(scope.message).toEqual('error is this');
      expect($log.error.logs.length).toEqual(1);
      var errorInLog = $log.error.logs[0][0];
      expect(errorInLog).toEqual('ERROR: adding user to store after registering failed');

  });

});
