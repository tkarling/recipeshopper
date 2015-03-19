'use strict';

var ShoppingListPage = function () {
    this.get = function()  {
      browser.get('http://localhost:9005/#/main');
    };

    this.addInput1 = element(by.model('amount'));
    this.addInput2 = element(by.model('product'));
    this.addInput3 = element(by.model('aisle'));
    this.addButton = element(by.id('addproductbutton'));

    this.addItem = function(a, b, c) {
        this.addInput1.sendKeys(a);
        this.addInput2.sendKeys(b);
        this.addInput3.sendKeys(c);
        this.addButton.click();
    }

    this.myList = element.all(by.repeater('item in groceries'));

    this.getListItemsWithAccentedText = function(content) {
        return this.myList.filter(function(elem, index) {
          return elem.element(by.binding('accentedText')).getText().then(function(text) {
            // console.log('text: ', text);
            return text == content;
          });
        });
    }

    this.getField = function(item, field) {
        return item.element(by.binding(field)).getText();
    }

    this.deleteItem = function(item) {
        item.element(by.id('deleteitembutton')).click();
    }
};

module.exports = ShoppingListPage;
