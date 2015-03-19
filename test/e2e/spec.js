'use strict';

var LoginAndUtils = require('./loginandutils.js');
var utils = new LoginAndUtils();

var SideMenu = require('./sidemenupage.js');
var sideMenuPage = new SideMenu();

var ShoppingListPage = require('./shoppinglistpage.js');
var shoppingListPage = new ShoppingListPage();

var RecipeListPage = require('./recipelistpage.js');
var recipeListPage = new RecipeListPage();

describe('angularjs homepage', function() {

	beforeAll(function() {
		browser.get('http://localhost:9005/#/login');
		utils.login();
	});

	afterAll(function() {
		console.log('logging out');
		sideMenuPage.logout();
	});


	it('should add and delete a product on shopping list', function() {
		sideMenuPage.gotoShoppingList();
	    utils.sleep(2); // wait for the page to load
	    expect(browser.getCurrentUrl()).toBe('http://localhost:9005/#/main');

		shoppingListPage.myList.count().then(function(originalCount) {
	  	 	console.log('NOTE originalCount: ', originalCount);

	  	 	// add item
	  		shoppingListPage.addItem('2', 'prot test carrots', 'prot test veggies');
			utils.sleep(2);
			expect(shoppingListPage.myList.count()).toEqual(originalCount + 1);

			shoppingListPage.getListItemsWithAccentedText('prot test veggies' + ';').then(function(items) {
				// check content of new item
				if(items.length != 1) {
					console.log('NOTE: items.length is: ', items.length);
				}
				var newItem = items[0];
				expect(shoppingListPage.getField(newItem, 'amount')).toEqual('2 prot test carrots');
				expect(shoppingListPage.getField(newItem, 'accentedText')).toEqual('prot test veggies' + ';');

				// delete item
				shoppingListPage.deleteItem(newItem);
				expect(shoppingListPage.myList.count()).toEqual(originalCount);
			});

		});
	});


	it('should add and delete a recipe on recipe list', function() {
		sideMenuPage.gotoRecipes();
	    utils.sleep(2);
	    expect(browser.getCurrentUrl()).toBe('http://localhost:9005/#/recipelist');

		recipeListPage.myList.count().then(function(originalCount) {
	  	 	console.log('NOTE originalCount: ', originalCount);

	  	 	// add item
	  		recipeListPage.addItem('prot test soup', 'prot test thanksgiving');
			expect(recipeListPage.myList.count()).toEqual(originalCount + 1);

			recipeListPage.getListItemsWithAccentedText('prot test thanksgiving').then(function(items) {
				// check content of new item
				if(items.length != 1) {
					console.log('NOTE: items.length is: ', items.length);
				}
				var newItem = items[0];
				expect(recipeListPage.getField(newItem, 'recipe')).toEqual('prot test soup');
				expect(recipeListPage.getField(newItem, 'accentedText')).toEqual('prot test thanksgiving');

				// delete item
				recipeListPage.deleteItem(newItem);
				expect(recipeListPage.myList.count()).toEqual(originalCount);
			});

		});
	});

});


