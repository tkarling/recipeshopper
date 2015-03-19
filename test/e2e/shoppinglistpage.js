'use strict';

var ShoppingListPage = function () {
    this.get = function()  {
      browser.get('http://localhost:9005/#/main');
    };

    this.addInput1 = element(by.model('data.modelNo'));
    this.addInput2 = element(by.model('data.model1'));
    this.addInput3 = element(by.model('data.model2'));
    this.addItemButton = element(by.id('additembutton'));

    this.addItem = function(a, b, c) {
        this.addInput1.sendKeys(a);
        this.addInput2.sendKeys(b);
        this.addInput3.sendKeys(c);
        this.addItemButton.click();
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
