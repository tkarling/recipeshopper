'use strict';

/**
 * @ngdoc service
 * @name recipeshopperApp.fileReader
 * @description
 * # fileReader
 * Factory in the fileReaderMod.
 */
  angular
  .module('fileReaderMod', [
  ]);

 angular.module('fileReaderMod')
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

  .directive('rsFileSelect', function(fileReader, localStorageService){
      return {
        link: function(scope, element, attrs) {
            // console.log('ngFileSelect'); 
            var imageSrcs = scope[attrs['imageSrcs']];

            var imageSrcsInStore = [];
            if(localStorageService) {
              // console.log('localStorageService exists');
              imageSrcsInStore = localStorageService.get('imageSrcs');
              // console.log('imageSrcsInStore', imageSrcsInStore);
            }
            imageSrcs = imageSrcsInStore || [];

            //save images to returning attr after reading from local storage
            // console.log('scope.imageSrcs', imageSrcs);
            scope[attrs['imageSrcs']] = imageSrcs;
            // console.log('Refresh: After: scope[attrs ' + scope[attrs['imageSrcs']].length);

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
                        if(index === (filesRead.length-1)) {
                            // if this is the last file name, save images to local storage & returning attr
                            scope[attrs['imageSrcs']] = imageSrcs;
                            if(localStorageService) {
                              localStorageService.set('imageSrcs', imageSrcs);
                            }
                        }
                    });
                }

              };
              
            element.bind('change', function(e) {
              var filesRead = (e.srcElement || e.target).files;
              getFile(filesRead);
            });

        }
      };
    });

