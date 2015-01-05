'use strict';

describe('Service: Authentication', function () {

  var mockDependency, mockUrl;

  beforeEach(module('loginMod'));

  beforeEach(function () {

      mockDependency = {
          getSomething: function () {
              return 'mockReturnValue';
          }
      };

      mockUrl = 'mockUrl';


      module(function ($provide) {
          $provide.value('myDependency', mockDependency);
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


});

// describe('Service: Authentication', function () {

//   // load the service's module
//   // beforeEach(
//   //   module('mock.firebase');
//   //   module('firebase');
//   //   module('loginMod'););

//   // $firebase, FIREBASE_URL, $location, $rootScope, $timeout

//   // instantiate service
//   // var authentication, $firebase, FIREBASE_URL, $location, $rootScope, $timeout;
//   // beforeEach(function () {
//   //   module('mock.utils');
//   //   module('mock.firebase');
//   //   module('firebase');
//   //   module('loginMod');
//   //   inject(function (_authentication_, _$firebase_, _FIREBASE_URL_, _$location_, _$rootScope_, _$timeout_) {
//   //     authentication = _authentication_;
//   //     $firebase = _$firebase_;
//   //     FIREBASE_URL = _FIREBASE_URL_;
//   //     $location = _$location_;
//   //     $rootScope = _$rootScope_;
//   //     $timeout = _$timeout_;
//   //   })
//   // });

//   var authentication,
//       mockDependency;

//   beforeEach(module('loginMod'));

//   beforeEach(function () {

//       mockDependency = {
//           // logout: function () {
//           //     // return 'mockReturnValue';
//           // }
//           // Firebase: function (url) {
//           //     return 'mockReturnValue';
//           // },
//           moi: function () {
//               return 'mockReturnValue';
//           }
//       };

//       module(function ($provide) {
//           $provide.value('myDependency', mockDependency);
//           // $provide.value('FIREBASE_URL', mockDependency);
//       });


//   });

//   it('should do something', inject(function (authentication) {
//     // expect(!!authentication).toBe(true);
//     expect(authentication.moi()).toBe('mockReturnValue');
//   }));

//   // it('should do something', function () {
//   //   // expect(!!authentication).toBe(true);
//   //   expect(authentication.moi()).toBe('moi');
//   // });

// });
