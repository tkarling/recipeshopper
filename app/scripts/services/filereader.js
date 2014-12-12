'use strict';

(function (module) {
     
    var fileReader = function ($q, $log) {
 
        var onLoad = function(reader, deferred, scope) {
            return function () {
                scope.$apply(function () {
                    deferred.resolve(reader.result);
                });
            };
        };
 
        var onError = function (reader, deferred, scope) {
            return function () {
                scope.$apply(function () {
                    deferred.reject(reader.result);
                });
            };
        };
 
        var onProgress = function(reader, scope) {
            return function (event) {
                scope.$broadcast("fileProgress",
                    {
                        total: event.total,
                        loaded: event.loaded
                    });
            };
        };
 
        var getReader = function(deferred, scope) {
            var reader = new FileReader();
            reader.onload = onLoad(reader, deferred, scope);
            reader.onerror = onError(reader, deferred, scope);
            reader.onprogress = onProgress(reader, scope);
            return reader;
        };
 
        var readAsDataURL = function (file, scope) {
            var deferred = $q.defer();
             
            var reader = getReader(deferred, scope);         
            reader.readAsDataURL(file);
             
            return deferred.promise;
        };
 
        return {
            readAsDataUrl: readAsDataURL  
        };
    };
 
    module.factory("fileReader",
                   ["$q", "$log", fileReader]);
 
}(angular.module("recipeshopperApp")));

/**
 * @ngdoc service
 * @name recipeshopperApp.fileReader
 * @description
 * # fileReader
 * Factory in the recipeshopperApp.
 */
// angular.module('recipeshopperApp')
//   .factory('fileReader', function ($q, $log) {
//     var fileReader = {};

//     fileReader.onLoad = function(reader, deferred, scope) {
//         return function () {
//             scope.$apply(function () {
//                 deferred.resolve(reader.result);
//             });
//         };
//     };

//     fileReader.onError = function (reader, deferred, scope) {
//         return function () {
//             scope.$apply(function () {
//                 deferred.reject(reader.result);
//             });
//         };
//     };

//     fileReader.onProgress = function(reader, scope) {
//         return function (event) {
//             scope.$broadcast('fileProgress',
//                 {
//                     total: event.total,
//                     loaded: event.loaded
//                 });
//         };
//     };

//     fileReader.getReader = function(deferred, scope) {
//         // var reader = new FileReader();
//         reader.onload = onLoad(reader, deferred, scope);
//         reader.onerror = onError(reader, deferred, scope);
//         reader.onprogress = onProgress(reader, scope);
//         return reader;
//     };

//     fileReader.readAsDataURL = function (file, scope) {
//         var deferred = $q.defer();
         
//         var reader = getReader(deferred, scope);         
//         reader.readAsDataURL(file);
         
//         return deferred.promise;
//     };

//     return fileReader;
//     // return {
//     //     readAsDataUrl: readAsDataURL  
//     // };

//   });
