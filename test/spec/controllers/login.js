'use strict';

describe('Controller: LoginCtrl', function () {

  // load the controller's module
  beforeEach(module('loginMod'));

  var LoginCtrl,scope, mockLog, authenticationService;
  var q, deferred;

  beforeEach(function () {
      authenticationService = {
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
  });

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _$log_, _$location_, _$q_) {
      q= _$q_;
      mockLog = _$log_;
      scope = $rootScope.$new();
      LoginCtrl = $controller('LoginCtrl', {
        $scope: scope,
        $log: mockLog,
        $location: _$location_, 
        Authentication: authenticationService
      });
  }));

  it('a test should pass', function () {
      expect(true).toEqual(true);
  });

  it('should call Authentication.login, when login called', function () {
      spyOn(authenticationService, 'login');
      scope.login();

      // deferred.resolve(status);
      // scope.$root.$digest();

      expect(authenticationService.login).toHaveBeenCalled();
  });

  it('should call Authentication.logout, when logout called', function () {
      spyOn(authenticationService, 'logout');
      scope.logout();
      expect(authenticationService.logout).toHaveBeenCalled();
  });

  it('should call Authentication.register, when register called', function () {
      spyOn(authenticationService, 'register');
      scope.register();
      expect(authenticationService.register).toHaveBeenCalled();
  });

});
