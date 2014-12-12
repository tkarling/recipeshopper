'use strict';

/**
 * @ngdoc function
 * @name recipeshopperApp.controller:RecipeDetailsController
 * @description
 * # RecipeDetailsController
 * Controller of the recipeshopperApp
 */

angular.module('recipeshopperApp')
  .controller('RecipeDetailsController', ['$scope', function ($scope) { 
    currentTab=2;
  }])

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
