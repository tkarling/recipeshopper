(function () {
  'use strict';

  angular.module('firebase.mock', ['firebase']);

  angular.module('firebase.mock').factory('$firebaseAuth',
    function ($q, $firebaseUtils, $log) {
      var q = $q;

      var FirebaseAuthMock = function () {
      };

      FirebaseAuthMock.prototype.$authWithPassword = function (user) {
        //console.log('FirebaseAuthMock.prototype.$authWithPassword');
        var deferred = q.defer();
        deferred.resolve({uid: '123'});
        // hardcoding as this is called only in one test
        return deferred.promise;
      };

      FirebaseAuthMock.prototype.$createUser = function (user) {
        var deferred = q.defer();
        deferred.resolve({uid: '123'});
        // hardcoding as this is called only in one test
        return deferred.promise;
      };

      FirebaseAuthMock.prototype.$unauth = function () {
        var deferred = q.defer();
        return deferred.promise;
      };

      return function (ref) {
        //console.log('return function');
        return new FirebaseAuthMock;
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
        // console.log('mockFirebaseRef');
        return new mockFBObject;
      };

      //mockFirebaseRef.prototype.set = function(myKey, myData) {
      //   console.log('mockFirebaseRef.prototype.set');
      //  var deferred = q.defer();
      //  return deferred.promise;
      //};

      return mockFirebaseRef;

    });

})();
