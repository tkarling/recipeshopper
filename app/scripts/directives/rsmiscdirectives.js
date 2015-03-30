'use strict';

/**
 * @ngdoc directive
 * @name recipeshopperApp.directive:rsTileRightDelete
 * @description
 * # rsTileRightDelete
 */
angular.module('recipeshopperApp')
  .directive('rsIcon', function () {
    return {
      template: '<md-icon md-svg-src="{{iconPath}}"></md-icon>',
      scope: {
        iconName: '@',
        iconGroup: '@'
      },   
      restrict: 'E',
      // replace: true,
      link: function postLink(scope, element, attrs) {
        // console.log('rsIcon called');
        scope.iconGroup = scope.iconGroup || 'action';
        scope.iconPath = '../bower_components/material-design-icons/' + scope.iconGroup + 
          '/svg/production/' + scope.iconName + '_24px.svg';
      }
    };
  })
  .directive('rsSideMenu', function () {
    return {
      templateUrl: 'views/sidemenu.html',
      restrict: 'E',
      replace: true,
      link: function postLink(scope, element, attrs) {
        // console.log('rsSideMenu called');
      }
    };
  })
  .directive('rsView', function ($location, $window, $mdSidenav) {
    return {
      templateUrl: 'views/apptitlebar.html',
      scope: {
        type: '@',
        title: '@',
        checkFn: '&',
        checkEnabled: '@',
        settingsButton: '@'
      }, 
      restrict: 'E',
      replace: true,
      transclude: true,
      link: function postLink(scope, element, attrs) {
        // scope.$watch('checkEnabled', function() {
        //   console.log('rsView scope.checkEnabled', scope.checkEnabled);
        //   console.log('rsView scope.buttonDisabled()', scope.buttonDisabled());
        // });
        scope.buttonDisabled = function () {
          return scope.checkEnabled == 'false';
        }

        scope.gotoPage = function(pagelink){
          $location.path(pagelink);
        }; // gotoPage

        scope.toggleLeft = function() {
          $mdSidenav('left').toggle();
        }; // toggleLeft

        scope.goBack = function () {
          $window.history.back();
        }; //goBack

        scope.saveAndGoBack = function(){
          scope.checkFn();
          $window.history.back();
        }; // gotoPage
      }
    };
  })
  .directive('rsSearchBar', function () {
    return {
      template: '<md-content layout="row" class="md-padding">' +
                    '<md-input-container flex>' +
                        '<label>{{placeholderText}}</label>' +
                        '<input ng-model="query">' +
                    '</md-input-container>' +
                    '<md-checkbox ng-if="showCheckbox" md-no-ink aria-label="Do Not Show Bought"' +
                      'ng-model="data.mySettings.doNotShowBoughtItems" ng-change="updateShowAll()"' +
                      'class="md-primary">' +
                    '</md-checkbox>' +
                    '<md-button id="addbutton" ng-click="gotoAddPage()"' +
                        'class="md-primary md-fab" aria-label="Go to Add Page">' +
                        '<rs-icon icon-name="ic_add" icon-group="content"></rs-icon>' +
                    '</md-button>' +
                '</md-content>',
      restrict: 'E',
      replace: true,
      link: function postLink(scope, element, attrs) {
        scope.showCheckbox = attrs['showCheckbox'] == "true";
        scope.placeholderText = attrs['placeholderText'] || 'Search';
          // console.log('rsSearchBar called');
      }
    };
  })
  .directive('rsOneRowAddItemForm', function () {
    return {
      template: '<form name="myform" ng-submit="addItem(data.model1, data.model2, data.modelNo)" novalidate>' +
                    '<div layout>' +
                      '<md-input-container flex="15" ng-if="numberField">' +
                          '<label>No.</label>' +
                          '<input type="number" ng-model="data.modelNo" ng-required="true">' +
                      '</md-input-container>' +
                      '<md-input-container flex>' +
                          '<label>{{field1}}</label>' +
                          '<input ng-model="data.model1" ng-required="true">' +
                      '</md-input-container>' +
                      '<md-input-container flex="30">' +
                          '<label>{{field2}}</label>' +
                          '<input ng-model="data.model2" ng-required="true">' +
                      '</md-input-container>' +
                      '<md-button type="submit" id="additembutton" ng-disabled="myform.$invalid"' +
                            'class="md-primary md-fab" aria-label="Add {{field1}}">' +
                            '<rs-icon icon-name="ic_note_add"></rs-icon>' +
                      '</md-button>' +
                    '</div>' +
                  '</form>',
      scope: {
        addItemFn: '&',
        numberField: '@',
        field1: '@',
        field2: '@'
      },            
      restrict: 'E',
      replace: true,
      link: function postLink(scope, element, attrs) {
          // console.log('rsOneRowAddForm called');
          // console.log('rsOneRowAddForm scope.numberField', scope.numberField);
          scope.data = {};
          scope.addItem = function(model1, model2, modelNo) {
            scope.addItemFn()(model1, model2, modelNo).then(function () {
              scope.data.model1 = ''; 
              scope.data.model2 = '';
              scope.data.modelNo = '';
              // var myFormController = element.find('form').eq(0).controller('form');
              // console.log('rsOneRowAddForm myFormController', myFormController);
              // myFormController.$setPristine(); 
            });
          } // scope.addItem
      }
    };
  })
  .directive('rsTileLeftCheck', function () {
    return {
      template: '<div class="md-tile-left">' + 
                  '<md-checkbox md-no-ink aria-label="{{ariaLabel}}" ng-model="data.cbvalue" ng-change="saveCBValue()"' +
                    'class="md-primary">' +
                  '</md-checkbox>' +
                '</div>',
      scope: {
        saveItemFn: '&',
        ariaLabel: '@'
      },
      restrict: 'E',
      replace: true,
      require:'ngModel',
      link: function(scope, element, attrs, ngModel) {
          // console.log('rsTileLeftCheck called');
          scope.data = {};

          ngModel.$render = function() {
            // console.log('ngModel.$modelValue', ngModel.$modelValue);
            scope.data.cbvalue = ngModel.$modelValue;
          }

          scope.saveCBValue = function() {
            ngModel.$setViewValue(scope.data.cbvalue);
            scope.saveItemFn();
          }
      }
    };
  })
  .directive('rsTileContent', function () {
    return {
      template: '<div class="md-tile-content" ng-click="clickFn()">' +
                  '<h3><span><strong ng-transclude></strong></span></h3>' +
                  '<h4><span class="md-accent-text">{{accentedText}}{{divider}}</span><span>{{additionalText | lowercase}}</span></h4>' +
                '</div>',
      scope: {
        clickFn: '&',
        accentedText: '@',
        additionalText: '@'
      },          
      restrict: 'E',
      replace: true,
      transclude: true,
      link: function postLink(scope, element, attrs) {
        scope.divider = scope.additionalText ? '; ' : '';
        // console.log('rsTileContent called');
      }
    };
  })
  .directive('rsTileRightDeleteSub', function () {
    return {
      template: '<div class="md-tile-right md-padding">' + 
                  '<md-button id="deleteitembutton" class="md-warn md-raised md-hue-2"' +
                    'ng-click="deleteFn()" aria-label="Delete">' +
                    '<rs-icon icon-name="ic_delete"></rs-icon>' +
                    '</md-icon>' +
                  '</md-button>' +
                '</div>',
      scope: {
        deleteFn: '&'
      }, 
      restrict: 'E',
      replace: true,
      link: function postLink(scope, element, attrs) {
        // console.log('rsTileRightDelete called');
      }
    };
  })
  .directive('rsTileRightDelete', function () {
    return {
      template: '<span><rs-tile-right-delete-sub delete-fn="deleteFn()" hide-sm show-gt-sm>' + 
                '</rs-tile-right-delete-sub>' +
                '<rs-tile-right-delete-sub delete-fn="deleteFn()" hide-gt-sm ' +
                    'show-sm ng-show="showActions">' +
                '</rs-tile-right-delete-sub></span>',
      scope: {
        deleteFn: '&',
        showActions: '@'
      }, 
      restrict: 'E',
      replace: true,
      link: function postLink(scope, element, attrs) {
        // console.log('rsTileRightDelete called');
        // console.log('rsTileRightDelete scope.showActions', scope.showActions);
      }
    };
  });
