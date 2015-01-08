'use strict';

describe('Service: Authentication', function () {

  var mockFirebase, mockUrl;

  beforeEach(module('authenticationMod'));

  beforeEach(function () {

      mockFirebase = {
          getSomething: function () {
              return 'mockReturnValue';
          }
      };

      mockUrl = 'mockUrl';


      module(function ($provide) {
          $provide.value('$firebase', mockFirebase);
          $provide.value('FIREBASE_URL', mockUrl);
      });

  });

  // beforeEach(inject(function(_$log_){
  //     mockLog = _$log_;
  // }));

 it('should return value from mock dependency', inject(function (Authentication) {
      expect(Authentication.useDependency()).toBe('mockReturnValue');
  }));

 it('should write in log', inject(function (Authentication, $log) {
      Authentication.useDependency();
      expect($log.log.logs.length).toEqual(1);
  }));

 it('should write in debug log', inject(function (Authentication, $log) {
      Authentication.useDependency();
      expect($log.debug.logs.length).toEqual(1);
  }));

 it('should write in debug log when login is called', inject(function (Authentication, $log) {
      var user = {};
      user.email = 'moi@hei.com';
      Authentication.login(user, null);
      expect($log.debug.logs.length).toEqual(1);
      // expect($log.debug.logs[0]).toEqual('moi@hei.com');
  }));

});

