'use strict';

/**
 * @ngdoc service
 * @name recipeshopperApp.fileReader
 * @description
 * # fileReader
 * Factory in the recipeshopperApp.
 */
 angular.module('recipeshopperApp')
   .factory('fileReader', function ($q) {
      // console.log('init fileReader');
      return {
 
        onLoad: function(reader, deferred, scope) {
            return function () {
                scope.$apply(function () {
                    deferred.resolve(reader.result);
                });
            };
        },

        onError: function (reader, deferred, scope) {
            return function () {
                scope.$apply(function () {
                    deferred.reject(reader.result);
                });
            };
        },

        onProgress: function(reader, scope) {
            return function (event) {
                scope.$broadcast('fileProgress',
                    {
                        total: event.total,
                        loaded: event.loaded
                    });
            };
        },
   
        getReader: function(deferred, scope) {
            var reader = new FileReader();
            reader.onload = this.onLoad(reader, deferred, scope);
            reader.onerror = this.onError(reader, deferred, scope);
            reader.onprogress = this.onProgress(reader, scope);
            return reader;
        },
   
        readAsDataUrl: function (file, scope) {
            // console.log('readAsDataUrl');
            var deferred = $q.defer();
             
            var reader = this.getReader(deferred, scope);         
            reader.readAsDataURL(file);
             
            return deferred.promise;
        },

        moi: function() {
          console.log('moi');

        }

      };
   });
