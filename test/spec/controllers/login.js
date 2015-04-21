'use strict';

describe('Controller: LoginCtrl', function () {

  // load the controller's module
  beforeEach(function () {
    module('loginMod');
    module('settingsMod.mock');
    module('authenticationMod.mock');
  });

  var LoginCtrl, scope;
  var $rootScope, $log;
  var mockAuthentication, mockSettingsMgr;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, _$rootScope_, _$log_, _$location_,
                              _settingsMgr_, _Authentication_) {
    $log = _$log_;
    $rootScope = _$rootScope_;
    scope = $rootScope.$new();
    mockSettingsMgr = _settingsMgr_;
    mockAuthentication = _Authentication_;

    LoginCtrl = $controller('LoginCtrl', {
      $scope: scope,
      Authentication: mockAuthentication,
      settingsMgr: mockSettingsMgr
    });
  }));

  it('a test should pass', function () {
    expect(true).toEqual(true);
  });

  it('should login w success', function () {
    spyOn(mockAuthentication, 'login').and.callThrough();
    spyOn(mockSettingsMgr, 'setCurrentUser').and.callThrough();

    mockAuthentication.$$setMockedAuthData({uid: '123'});
    scope.login({
      email: 'a@a.com',
      password: 'password'
    });
    $rootScope.$digest();

    expect(mockAuthentication.login).toHaveBeenCalled();
    expect(mockSettingsMgr.setCurrentUser).toHaveBeenCalled();
    expect(scope.message).toEqual(undefined);
  });

  it('should set error msg, when login fails', function () {
    spyOn(mockAuthentication, 'login').and.callThrough();
    spyOn(mockAuthentication, 'logout').and.callThrough();
    spyOn(mockSettingsMgr, 'setCurrentUser').and.callThrough();

    mockAuthentication.$$setLoginError('error is this');
    scope.login({
      email: 'a@a.com',
      password: 'password'
    });
    $rootScope.$digest();

    expect(mockAuthentication.login).toHaveBeenCalled();
    expect(mockAuthentication.logout).toHaveBeenCalled();
    expect(mockSettingsMgr.setCurrentUser).not.toHaveBeenCalled();
    expect(scope.message).toEqual('error is this');
  });

  it('should set error msg, when getting usr data from db after login fails', function () {
    spyOn(mockAuthentication, 'login').and.callThrough();
    spyOn(mockAuthentication, 'logout').and.callThrough();
    spyOn(mockSettingsMgr, 'setCurrentUser').and.callThrough();

    mockAuthentication.$$setMockedAuthData({uid: '123'});
    scope.login({
      email: 'a@a.com',
      password: 'password'
    });
    mockSettingsMgr.$$setCurrentUserError('error is this');
    $rootScope.$digest();

    expect(mockAuthentication.login).toHaveBeenCalled();
    expect(mockAuthentication.logout).not.toHaveBeenCalled();
    expect(mockSettingsMgr.setCurrentUser).toHaveBeenCalled();
    expect(scope.message).toEqual('error is this');
    expect($log.error.logs.length).toEqual(1);
    var errorInLog = $log.error.logs[0][0];
    expect(errorInLog).toEqual('ERROR: getting user info from store after logging in failed');

  });

  it('should log out', function () {
    spyOn(mockAuthentication, 'logout').and.callThrough();

    scope.logout();
    $rootScope.$digest();

    expect(mockAuthentication.logout).toHaveBeenCalled();
  });

  it('should register w success', function () {
    spyOn(mockAuthentication, 'register').and.callThrough();
    spyOn(mockSettingsMgr, 'addUser').and.callThrough();
    spyOn(mockAuthentication, 'login').and.callThrough();

    mockAuthentication.$$setMockedAuthData({uid: '123'});
    scope.register({
      email: 'a@a.com',
      password: 'password'
    });
    $rootScope.$digest();

    expect(mockAuthentication.register).toHaveBeenCalled();
    expect(mockSettingsMgr.addUser).toHaveBeenCalled();
    expect(mockAuthentication.login).toHaveBeenCalled();
    expect(scope.message).toEqual(undefined);
  });

  it('should set error msg, when registering fails', function () {
    spyOn(mockAuthentication, 'register').and.callThrough();
    spyOn(mockSettingsMgr, 'addUser').and.callThrough();
    spyOn(mockAuthentication, 'login').and.callThrough();

    mockAuthentication.$$setRegisteringError('error is this');
    scope.register({
      email: 'a@a.com',
      password: 'password'
    });
    $rootScope.$digest();

    expect(mockAuthentication.register).toHaveBeenCalled();
    expect(mockSettingsMgr.addUser).not.toHaveBeenCalled();
    expect(mockAuthentication.login).not.toHaveBeenCalled();
    expect(scope.message).toEqual('error is this');
  });

});
