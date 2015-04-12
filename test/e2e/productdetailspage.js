'use strict';
var LoginAndUtils = require('./loginandutils.js');
var utils = new LoginAndUtils();

var ProductDetailsPage = function () {
  var inputAmount = element(by.model('currentItem.amount'));
  var inputUnit = element(by.model('currentItem.unit'));
  var inputProduct = element(by.model('currentItem.product'));
  var inputNote = element(by.model('currentItem.note'));
  var inputManyProducts = element(by.model('data.addedItemsString'));
  var saveButton = element(by.id('savebutton'));

  var addOneTab = element(by.id('addone-tab'));
  var addManyTab = element(by.id('addmany-tab'));

  var gotoAddManyTab = function () {
    addManyTab.click();
  }; // gotoAddManyTab

  // returns first row content
  this.addProductContentAndSave = function(amount, unit, product, aisle, note) {
    // aisle is ignored for now as select is not implemented
    inputAmount.sendKeys(amount);
    inputUnit.sendKeys(unit);
    inputProduct.sendKeys(product);
    inputNote.sendKeys(note + '\n');
    return amount + ' ' + unit + ' ' + product;
  }; // addProductContent

  var productsArrayToAddManyString = function(products) {
    var str = '';
    var prod, prodAsStr;
    for(var i=0; i < products.length; i++) {
      prod = products[i];
      prodAsStr = prod.aisle + ' ' + prod.amount + ' ' + prod.unit + ' ' + prod.product;
      str= str + prodAsStr + '\n';
    }
    return str;
  }; // productsArrayToAddManyString

  var productsArrayToFirstRowContentArray = function(products) {
    var firstRowContentArr = [];
    var prod, prodAsStr;
    for(var i=0; i < products.length; i++) {
      prod = products[i];
      firstRowContentArr.push(prod.amount + ' ' + prod.unit + ' ' + prod.product);
    }
    return firstRowContentArr;
  }; // productsArrayToFirstRowContentArray

  this.addProductsAndSave = function(products) {
    gotoAddManyTab();
    inputManyProducts.sendKeys(productsArrayToAddManyString(products));
    saveButton.click();
    return productsArrayToFirstRowContentArray(products);
  }; //addProductsAndSave

};

module.exports = ProductDetailsPage;
