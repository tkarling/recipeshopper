'use strict';

var LoginAndUtils = function () {
    var testLoginEmail = 'testuser@test.com';
    var testLoginPassword = 'testpwd';
    var defaultSleepTimeout = 1000;
    var sleepTimeout = 1000;

    var loginEmailInput = element(by.model('user.email'));
    var loginPasswordInput = element(by.model('user.password'));
    var loginButton = element(by.id('loginbutton'));
    var navMenuButton = element(by.id('menubutton'));

    var waitOne = function () {
        return protractor.promise.delayed(sleepTimeout);
    }
    var flow = protractor.promise.controlFlow();

    this.sleep = function (multiplier) {
        multiplier = multiplier || 1;
        sleepTimeout = multiplier * defaultSleepTimeout;
        // console.log('multiplier', multiplier);
        // console.log('sleepTimeout', sleepTimeout);
        return flow.execute(waitOne);
    }

    this.login = function () {
        this.sleep();
        loginEmailInput.sendKeys(testLoginEmail);
        loginPasswordInput.sendKeys(testLoginPassword);
        loginButton.click();
    }

    this.toggleSideMenu = function () {
        navMenuButton.click();
    }

    this.expectPage = function(pageId) {
      var myUrl;
      switch(pageId) {
        case 'shoppingList':
          myUrl = 'http://localhost:9005/#/main';
          break;
        case 'favorites':
          myUrl = 'http://localhost:9005/#/favorites';
          break;
        case 'recipes':
          myUrl = 'http://localhost:9005/#/recipelist';
          break;
        case 'addProductFromSL':
          myUrl = 'http://localhost:9005/#/productdetails/List/ShoppingList/Item/Add';
          break;
        case 'addProductFromFavorites':
          myUrl = 'http://localhost:9005/#/productdetails/List/FAVORITES/Item/Add';
          break;
        case 'addRecipe':
          myUrl = 'http://localhost:9005/#/recipedetails/Add';
          break;

        default:
          console.log('gotoAndExpectPage unnown page', pageId);
      }

      this.sleep(2); //
      expect(browser.getCurrentUrl()).toBe(myUrl);

    }; // expectPage

    // this.swipedown = function() {
    //     browser.actions().mouseMove({x: 20, y: 20}).mouseDown().mouseMove({x: 20, y: 300}).mouseUp().perform();
    // }

    // this.startOfImageSrc = function (longString) {
    //     return longString.substring(0, 50);
    // }

};

module.exports = LoginAndUtils;
