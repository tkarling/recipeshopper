'use strict';
var LoginAndUtils = require('./loginandutils.js');
var utils = new LoginAndUtils();

var ListPage = function () {
    this.get = function()  {
      browser.get('http://localhost:9005/#/main');
    };

    this.addInput1 = element(by.model('data.model1'));
    this.addInput2 = element(by.model('data.model2'));
    this.addInput3 = element(by.model('data.modelNo'));
    this.addItemButton = element(by.id('additembutton'));

    this.addItem = function(a, b, c) {
        this.addInput1.sendKeys(a);
        this.addInput2.sendKeys(b);
        if(c) {
            this.addInput3.sendKeys(c);
        }
        this.addItemButton.click();
    };

    this.myList = element.all(by.repeater('item in data.myItems'));

    this.getListItemsWithAccentedText = function(content) {
        // console.log('getListItemsWithAccentedText called');
        return this.myList.filter(function(elem, index) {
            // console.log('in filter');
          return elem.element(by.binding('accentedText')).getText().then(function(text) {
            // console.log('text: ', text);
            return text == content;
          });
        });
    };

    this.getListItemsWithProduct = function(content) {
        // console.log('getListItemsWithProduct called');
        return this.myList.filter(function(elem, index) {
            // console.log('in filter');
          return elem.element(by.binding('item.product')).getText().then(function(text) {
            // console.log('text: ', text);
            return text == content;
          });
        });
    };

    this.getField = function(item, field) {
        return item.element(by.binding(field)).getText();
    };

    var getCheckBoxClass = function(item) {
        return item.element(by.model('data.cbvalue')).getAttribute('class');
    };

    this.expectCheckBoxToBeChecked = function(item) {
        expect(getCheckBoxClass(item)).toContain('md-checked');
    };

    this.expectCheckBoxNotToBeChecked = function(item) {
        expect(getCheckBoxClass(item)).not.toContain('md-checked');
    };

    var clickCheckBox = function(item) {
        return item.element(by.model('data.cbvalue')).click();
    };

    this.checkCheckboxAndExpectToBeChecked = function(firstRowText) {
        var self = this;
        this.getListItemsWithProduct(firstRowText).then(function(items) {
            if(items.length != 1) {
                console.log('NOTE:' + firstRowText + ' items.length is: ', items.length);
            }
            var selectedItem = items[0];

            self.expectCheckBoxNotToBeChecked(selectedItem);
            clickCheckBox(selectedItem);
            utils.sleep(2);
            self.expectCheckBoxToBeChecked(selectedItem);
        });

    }

    this.deleteItem = function(item) {
        console.log('deleteItem called');
        item.element(by.id('deleteitembutton')).click();
    };

    this.findAndDeleteItem = function (firstRowText) {
        var self = this;
        this.getListItemsWithProduct(firstRowText).then(function(items) {
            // check content of new item on favorites page
            if(items.length != 1) {
                console.log('NOTE:' + firstRowText + ' items.length is: ', items.length);
            }
            self.deleteItem(items[0]);
        });
    };


};

module.exports = ListPage;
