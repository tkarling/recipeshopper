'use strict';
var LoginAndUtils = require('./loginandutils.js');
var utils = new LoginAndUtils();

var ListPage = function () {
    this.get = function()  {
      browser.get('http://localhost:9005/#/main');
    };

    var gotoAddItemPageButton = element(by.id('addbutton'));
    this.gotoAddItemPage = function () {
      gotoAddItemPageButton.click();
    }; // gotoAddItemPageButton

    this.gotoAndExpectPage = function(pageId) {
      switch(pageId) {
        case 'addProductFromSL':
        case 'addProductFromFavorites':
        case 'addRecipe':
          this.gotoAddItemPage();
          break;

        default:
          console.log('ListPage: gotoAndExpectPage unnown page', pageId);
      }
      utils.expectPage(pageId);
    }; // gotoAndExpectPage


    var myList = element.all(by.repeater('item in data.myItems'));

    this.itemCount = function () {
      return myList.count();
    }; // itemCount

    this.expectItemCount = function(expectedCount) {
      expect(myList.count()).toEqual(expectedCount);
    }; // expectItemCount

    var getListItemsWithField = function (fieldName, content) {
      fieldName = fieldName || 'item.product';
      // console.log('getListItemsWithField called');
      return myList.filter(function (elem, index) {
        // console.log('in filter');
        return elem.element(by.binding(fieldName)).getText().then(function (text) {
          // console.log('text: ', text);
          return text == content;
        });
      });
    }; // getListItemsWithField

    this.CHECKED = true;
    this.UNCHECKED = false;

    var getCheckBox = function(item) {
      return item.element(by.tagName('md-checkbox'));
    }; // getCheckBox

    var getCheckBoxClass = function(item) {
        return getCheckBox(item).getAttribute('class');
    }; // getCheckBoxClass

    var clickCheckBox = function (item) {
      return getCheckBox(item).click();
    }; // clickCheckBox

    var expectCheckBoxToBe = function(self, item, expCheckStatus) {
        if(expCheckStatus == self.CHECKED) {
            expect(getCheckBoxClass(item)).toContain('md-checked');
        } else {
            expect(getCheckBoxClass(item)).not.toContain('md-checked');
        }
    }; // expectCheckBoxToBe

    this.findProductAndExpectCheckBoxToBe = function(firstRowText, expCheckStatus, fieldName) {
        var self = this;
        getListItemsWithField(fieldName, firstRowText).then(function(items) {
            if(items.length != 1) {
                console.log('NOTE: findItemAndExpectCheckBoxNotToBeChecked' + firstRowText + ' items.length is: ', items.length);
            }
            var selectedItem = items[0];
            expectCheckBoxToBe(self, selectedItem, expCheckStatus);
        });
    }; // findProductAndExpectCheckBoxToBe

    this.findProductClickCheckboxAndExpectCheckBoxToBe = function(firstRowText, expCheckStatus, fieldName) {
        var self = this;
        getListItemsWithField(fieldName, firstRowText).then(function(items) {
            if(items.length != 1) {
                console.log('NOTE: findItemAndCheckCheckboxAndExpectToBeChecked:' + firstRowText + ' items.length is: ', items.length);
            }
            var selectedItem = items[0];
            expectCheckBoxToBe(self, selectedItem, ! expCheckStatus);
            clickCheckBox(selectedItem);
            utils.sleep(2);
            expectCheckBoxToBe(self, selectedItem, expCheckStatus);
        });
    }; // findProductClickCheckboxAndExpectCheckBoxToBe

    var deleteItem = function(item) {
        console.log('deleteItem called');
        item.element(by.id('deleteitembutton')).click();
    }; // deleteItem

    this.findAndDeleteProduct = function (firstRowText, fieldName) {
        getListItemsWithField(fieldName, firstRowText).then(function(items) {
            // check content of new item on favorites page
            if(items.length != 1) {
                console.log('NOTE: findAndDeleteProduct' + firstRowText + ' items.length is: ', items.length);
            }
            deleteItem(items[0]);
        });
    }; // findAndDeleteProduct

    this.findAndDeleteRecipe = function(firstRowText) {
      this.findAndDeleteProduct(firstRowText, 'item.recipename');
    }; // findAndDeleteRecipe

    var getField = function(item, field) {
      return item.element(by.binding(field)).getText();
    };

    this.findProductAndExpectContent = function(checkboxStatus, firstRowText, accentedText, additionalText, fieldName) {
      var self = this;
      getListItemsWithField(fieldName, firstRowText).then(function(items) {
        // check content of new item on favorites page
        if(items.length != 1) {
          console.log('NOTE: findProductAndExpectContent' + firstRowText + ' items.length is: ', items.length);
        }
        var newItem = items[0];
        // first row checked as it was found
        expectCheckBoxToBe(self, newItem, checkboxStatus);
       	expect(getField(newItem, 'accentedText')).toEqual(accentedText);
        if(additionalText) {
          expect(getField(newItem, 'additionalText')).toEqual(additionalText);
        }
      });
    }; // findProductAndExpectContent

    this.findRecipeAndExpectContent = function(checkboxStatus, firstRowText, accentedText) {
      this.findProductAndExpectContent(checkboxStatus, firstRowText, accentedText, undefined, 'item.recipename');
      // undefined for non-existing additional text
    }; // findRecipeAndExpectContent

};

module.exports = ListPage;
