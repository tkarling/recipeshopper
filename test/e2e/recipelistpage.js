'use strict';

var RecipeListPage = function () {
    this.get = function()  {
      browser.get('http://localhost:9005/#/recipelist');
    };

    this.addInput1 = element(by.model('data.model1'));
    this.addInput2 = element(by.model('data.model2'));
    this.addButton = element(by.id('additembutton'));

    this.addItem = function(a, b) {
        this.addInput1.sendKeys(a);
        this.addInput2.sendKeys(b);
        this.addButton.click();
    }

    this.myList = element.all(by.repeater('item in recipes'));

    this.getListItemsWithAccentedText = function(content) {
        return this.myList.filter(function(elem, index) {
          return elem.element(by.binding('accentedText')).getText().then(function(text) {
            return text === content;
          });
        });
    }

    this.getField = function(item, field) {
        return item.element(by.binding(field)).getText();
    }

    this.getCheckBoxClass = function(item) {
        return item.element(by.model('data.cbvalue')).getAttribute('class');
    }

    this.deleteItem = function(item) {
        item.element(by.id('deleteitembutton')).click();
    }
};

module.exports = RecipeListPage;

