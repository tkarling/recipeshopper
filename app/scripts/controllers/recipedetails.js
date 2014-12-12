'use strict';

/**
 * @ngdoc function
 * @name recipeshopperApp.controller:RecipeDetailsController
 * @description
 * # RecipeDetailsController
 * Controller of the recipeshopperApp
 */

angular.module('recipeshopperApp')
  .controller('RecipeDetailsController', function ($scope, fileReader) {
    currentTab=2;

    console.log('RecipeDetailsController' + fileReader);
    $scope.getFile = function () {
        $scope.progress = 0;
        console.log('getFile');
        fileReader.readAsDataUrl($scope.file, $scope)
          .then(function(result) {
              $scope.imageSrc = result;
          });
    };

  })
  .directive('ngFileSelect', function(){
	  return {
	    link: function($scope, el) {
	      console.log('ngFileSelect');	
	      
	      el.bind('change', function(e) {
	        $scope.file = (e.srcElement || e.target).files[0];
	        console.log('file: '+ $scope.file);	
	        $scope.getFile();
	      });
	    }
	  };
  });
