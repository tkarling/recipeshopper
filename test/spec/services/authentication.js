'use strict';

describe('Service: Authentication', function () {

  // load the controller's module
  beforeEach(function () {
    module('recipeshopperApp');
    module('firebase.mock');
    module('storedListMod.mock');
    module('settingsMod.mock');
  });

  var $rootScope, $log;
  var mockSettingsMgr, mockStoredListMgrFactory, mockFBAuth;

  beforeEach(function () {

    var mockUrl = 'https://recipeshopper.firebaseio.com';

    module(function ($provide) {
      $provide.value('FIREBASE_URL', mockUrl);
    });

  });

  // instantiate service
  var Authentication;
  beforeEach(inject(function (_$rootScope_, _Authentication_, _$log_,
                              _settingsMgr_, _StoredListMgrFactory_) {
    Authentication = _Authentication_;
    $log = _$log_;
    $rootScope = _$rootScope_;
    mockSettingsMgr = _settingsMgr_;
    mockStoredListMgrFactory = _StoredListMgrFactory_;
    mockFBAuth = Authentication.$$fbAuthRefForSpying();
  }));

  it('should do something', function () {
    expect(!!Authentication).toBe(true);
  });

  it('should call $authWithPassword, when logging in', function () {
    var myUid = '';
    spyOn(mockFBAuth, '$authWithPassword').and.callThrough();

    Authentication.login({
      email: 'a@a.com',
      password: 'password'
    }).then(function (authData) {
      myUid = authData.uid;
    });
    $rootScope.$digest();

    expect(mockFBAuth.$authWithPassword).toHaveBeenCalled();
    expect(myUid).toEqual('123');
  });

  it('should call $createUser, when registering', function () {
    var myUid = '';
    spyOn(mockFBAuth, '$createUser').and.callThrough();

    Authentication.register({
      email: 'a@a.com',
      password: 'password'
    }).then(function (authData) {
      myUid = authData.uid;
    });
    $rootScope.$digest();

    expect(mockFBAuth.$createUser).toHaveBeenCalled();
    expect(myUid).toEqual('123');
  });

  it('should prepare StoredListMgr & call $unauth, when logging out', function () {
    spyOn(mockFBAuth, '$unauth').and.callThrough();
    spyOn(mockStoredListMgrFactory, 'prepareForLogout').and.callThrough();

    Authentication.logout();

    expect(mockStoredListMgrFactory.prepareForLogout).toHaveBeenCalled();
    expect(mockFBAuth.$unauth).toHaveBeenCalled();
  });

});

