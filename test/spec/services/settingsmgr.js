'use strict';

describe('Service: settingsMgr', function() {

  // load the service's module
  beforeEach(function() {
    module('settingsMod');
    module('firebase.mock');
  });

  var mockFBObject;
  var $rootScope, $log, $http, backend;

  beforeEach(function() {
    var mockUrl = 'https://recipeshopper.firebaseio.com';

    module(function($provide) {
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
  beforeEach(inject(function(_$rootScope_, _settingsMgr_, _$log_, _$http_) {
    settingsMgr = _settingsMgr_;
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
        // test
        var mySettings = settingsMgr.getSettings();
        expect(mySettings.shoppingListSortOrder).toEqual('aisle');
        expect(mySettings.recipeSortOrder).toEqual('recipename');
        expect(mySettings.$save).not.toBeDefined();
      });

      it('should add user', function() {
        // setup
        expect(settingsMgr.getSettings().$save).not.toBeDefined();
        expect($log.log.logs.length).toEqual(0);

        // act
        var userUid = 'testUid';
        var user = {
          firstname: 'Tuija', lastname: 'Karling'
        };
        settingsMgr.addUser(userUid, user);
        $rootScope.$digest();

        // test
        expect(settingsMgr.getSettings().$save).not.toBeDefined();
        // $save still undefined as it is set only after content loaded
        expect($log.log.logs.length).toEqual(2);
        var urlInLog = $log.log.logs[0][0];
        expect(urlInLog).toEqual('https://recipeshopper.firebaseio.com/users/testUid');

        var userInfoInLog = $log.log.logs[1][0];
        expect(userInfoInLog.firstname).toEqual('Tuija');
        expect(userInfoInLog.lastname).toEqual('Karling');
        expect(userInfoInLog.shoppingListSortOrder).toEqual('aisle');
      });

      it('should set and get current user', function() {
        // setup
        expect($log.log.logs.length).toEqual(0);
        expect(settingsMgr.getCurrentUser()).toEqual('');
        expect(settingsMgr.getSettings().$save).not.toBeDefined();

        // act
        var userUid = 'testUid';
        settingsMgr.setCurrentUser(userUid);
        $rootScope.$digest();

        // test
        expect($log.log.logs.length).toEqual(1);
        var urlInLog = $log.log.logs[0][0];
        expect(urlInLog).toEqual('https://recipeshopper.firebaseio.com/users/' + userUid);
        expect(settingsMgr.getCurrentUser()).toEqual(userUid);
        expect(settingsMgr.getSettings().$save).toBeDefined();
      });

  });

  describe('Service: settingsMgr: after current user is set', function() {

      var userUid = 'testUid';
      beforeEach(function () {
        settingsMgr.setCurrentUser(userUid);
        $log.reset(); // needed as above writes to $log.log
        $rootScope.$digest();

        expect(settingsMgr.getCurrentUser()).toEqual(userUid);
        expect(settingsMgr.getSettings().$save).toBeDefined();

      });

      it('should set and save settings', function () {
        var mySettings = settingsMgr.getSettings();
        // actual settings content stays undefined till loading finishes
        spyOn(mySettings, '$save').and.callThrough();
        expect(settingsMgr.getSettings().shoppingListSortOrder).not.toBeDefined();

        var shoppingListSortOrder = 'recipe';
        mySettings.shoppingListSortOrder = shoppingListSortOrder;
        settingsMgr.saveSettings();
        $rootScope.$digest();

        expect(mySettings.$save).toHaveBeenCalled();
        expect(mySettings.shoppingListSortOrder).toEqual(shoppingListSortOrder);
      });


      it("should set user to ''(to be called before logout)", function() {
        // setup
        var mySettings = settingsMgr.getSettings();
        spyOn(mySettings, '$loaded').and.callThrough();
        spyOn(mySettings, '$destroy').and.callThrough();
        expect(settingsMgr.getCurrentUser()).toEqual(userUid);

        // act
        settingsMgr.setCurrentUser('');
        $rootScope.$digest();

        // test all is reset
        expect(mySettings.$loaded).not.toHaveBeenCalled();
        expect(mySettings.$destroy).toHaveBeenCalled();
        expect(settingsMgr.getCurrentUser()).toEqual('');
      });

    it('should not set current user, if it is already set w same name', function() {
      // setup
      var mySettings = settingsMgr.getSettings();
      expect($log.log.logs.length).toEqual(0);
      spyOn(mySettings, '$loaded').and.callThrough();
      spyOn(mySettings, '$destroy').and.callThrough();
      expect(settingsMgr.getCurrentUser()).toEqual(userUid);
      expect(mySettings.$save).toBeDefined();

      // act
      settingsMgr.setCurrentUser(userUid);
      $rootScope.$digest();

      // test
      expect($log.log.logs.length).toEqual(0);
      expect(mySettings.$loaded).not.toHaveBeenCalled();
      expect(mySettings.$destroy).not.toHaveBeenCalled();
      expect(settingsMgr.getCurrentUser()).toEqual(userUid);
      expect(mySettings.$save).toBeDefined();
    });


  });

});
