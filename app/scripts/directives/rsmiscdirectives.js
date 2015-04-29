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
      template: '<md-icon ng-class="classColor" style="color:{{iconColor}}" md-svg-src="{{iconPath}}"></md-icon>',
      scope: {
        iconName: '@',
        iconGroup: '@',
        iconColor: '@',
        classColor: '@'
      },
      restrict: 'E',
      // replace: true,
      link: function postLink(scope, element, attrs) {
        // console.log('rsIcon called');
        scope.iconGroup = scope.iconGroup || 'action';
        if(!scope.classColor) {
          scope.iconColor = scope.iconColor || 'white';
        }
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
  .directive('rsView', function ($log, $location, $window, $mdSidenav, $mdMedia) {
    return {
      templateUrl: 'views/apptitlebar.html',
      scope: {
        type: '@',
        title: '&',
        checkFn: '&',
        checkEnabled: '@',
        settingsButton: '@',
        tabIndex: '@',
        gotoAddPageFn: '&'
      },
      restrict: 'E',
      replace: true,
      transclude: true,
      link: function postLink(scope, element, attrs) {
        scope.buttonDisabled = function () {
          return scope.checkEnabled == 'false';
        }; // buttonDisabled

        scope.gotoPage = function(pagelink){
          $location.path(pagelink);
        }; // gotoPage

        scope.toggleLeft = function() {
          $mdSidenav('left').toggle();
        }; // toggleLeft

        scope.goBack = function () {
          var myUrl = $location.url();
          // console.log('rsView: myUrl', myUrl);
          if(myUrl.indexOf("ListId") > -1) {
            var strs = myUrl.split("/");;
            // console.log('rsView: gotoAddPage strs: ', strs);
            var pagelink='/recipedetails/' + strs[3] + '/Tab/1';
            // console.log('rsView: gotorecipedetails pagelink: ', pagelink);
            $location.path(pagelink);
          } else if (myUrl.indexOf("recipedetails") > -1) {
            var pagelink='/recipelist';
            // console.log('rsView: gotorecipelist pagelink: ', pagelink);
            $location.path(pagelink);
          } else {
            $window.history.back();
          }

        }; //goBack

        scope.saveAndGoBack = function(){
          scope.checkFn();
          scope.goBack();
        }; // gotoPage

        scope.titleString = scope.title();

        scope.$watch(function() { return $mdMedia('sm') && (scope.tabIndex); }, function(small) {
          scope.isSmallWindow = $mdMedia('sm');
          scope.addButtonVisible = scope.isSmallWindow &&
          ((scope.type=='list') || (scope.tabIndex == 1));
          //$log.debug('rsView: onListTab, addButtonVisible', scope.tabIndex, scope.addButtonVisible );
        }); // $watch

        scope.windowHeightStyle = 'height: 1px';
        scope.$watch(function () { return $mdMedia(scope.windowHeightStyle); }, function() {
          scope.windowHeightStyle = 'height: ' + $window.innerHeight + 'px';
          scope.contentHeightStyle = 'max-height: ' + ($window.innerHeight - 70) + 'px';
          //$log.debug('rsView: contentHeightStyle', scope.contentHeightStyle);
        }); // $watch
      }
    };
  })
  .directive('rsSearchBar', function () {
    return {
      template: '<div layout="row">' +
                    '<md-checkbox ng-if="showCheckbox" md-no-ink aria-label="Do Not Show Bought"' +
                    'ng-model="data.mySettings.doNotShowBoughtItems" ng-change="updateShowAll()"' +
                    'class="md-primary" style="margin:0px 21px">' +
                    '</md-checkbox>' +
                    '<md-input-container ng-if="placeholderText" flex>' +
                        '<label>{{placeholderText}}</label>' +
                        '<input ng-model="data.query">' +
                    '</md-input-container>' +
                    '<div ng-if="! placeholderText" flex></div>' +
                    '<md-button hide-sm id="addbutton" ng-click="gotoAddPage(listId, listName)"' +
                        'class="md-primary md-fab" aria-label="Go to Add Page">' +
                        '<rs-icon icon-name="ic_add" icon-group="content"></rs-icon>' +
                    '</md-button>' +
                '</div>',
      restrict: 'E',
      replace: true,
      link: function postLink(scope, element, attrs) {
        scope.showCheckbox = attrs['showCheckbox'] == "true";
        scope.placeholderText = attrs['placeholderText'] || '';
        scope.listId = attrs['listId'];
        scope.listName = attrs['listName'];
      }
    };
  })
  // following not in use left here for model in case needed
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
  .directive('rsListItem', function ($log, $mdMedia) {
    return {
      templateUrl: 'views/baselistitem.html',
      scope: {
        windowHeight: '&',
        windowWidth: '&',
        listItem: '=',
        checkboxField: '@',
        checkboxFn: '&',
        accentedText: '@',
        additionalText: '@',
        clickFn: '&',
        hasNote: '@',
        deleteFn: '&'
      },
      restrict: 'E',
      replace: true,
      transclude: true,
      link: function postLink(scope, element, attrs) {
        scope.$watch(function() { return $mdMedia('sm'); }, function(small) {
          scope.isSmallWindow = $mdMedia('sm');
        });
      }
    };
  })
  .directive('rsTileContent', function () {
    return {
      template: '<div class="md-list-item-text" ng-click="clickFn()">' +
                  '<h3><span><div ng-transclude></div></span></h3>' +
                  '<p><span style="color:darkcyan;">{{accentedText}}{{divider}}</span><span>{{additionalText | lowercase}}</span></p>' +
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
  });

