(function () {
  'use strict';

  angular.module('firebase.mock', []);

  angular.module('firebase.mock').factory('$firebaseAuth',
    function ($q, $firebaseUtils, $log) {
      var q = $q;

      var mockFBAuth = function () {
      };

      mockFBAuth.prototype.$authWithPassword = function (user) {
        //console.log('FirebaseAuthMock.prototype.$authWithPassword');
        var deferred = q.defer();
        deferred.resolve({uid: '123'});
        // hardcoding as this is called only in one test
        return deferred.promise;
      };

      mockFBAuth.prototype.$createUser = function (user) {
        var deferred = q.defer();
        deferred.resolve({uid: '123'});
        // hardcoding as this is called only in one test
        return deferred.promise;
      };

      mockFBAuth.prototype.$unauth = function () {
        var deferred = q.defer();
        return deferred.promise;
      };

      return function (ref) {
        //console.log('return function');
        return new mockFBAuth;
      };
    });

  angular.module('firebase.mock').factory('$firebaseObject',
    function ($parse, $firebaseUtils, $log, $q) {
      var q = $q;

      var mockFBObject = function () {
      };

      mockFBObject.prototype.$loaded = function () {
        var deferred = q.defer();
        return deferred.promise;
      };

      mockFBObject.prototype.$save = function () {
        var deferred = q.defer();
        return deferred.promise;
      };

      mockFBObject.prototype.$destroy = function () {
        var deferred = q.defer();
        return deferred.promise;
      };

      var mockFirebaseRef = function (item) {
        // console.log('mockFirebaseRef Object');
        return new mockFBObject;
      };

      //mockFirebaseRef.prototype.set = function(myKey, myData) {
      //   console.log('mockFirebaseRef.prototype.set');
      //  var deferred = q.defer();
      //  return deferred.promise;
      //};

      return mockFirebaseRef;

    });

  angular.module('firebase.mock').factory('$firebaseArray',
    function ($log, $firebaseUtils, $q) {
      var q = $q;

      var mockFBArray = function () {
      };

      mockFBArray.prototype.$loaded = function () {
        var deferred = q.defer();
        deferred.resolve([1,2,3]);
        return deferred.promise;
      };

      mockFBArray.prototype.$add = function (item) {
        var deferred = q.defer();
        return deferred.promise;
      };

      mockFBArray.prototype.$remove = function (item) {
        var deferred = q.defer();
        return deferred.promise;
      };

      mockFBArray.prototype.$save = function (item) {
        var deferred = q.defer();
        return deferred.promise;
      };

      var mockFirebaseRef = function (item) {
        // console.log('mockFirebaseRef Array');
        return new mockFBArray;
      };

      return mockFirebaseRef;

    });
})();
