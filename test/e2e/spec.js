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

	var originalSLItemCount = 0; 
	var originalRecipeCount = 0; 
	var originalFavoritesCount = 0; 
	beforeAll(function() {
		browser.get('http://localhost:9005/#/login');
		utils.login();
		utils.sleep(2);
	    expect(browser.getCurrentUrl()).toBe('http://localhost:9005/#/main');

		shoppingListPage.myList.count().then(function(count) {
			originalSLItemCount = count;
	  	 	console.log('NOTE originalSLItemCount: ', originalSLItemCount);
	  	 });

		sideMenuPage.gotoFavorites();
		utils.sleep(2);
	    expect(browser.getCurrentUrl()).toBe('http://localhost:9005/#/favorites');
		shoppingListPage.myList.count().then(function(count) {
			originalFavoritesCount = count;
	  	 	console.log('NOTE originalFavoritesCount: ', originalFavoritesCount);
	  	 });

		sideMenuPage.gotoRecipes();
	    utils.sleep(2);
	    expect(browser.getCurrentUrl()).toBe('http://localhost:9005/#/recipelist');
   		recipeListPage.myList.count().then(function(count) {
			originalRecipeCount = count;
	  	 	console.log('NOTE originalRecipeCount: ', originalRecipeCount);
	  	 });
	});

	afterAll(function() {
		console.log('logging out');
		sideMenuPage.logout();
	});

	describe('Use existing Test Album1', function() {
		it('should add a product on shopping list and delete it on favorites', function() {
			// goto shopping list page
			sideMenuPage.gotoShoppingList();
		    utils.sleep(2); // 
		    expect(browser.getCurrentUrl()).toBe('http://localhost:9005/#/main');

	  	 	// add item
			expect(shoppingListPage.myList.count()).toEqual(originalSLItemCount);
	  		shoppingListPage.addItem('2', 'prot test carrots', 'prot test veggies');
			utils.sleep(2);
			expect(shoppingListPage.myList.count()).toEqual(originalSLItemCount + 1);

			// goto favorites page
			sideMenuPage.gotoFavorites();
		    utils.sleep(2); // 
		    expect(browser.getCurrentUrl()).toBe('http://localhost:9005/#/favorites');

			shoppingListPage.getListItemsWithAccentedText('prot test veggies' + ';').then(function(items) {
				// check content of new item
				if(items.length != 1) {
					console.log('NOTE: items.length is: ', items.length);
				}
				var newItem = items[0];
				expect(shoppingListPage.getField(newItem, 'amount')).toEqual('2 prot test carrots');
				expect(shoppingListPage.getField(newItem, 'accentedText')).toEqual('prot test veggies' + ';');
				expect(shoppingListPage.getCheckBoxClass(newItem)).toContain('md-checked');

				// delete item
				expect(shoppingListPage.myList.count()).toEqual(originalFavoritesCount + 1);
				shoppingListPage.deleteItem(newItem);
				expect(shoppingListPage.myList.count()).toEqual(originalFavoritesCount);
			});

		}); // it


		it('should add a product on favorites, check that it is on shoppinglist too and delete it on favorites', function() {
			// goto shopping list page
			sideMenuPage.gotoFavorites();
		    utils.sleep(2); // 
		    expect(browser.getCurrentUrl()).toBe('http://localhost:9005/#/favorites');

	  	 	// add item
			expect(shoppingListPage.myList.count()).toEqual(originalFavoritesCount);
	  		shoppingListPage.addItem('2', 'prot test carrots', 'prot test veggies');
			utils.sleep(2);
			expect(shoppingListPage.myList.count()).toEqual(originalFavoritesCount + 1);

			// goto favorites page
			sideMenuPage.gotoShoppingList();
		    utils.sleep(2); // 
		    expect(browser.getCurrentUrl()).toBe('http://localhost:9005/#/main');
			expect(shoppingListPage.myList.count()).toEqual(originalSLItemCount + 1);

			shoppingListPage.getListItemsWithAccentedText('prot test veggies' + ';').then(function(items) {
				// check content of new item on shopping list
				if(items.length != 1) {
					console.log('NOTE: items.length is: ', items.length);
				}
				var newItemOnSL = items[0];
				expect(shoppingListPage.getField(newItemOnSL, 'amount')).toEqual('2 prot test carrots');
				expect(shoppingListPage.getField(newItemOnSL, 'accentedText')).toEqual('prot test veggies' + ';');
				expect(shoppingListPage.getCheckBoxClass(newItemOnSL)).not.toContain('md-checked');

				// go back to favorites page
				sideMenuPage.gotoFavorites();
			    utils.sleep(2); // 
			    expect(browser.getCurrentUrl()).toBe('http://localhost:9005/#/favorites');

				shoppingListPage.getListItemsWithAccentedText('prot test veggies' + ';').then(function(items) {
					// check content of new item on favorites page
					if(items.length != 1) {
						console.log('NOTE: items.length is: ', items.length);
					}
					var newItemOnFavorites = items[0];
					expect(shoppingListPage.getField(newItemOnFavorites, 'amount')).toEqual('2 prot test carrots');
					expect(shoppingListPage.getField(newItemOnFavorites, 'accentedText')).toEqual('prot test veggies' + ';');
					expect(shoppingListPage.getCheckBoxClass(newItemOnFavorites)).toContain('md-checked');

					// delete item
					expect(shoppingListPage.myList.count()).toEqual(originalFavoritesCount + 1);
					shoppingListPage.deleteItem(newItemOnFavorites);
					expect(shoppingListPage.myList.count()).toEqual(originalFavoritesCount);
				});

			});

		}); // it


		it('should add and delete a recipe on recipe list', function() {
			// goto recipes page
			sideMenuPage.gotoRecipes();
		    utils.sleep(2);
		    expect(browser.getCurrentUrl()).toBe('http://localhost:9005/#/recipelist');

	  	 	// add item
	  		recipeListPage.addItem('prot test soup', 'prot test thanksgiving');
			expect(recipeListPage.myList.count()).toEqual(originalRecipeCount + 1);

			recipeListPage.getListItemsWithAccentedText('prot test thanksgiving').then(function(items) {
				// check content of new item
				if(items.length != 1) {
					console.log('NOTE: items.length is: ', items.length);
				}
				var newItem = items[0];
				expect(recipeListPage.getField(newItem, 'recipe')).toEqual('prot test soup');
				expect(recipeListPage.getField(newItem, 'accentedText')).toEqual('prot test thanksgiving');
				expect(shoppingListPage.getCheckBoxClass(newItem)).not.toContain('md-checked');

				// delete item
				recipeListPage.deleteItem(newItem);
				expect(recipeListPage.myList.count()).toEqual(originalRecipeCount);
			});

		}); // it
	});

});


