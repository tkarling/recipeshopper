'use strict';

var LoginAndUtils = require('./loginandutils.js');
var utils = new LoginAndUtils();

var ShoppingListPage = require('./shoppinglistpage.js');
var shoppingListPage = new ShoppingListPage();

var RecipeListPage = require('./recipelistpage.js');
var recipeListPage = new RecipeListPage();

describe('angularjs homepage', function() {

	beforeAll(function() {
		browser.get('http://localhost:9005/#/login');
		utils.login();
	    utils.sleep(3); 
	    // make sure items have time to load

	});

	afterAll(function() {
		console.log('logging out');
		utils.logout();
	});


	it('should add and delete a product on shopping list', function() {
	    expect(browser.getCurrentUrl()).toBe('http://localhost:9005/#/main');

		shoppingListPage.myList.count().then(function(originalCount) {
	  	 	console.log('NOTE originalCount: ', originalCount);

	  	 	// add item
	  		shoppingListPage.addItem('carrots', 'veggies');
			expect(shoppingListPage.myList.count()).toEqual(originalCount + 1);

			shoppingListPage.getListItemsWithContent('carrots').then(function(items) {
				// check content of new item
				if(items.length != 1) {
					console.log('NOTE: items.length is: ', items.length);
				}
				var newItem = items[0];
				expect(shoppingListPage.getField(newItem, 'product')).toEqual('carrots');
				expect(shoppingListPage.getField(newItem, 'aisle')).toEqual('veggies' + ';');

				// delete item
				shoppingListPage.deleteItem(newItem);
				expect(shoppingListPage.myList.count()).toEqual(originalCount);
			});

		});
	});


	it('should add and delete a recipe on recipe list', function() {
	    var recipeListMenuButton = element(by.id('recipelistmenubutton'));
	    recipeListMenuButton.click(); 
	    utils.sleep(2);
	    expect(browser.getCurrentUrl()).toBe('http://localhost:9005/#/recipelist');

		recipeListPage.myList.count().then(function(originalCount) {
	  	 	console.log('NOTE originalCount: ', originalCount);

	  	 	// add item
	  		recipeListPage.addItem('prot test soup', 'thanksgiving');
			expect(recipeListPage.myList.count()).toEqual(originalCount + 1);

			recipeListPage.getListItemsWithContent('prot test soup').then(function(items) {
				// check content of new item
				if(items.length != 1) {
					console.log('NOTE: items.length is: ', items.length);
				}
				var newItem = items[0];
				expect(recipeListPage.getField(newItem, 'recipe')).toEqual('prot test soup');
				expect(recipeListPage.getField(newItem, 'category')).toEqual('thanksgiving');

				// delete item
				recipeListPage.deleteItem(newItem);
				expect(recipeListPage.myList.count()).toEqual(originalCount);
			});

		});
	});

});


