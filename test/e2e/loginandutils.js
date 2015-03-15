'use strict';

var LoginAndUtils = function () {
    var testLoginEmail = 'testuser@test.com';
    var testLoginPassword = 'testpwd';
    var defaultSleepTimeout = 1000;
    var sleepTimeout = 1000;

    var loginEmailInput = element(by.model('inputUser.email'));
    var loginPasswordInput = element(by.model('inputUser.password'));
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

    // this.swipedown = function() {
    //     browser.actions().mouseMove({x: 20, y: 20}).mouseDown().mouseMove({x: 20, y: 300}).mouseUp().perform();
    // }

    // this.startOfImageSrc = function (longString) {
    //     return longString.substring(0, 50);
    // }

};

module.exports = LoginAndUtils;