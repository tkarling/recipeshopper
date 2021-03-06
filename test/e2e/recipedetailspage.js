'use strict';
var LoginAndUtils = require('./loginandutils.js');
var utils = new LoginAndUtils();

var RecipeDetailsPage = function () {
  var inputName = element(by.model('recipe.recipename'));
  var inputCategory = element(by.model('recipe.category'));
  var inputNote = element(by.model('recipe.note'));
  var saveButton = element(by.id('savebutton'));

  // returns first row content
  this.addRecipeContentAndSave = function(name, category, note) {
    inputName.sendKeys(name);
    inputCategory.sendKeys(category);
    inputNote.sendKeys(note);
    saveButton.click();
    return name;
  }; // addRecipeContentAndSave

};

module.exports = RecipeDetailsPage;
