'use strict';

describe('Controller: LoginCtrl', function () {

  // load the controller's module
  beforeEach(module('loginMod'));

  var LoginCtrl,scope, mockLog, mockAuthentication, mockSettingsMgr;
  var q, deferred;

  beforeEach(function () {
      mockAuthentication = {
        login: function (user, authHandler) {
              deferred = q.defer();
              return deferred.promise;
        }, //login

        register: function (user, authHandler) {
              deferred = q.defer();
              return deferred.promise;
        }, //register

        logout: function() {
        }, // logout

        userEmail: function () {
          return 'moi@hei.com';
        }, // userEmail

        userLoggedIn: function () {
          return true;
        } // userLoggedIn
      };

      mockSettingsMgr = {
        getCurrentUser: function () {
          return '';
        },
        getSetting: function (setting) {
          return '';
        }
      };
  });

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _$log_, _$location_, _$q_) {
      q= _$q_;
      mockLog = _$log_;
      scope = $rootScope.$new();
      LoginCtrl = $controller('LoginCtrl', {
        $scope: scope,
        $rootScope: $rootScope,
        $log: mockLog,
        $location: _$location_, 
        Authentication: mockAuthentication,
        settingsMgr: mockSettingsMgr
      });
  }));

  it('a test should pass', function () {
      expect(true).toEqual(true);
  });

  it('should call Authentication.login, when login called', function () {
      spyOn(mockAuthentication, 'login');
      scope.login();

      // deferred.resolve(status);
      // scope.$root.$digest();

      expect(mockAuthentication.login).toHaveBeenCalled();
  });

  it('should call Authentication.logout, when logout called', function () {
      spyOn(mockAuthentication, 'logout');
      scope.logout();
      expect(mockAuthentication.logout).toHaveBeenCalled();
  });

  it('should call Authentication.register, when register called', function () {
      spyOn(mockAuthentication, 'register');
      scope.register();
      expect(mockAuthentication.register).toHaveBeenCalled();
  });

});
