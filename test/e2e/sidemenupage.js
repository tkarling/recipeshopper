'use strict';

var SideMenu = function () {
    var shoppingListMenuItem = element(by.buttonText('SHOPPING LIST'));
    var recipesMenuItem = element(by.buttonText('RECIPES'));
    var settingsMenuItem = element(by.buttonText('SETTINGS'));
    var logoutMenuItem = element(by.buttonText('LOGOUT'));

    this.gotoShoppingList = function () {
        shoppingListMenuItem.click();
    }

    this.gotoRecipes = function () {
        recipesMenuItem.click();
    }

    this.gotoSettings = function () {
        settingsMenuItem.click();
    }

    this.logout = function () {
        logoutMenuItem.click();
    }

};

module.exports = SideMenu;