'use strict';

describe('Service: settingsMgr', function () {

  // load the service's module
    beforeEach(module('settingsMod'));
    beforeEach(module('settingsMod'));

    var mockUrl, mockFirebaseRef, mockFirebaseDataRef, mockFirebase;
    var q, deferred, mockLog;

    // var q;
    // beforeEach(inject(function (_$q_) {
    //   q= _$q_;
    // }));

    beforeEach(module(function($provide) {
      $provide.factory('mockFirebaseFactory', function($q) {
        // var $loaded = jasmine.createSpy('$loaded').andCallFake(function() {
        //   var items = [];
     
        //   if (passPromise) {
        //     return $q.when(items);
        //   }
        //   else {
        //     return $q.reject('something went wrong');
        //   }
        // });
        var $loaded = function() {
          var items = [];
     
          if (passPromise) {
            return $q.when(items);
          }
          else {
            return $q.reject('something went wrong');
          }
        };
     
        return {
          $loaded: $loaded
        };
      });
    }));


    beforeEach(function() {
            mockUrl = 'mockUrl';

            mockFirebaseDataRef = {
              $asObject: function () {
                console.log('$asObject');
                return mockFirebase;
              } 
            };

            mockFirebaseRef = function(item) {
              console.log('mockFirebaseRef');
              return mockFirebaseDataRef;
            };

            // mockFirebase = {
            //   $save: function () {
            //      deferred = q.defer();
            //      return deferred.promise;
            //   },
            //   $loaded: function () {
            //      deferred = q.defer();
            //      return deferred.promise;
            //   } 
            // };

            mockLog = {
              debug: function(p, p1, p2, p3, p4, p5) {
                // console.log(p, p1, p2, p3, p4?p4:"", p5?p5:"");
              }
            };

            // q = $q;
            // q = {
            //   defer: function() {
            //     return {};
            //   }
            // }

            module(function ($provide) {
                $provide.value('$firebase', mockFirebaseRef);
                $provide.value('FIREBASE_URL', mockUrl);
                $provide.value('$log', mockLog);
            });
    });

    // instantiate service
    var settingsMgr;
    beforeEach(inject(function (_settingsMgr_, mockFirebaseFactory) { //_$q_, _$log_, 
      // q = _$q_;
      // mockLog = _$log_;
      // module(function ($provide) {
      //         $provide.value('$log', mockLog);
      //         $provide.value('$firebase', mockFirebaseRef);
      //         $provide.value('FIREBASE_URL', mockUrl);
      //     });
      // mockFirebase = mockFirebaseFactory;
      // console.log('mockFirebase set');
      settingsMgr = _settingsMgr_; //(mockLog, mockFirebaseRef, mockUrl)
    }));

    // it('should do something', function () {
    //   expect(!!settingsMgr).toBe(true);
    // });

  // it('should set default settings', function () {
  //   expect(settingsMgr.getSetting('shoppingListSortOrder')).toEqual('aisle');
  //   expect(settingsMgr.getSetting('recipeSortOrder')).toEqual('recipename');
  // });

  // it('should set settings', function () {
  //   settingsMgr.setSetting('shoppingListSortOrder', 'recipe');
  //   expect(settingsMgr.getSetting('shoppingListSortOrder')).toEqual('recipe');
  // });

});
