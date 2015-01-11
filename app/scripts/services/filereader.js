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
     'LocalStorageModule', 
  ]);

 angular.module('fileReaderMod')
   .factory('fileReader', function ($q, $rootScope) {
      // Reads selected pic from disk

      // console.log('init fileReader');
      return {
 
        onLoad: function(reader, deferred) { 
            return function () {
                $rootScope.$apply(function () {
                    deferred.resolve(reader.result);
                });
            };
        },

        onError: function (reader, deferred) {  
            return function () {
                $rootScope.$apply(function () {
                    deferred.reject(reader.result);
                });
            };
        },

        onProgress: function(reader) { 
            return function (event) {
                $rootScope.$broadcast('fileProgress',
                    {
                        total: event.total,
                        loaded: event.loaded
                    });
            };
        },
   
        getReader: function(deferred) {
            var reader = new FileReader();
            reader.onload = this.onLoad(reader, deferred);
            reader.onerror = this.onError(reader, deferred);
            reader.onprogress = this.onProgress(reader);
            return reader;
        },
   
        readAsDataUrl: function (file) { 
            // console.log('readAsDataUrl');
            var deferred = $q.defer();
             
            var reader = this.getReader(deferred);         
            reader.readAsDataURL(file);
             
            return deferred.promise;
        },

        moi: function() {
          console.log('moi');

        }

      };
   })

   .factory('fileListReader', function (fileReader, localStorageService, $rootScope) {
    // Gets pics from local storage; updates pics in local storage to be selected files on disk
      var imageSrcs = [];

      if(imageSrcs.length === 0) {
         // read images from local storage
         var imageSrcsInStore = [];
          if(localStorageService) {
            // console.log('localStorageService exists');
            imageSrcsInStore = localStorageService.get('imageSrcs');
            // console.log('imageSrcsInStore', imageSrcsInStore);
          }
          imageSrcs = imageSrcsInStore || [];
          $rootScope.$broadcast('handleSlidesUpdated');
      }

      return {
        getImageSrcs: function () {
          return imageSrcs;
        }, 

        updateImageSrcs: function (filesRead) {
          imageSrcs = [];  
          for(var i=0; i < filesRead.length; i++) {
            fileReader.readAsDataUrl(filesRead[i])  
              .then(function(result) {
                  var index = imageSrcs.length;
                  imageSrcs[index] = result;
                  // console.log('result: ' + result);
                  // console.log('imageSrcs['+ index + ']: ' + imageSrcs[index]);
                  if(index === (filesRead.length-1)) {
                      // if this is the last file name, save images to local storage & broadcast change
                      if(localStorageService) {
                        localStorageService.set('imageSrcs', imageSrcs);
                        //console.log('files stored index:' + index);
                      }
                      $rootScope.$broadcast('handleSlidesUpdated');
                  }
              });
          }
        } 

      };
   })


  .directive('rsFileSelect', function(fileReader, fileListReader){
      return {
        link: function(scope, element, attrs) {
            // console.log('ngFileSelect'); 
            // var imageSrcs = scope[attrs['imageSrcs']];

            scope[attrs['imageSrcs']] = fileListReader.getImageSrcs();

            scope.$on('handleSlidesUpdated', function() {
              scope[attrs['imageSrcs']] = fileListReader.getImageSrcs();
            });

            element.bind('change', function(e) {
              var filesRead = (e.srcElement || e.target).files;
              fileListReader.updateImageSrcs(filesRead);
            });

        }
      };
    });

