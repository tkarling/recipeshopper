'use strict';

/**
 * @ngdoc function
 * @name recipeshopperApp.controller:RecipeDetailsController
 * @description
 * # RecipeDetailsController
 * Controller of the recipeshopperApp
 */

angular.module('recipeshopperApp')
  .controller('RecipeDetailsController', ['$scope', function ($scope) { // fileReader
    currentTab=2;
    // fileReader.moi();

    // console.log('RecipeDetailsController' + fileReader);
    // $scope.getFile = function () {
    //     $scope.progress = 0;
    //     console.log('getFile');
    //     fileReader.moi();
    //     fileReader.readAsDataUrl($scope.file, $scope)
    //       .then(function(result) {
    //           $scope.imageSrc = result;
    //       });
    // };

  }])
  .directive('rsFileSelect', function(fileReader){
	  return {
	    link: function(scope, element) {
	      console.log('ngFileSelect');	
	      // var fileRead = {};

		  scope.getFile = function (fileRead, filesRead) {
	        // scope.progress = 0;
	        console.log('getFile');
	        fileReader.moi();

	        fileReader.readAsDataUrl(fileRead, scope)
	          .then(function(result) {
	              scope.imageSrc = result;
	              console.log('scope.imageSrc:' + scope.imageSrc);
	          });
	        
	        var imageSrcs = [];  
	        for(var i=0; i < filesRead.length; i++) {
		        fileReader.readAsDataUrl(filesRead[i], scope)
		          .then(function(result) {
		          	  var index = imageSrcs.length;
		              imageSrcs[index] = result;
		              // console.log('result: ' + result);
		              console.log('imageSrcs['+ index + ']: ' + imageSrcs[index]);
		          });
	        }
	        
	      };
	      
	      element.bind('change', function(e) {
	        // scope.file = (e.srcElement || e.target).files[0];
	        var fileRead = (e.srcElement || e.target).files[0];
	        console.log('file: '+ fileRead.name);	
	        var filesRead = (e.srcElement || e.target).files;
	        scope.getFile(fileRead, filesRead);
	      });



	    }
	  };
  });
