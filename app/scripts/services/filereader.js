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
   })

  .directive('rsFileSelect', function(fileReader){
      return {
        link: function(scope, element, attrs) {
          // console.log('ngFileSelect'); 
          var imageSrcs = scope[attrs['imageSrcs']];

        var getFile = function (filesRead) {
            // console.log('getFile');
            // fileReader.moi();

            imageSrcs = [];  
            for(var i=0; i < filesRead.length; i++) {
              fileReader.readAsDataUrl(filesRead[i], scope)
                .then(function(result) {
                    var index = imageSrcs.length;
                    imageSrcs[index] = result;
                    // console.log('result: ' + result);
                    // console.log('imageSrcs['+ index + ']: ' + imageSrcs[index]);
                });
            }

        scope[attrs['imageSrcs']] = imageSrcs;
          };
          
          element.bind('change', function(e) {
            var filesRead = (e.srcElement || e.target).files;
            getFile(filesRead);
          });

        }
      };
    });

