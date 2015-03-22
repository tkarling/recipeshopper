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

	var findAndDeleteItem = function (firstRowText) {
		shoppingListPage.getListItemsWithProduct(firstRowText).then(function(items) {
			// check content of new item on favorites page
			if(items.length != 1) {
				console.log('NOTE:' + firstRowText + ' items.length is: ', items.length);
			}
			shoppingListPage.deleteItem(items[0]);
		});
	};

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

	describe('Add/ Delete Tests', function() {
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
				shoppingListPage.expectCheckBoxToBeChecked(newItem);
				// expect(shoppingListPage.getCheckBoxClass(newItem)).toContain('md-checked');

				// delete item
				expect(shoppingListPage.myList.count()).toEqual(originalFavoritesCount + 1);
				shoppingListPage.deleteItem(newItem);
				expect(shoppingListPage.myList.count()).toEqual(originalFavoritesCount);
			});

		}); // it


		it('should add a product on favorites, check that it is on shoppinglist too and delete it on favorites', function() {
			// goto favorites page
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
				shoppingListPage.expectCheckBoxNotToBeChecked(newItemOnSL);
				// expect(shoppingListPage.getCheckBoxClass(newItemOnSL)).not.toContain('md-checked');

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
					shoppingListPage.expectCheckBoxToBeChecked(newItemOnFavorites);
					// expect(shoppingListPage.getCheckBoxClass(newItemOnFavorites)).toContain('md-checked');

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
				shoppingListPage.expectCheckBoxNotToBeChecked(newItem);
				// expect(shoppingListPage.getCheckBoxClass(newItem)).not.toContain('md-checked');

				// delete item
				expect(recipeListPage.myList.count()).toEqual(originalRecipeCount + 1);
				recipeListPage.deleteItem(newItem);
				expect(recipeListPage.myList.count()).toEqual(originalRecipeCount);
			});

		}); // it

	}); // describe 'Add/ Delete Tests'

	describe('Add/ Remove Favorites to Shopping List Tests', function() {
		var gotoAndExpectShoppingListPage = function() {
			sideMenuPage.gotoShoppingList();
		    utils.sleep(2); // 
		    expect(browser.getCurrentUrl()).toBe('http://localhost:9005/#/main');
		}

		var gotoAndExpectFavoritesPage = function() {
			sideMenuPage.gotoFavorites();
		    utils.sleep(2); // 
		    expect(browser.getCurrentUrl()).toBe('http://localhost:9005/#/favorites');
		}

		beforeAll(function() {
			gotoAndExpectFavoritesPage();

		    // add 3 items
			expect(shoppingListPage.myList.count()).toEqual(originalFavoritesCount);
	  		shoppingListPage.addItem('2', 'prot test onions', 'prot test veggies');
	  		shoppingListPage.addItem('1', 'prot test milk', 'prot test dairy');
	  		shoppingListPage.addItem('500', 'prot test beef', 'prot test produce');
			utils.sleep(2);
			expect(shoppingListPage.myList.count()).toEqual(originalFavoritesCount + 3);
		}); // beforeAll

		afterAll(function() {
			gotoAndExpectFavoritesPage();

			// delete the earlier created 3 items
			findAndDeleteItem('2 ' + 'prot test onions');
			findAndDeleteItem('1 ' + 'prot test milk');
			findAndDeleteItem('500 ' + 'prot test beef');

			utils.sleep(2);
			expect(shoppingListPage.myList.count()).toEqual(originalFavoritesCount);
		}); // afterAll

		it('should check an item on SL page', function() {
			gotoAndExpectShoppingListPage();

			shoppingListPage.getListItemsWithProduct('2 ' + 'prot test onions').then(function(items) {
				// check content of new item on favorites page
				if(items.length != 1) {
					console.log('NOTE:' + '2 ' + 'prot test onions' + ' items.length is: ', items.length);
				}
				var selectedItem = items[0];

				shoppingListPage.expectCheckBoxNotToBeChecked(selectedItem);
				shoppingListPage.clickCheckBox(selectedItem);
				utils.sleep(2);
				shoppingListPage.expectCheckBoxToBeChecked(selectedItem);
			});

		}); // it

	}); // describe 'Add/ Remove Favorites to Shopping List Tests'

});


