'use strict';
var LoginAndUtils = require('./loginandutils.js');
var utils = new LoginAndUtils();

var RecipeDetailsPage = function () {
  var inputName = element(by.model('recipe.recipename'));
  var inputCategory = element(by.model('recipe.category'));
  var inputNote = element(by.model('recipe.note'));

  this.addRecipeContentAndSave = function(name, category, note) {
    inputName.sendKeys(name);
    inputCategory.sendKeys(category);
    inputNote.sendKeys(note + '\n');
  }; // addRecipeContentAndSave

};

module.exports = RecipeDetailsPage;
