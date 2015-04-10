'use strict';
var LoginAndUtils = require('./loginandutils.js');
var utils = new LoginAndUtils();

var SideMenu = function () {
    var shoppingListMenuItem = element(by.buttonText('SHOPPING LIST'));
    var recipesMenuItem = element(by.buttonText('RECIPES'));
    var favoritesMenuItem = element(by.buttonText('FAVORITES'));
    var settingsMenuItem = element(by.buttonText('SETTINGS'));
    var logoutMenuItem = element(by.buttonText('LOGOUT'));

    this.gotoShoppingList = function () {
        shoppingListMenuItem.click();
    }

    this.gotoRecipes = function () {
        recipesMenuItem.click();
    }

    this.gotoFavorites = function () {
        favoritesMenuItem.click();
    }

    this.gotoSettings = function () {
        settingsMenuItem.click();
    }

    this.logout = function () {
        logoutMenuItem.click();
    }

    this.gotoAndExpectPage = function(pageId) {
        switch(pageId) {
            case 'shoppingList':
                this.gotoShoppingList();
                //utils.expectUrl('http://localhost:9005/#/main');
                break;

            case 'favorites':
                this.gotoFavorites();
                //utils.expectUrl('http://localhost:9005/#/favorites');
                break;

            case 'recipes':
                this.gotoRecipes();
                //utils.expectUrl('http://localhost:9005/#/recipelist');
                break;

            default:
                console.log('gotoAndExpectPage unnown page', pageId);
        }
        utils.expectUrl(pageId);
     }

};

module.exports = SideMenu;
