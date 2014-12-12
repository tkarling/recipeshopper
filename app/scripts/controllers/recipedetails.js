'use strict';

/**
 * @ngdoc function
 * @name recipeshopperApp.controller:RecipeDetailsController
 * @description
 * # RecipeDetailsController
 * Controller of the recipeshopperApp
 */

angular.module('recipeshopperApp')
  .controller('RecipeDetailsController', ['$scope', 'fileReader', function ($scope, fileReader) {
    currentTab=2;
    // fileReader.moi();

    console.log('RecipeDetailsController' + fileReader);
    $scope.getFile = function () {
        $scope.progress = 0;
        console.log('getFile');
        // fileReader.moi();
        fileReader.readAsDataUrl($scope.file, $scope)
          .then(function(result) {
              $scope.imageSrc = result;
          });
    };

  }])
  .directive('rsFileSelect', function(){
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
