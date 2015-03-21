// conf.js
var env = {};
env.baseUrl = 'http://localhost:9005/#';

exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['test/e2e/spec*.js'],
  framework: 'jasmine2',
}

// baseUrl: env.baseUrl,

 //  onPrepare: function() {
 //    browser.driver.get(env.baseUrl + '/login');

 //    browser.driver.findElement(by.id('inputUser.email')).sendKeys('testuser@test.com');
 //    browser.driver.findElement(by.id('inputUser.password')).sendKeys('testpwd');
 //    browser.driver.findElement(by.id('loginbutton')).click();

 //    // Login takes some time, so wait until it's done.
 //    // For the test app's login, we know it's done when it redirects to
 //    // index.html.
 //    browser.driver.wait(function() {
 //      return browser.driver.getCurrentUrl().then(function(url) {
 //        return /main/.test(url);
 //      });
 //    });
 //  }

  // allScriptsTimeout: 11000,
  // getPageTimeout: 100000
