'use strict';

var ShoppingListPage = function () {
    this.get = function()  {
      browser.get('http://localhost:9005/#/main');
    };

    this.addInput1 = element(by.model('product'));
    this.addInput2 = element(by.model('aisle'));
    this.addButton = element(by.id('addproductbutton'));

    this.addItem = function(a, b) {
        this.addInput1.sendKeys(a);
        this.addInput2.sendKeys(b);
        this.addButton.click();
    }

    this.myList = element.all(by.repeater('item in groceries'));

    this.getListItemsWithContent = function(content) {
        return this.myList.filter(function(elem, index) {
          return elem.element(by.binding('product')).getText().then(function(text) {
            return text === content;
          });
        });
    }

    this.getField = function(item, field) {
        return item.element(by.binding(field)).getText();
    }

    this.deleteItem = function(item) {
        item.element(by.id('deleteproductbutton')).click();
    }
};

module.exports = ShoppingListPage;
