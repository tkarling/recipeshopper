'use strict';
var LoginAndUtils = require('./loginandutils.js');
var utils = new LoginAndUtils();

var ProductDetailsPage = function () {
  var inputAmount = element(by.model('currentItem.amount'));
  var inputUnit = element(by.model('currentItem.unit'));
  var inputProduct = element(by.model('currentItem.product'));
  var inputNote = element(by.model('currentItem.note'));

  // returns first row content
  this.addProductContentAndSave = function(amount, unit, product, aisle, note) {
    // aisle is ignored for now as select is not implemented
    inputAmount.sendKeys(amount);
    inputUnit.sendKeys(unit);
    inputProduct.sendKeys(product);
    inputNote.sendKeys(note + '\n');
    return amount + ' ' + unit + ' ' + product;
  }; // addProductContent

};

module.exports = ProductDetailsPage;
