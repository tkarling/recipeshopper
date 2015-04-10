'use strict';
var LoginAndUtils = require('./loginandutils.js');
var utils = new LoginAndUtils();

var ProductDetailsPage = function () {
  var inputAmount = element(by.model('currentItem.amount'));
  var inputUnit = element(by.model('currentItem.unit'));
  var inputProduct = element(by.model('currentItem.product'));
  var inputNote = element(by.model('currentItem.note'));

  this.addProductContent = function(amount, unit, product, aisle, note) {
    inputAmount.sendKeys(amount);
    inputUnit.sendKeys(unit);
    inputProduct.sendKeys(product);
    inputNote.sendKeys(note);
  }; // addProductContent

  this.saveProductAndExpectPage = function(pageId) {

  }; // saveProduct

};

module.exports = ProductDetailsPage;
