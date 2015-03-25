'use strict';

var LoginAndUtils = require('./loginandutils.js');
var utils = new LoginAndUtils();

var SideMenu = require('./sidemenupage.js');
var sideMenuPage = new SideMenu();

var ListPage = require('./listpage.js');
var listPage = new ListPage();

describe('angularjs homepage', function() {

	var originalSLItemCount = 0; 
	var originalRecipeCount = 0; 
	var originalFavoritesCount = 0; 

	beforeAll(function() {
		browser.get('http://localhost:9005/#/login');
		utils.login();
		utils.sleep(2);
	    expect(browser.getCurrentUrl()).toBe('http://localhost:9005/#/main');

		listPage.myList.count().then(function(count) {
			originalSLItemCount = count;
	  	 	console.log('NOTE originalSLItemCount: ', originalSLItemCount);
	  	 });

		sideMenuPage.gotoAndExpectPage('favorites');
		listPage.myList.count().then(function(count) {
			originalFavoritesCount = count;
	  	 	console.log('NOTE originalFavoritesCount: ', originalFavoritesCount);
	  	 });

		sideMenuPage.gotoAndExpectPage('recipes');
   		listPage.myList.count().then(function(count) {
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
			sideMenuPage.gotoAndExpectPage('shoppingList');

	  	 	// add item
			expect(listPage.myList.count()).toEqual(originalSLItemCount);
	  		listPage.addItem('prot test carrots', 'prot test veggies', '2');
			utils.sleep(2);
			expect(listPage.myList.count()).toEqual(originalSLItemCount + 1);

			// goto favorites page
			sideMenuPage.gotoAndExpectPage('favorites');

			listPage.getListItemsWithAccentedText('prot test veggies' + ';').then(function(items) {
				// check content of new item
				if(items.length != 1) {
					console.log('NOTE: items.length is: ', items.length);
				}
				var newItem = items[0];
				expect(listPage.getField(newItem, 'amount')).toEqual('2 prot test carrots');
				expect(listPage.getField(newItem, 'accentedText')).toEqual('prot test veggies' + ';');
				listPage.expectCheckBoxToBeChecked(newItem);
				// expect(listPage.getCheckBoxClass(newItem)).toContain('md-checked');

				// delete item
				expect(listPage.myList.count()).toEqual(originalFavoritesCount + 1);
				listPage.deleteItem(newItem);
				expect(listPage.myList.count()).toEqual(originalFavoritesCount);
			});

		}); // it


		it('should add a product on favorites, check that it is on shoppinglist too and delete it on favorites', function() {
			// goto favorites page
			sideMenuPage.gotoAndExpectPage('favorites');

	  	 	// add item
			expect(listPage.myList.count()).toEqual(originalFavoritesCount);
	  		listPage.addItem('prot test carrots', 'prot test veggies', '2');
			utils.sleep(2);
			expect(listPage.myList.count()).toEqual(originalFavoritesCount + 1);

			// goto shopping list page
			sideMenuPage.gotoAndExpectPage('shoppingList');
			expect(listPage.myList.count()).toEqual(originalSLItemCount + 1);

			listPage.getListItemsWithAccentedText('prot test veggies' + ';').then(function(items) {
				// check content of new item on shopping list
				if(items.length != 1) {
					console.log('NOTE: items.length is: ', items.length);
				}
				var newItemOnSL = items[0];
				expect(listPage.getField(newItemOnSL, 'amount')).toEqual('2 prot test carrots');
				expect(listPage.getField(newItemOnSL, 'accentedText')).toEqual('prot test veggies' + ';');
				listPage.expectCheckBoxNotToBeChecked(newItemOnSL);

				// go back to favorites page
				sideMenuPage.gotoAndExpectPage('favorites');

				listPage.getListItemsWithAccentedText('prot test veggies' + ';').then(function(items) {
					// check content of new item on favorites page
					if(items.length != 1) {
						console.log('NOTE: items.length is: ', items.length);
					}
					var newItemOnFavorites = items[0];
					expect(listPage.getField(newItemOnFavorites, 'amount')).toEqual('2 prot test carrots');
					expect(listPage.getField(newItemOnFavorites, 'accentedText')).toEqual('prot test veggies' + ';');
					listPage.expectCheckBoxToBeChecked(newItemOnFavorites);

					// delete item
					expect(listPage.myList.count()).toEqual(originalFavoritesCount + 1);
					listPage.deleteItem(newItemOnFavorites);
					expect(listPage.myList.count()).toEqual(originalFavoritesCount);
				});

			});

		}); // it


		it('should add and delete a recipe on recipe list', function() {
			// goto recipes page
			sideMenuPage.gotoAndExpectPage('recipes');

	  	 	// add item
	  		listPage.addItem('prot test soup', 'prot test thanksgiving');
			expect(listPage.myList.count()).toEqual(originalRecipeCount + 1);

			listPage.getListItemsWithAccentedText('prot test thanksgiving').then(function(items) {
				// check content of new item
				if(items.length != 1) {
					console.log('NOTE: items.length is: ', items.length);
				}
				var newItem = items[0];
				expect(listPage.getField(newItem, 'recipe')).toEqual('prot test soup');
				expect(listPage.getField(newItem, 'accentedText')).toEqual('prot test thanksgiving');
				listPage.expectCheckBoxNotToBeChecked(newItem);

				// delete item
				expect(listPage.myList.count()).toEqual(originalRecipeCount + 1);
				listPage.deleteItem(newItem);
				expect(listPage.myList.count()).toEqual(originalRecipeCount);
			});

		}); // it

	}); // describe 'Add/ Delete Tests'

	describe('Add/ Remove Favorites to Shopping List Tests', function() {

		beforeAll(function() {
			sideMenuPage.gotoAndExpectPage('favorites');

		    // add 3 items
			expect(listPage.myList.count()).toEqual(originalFavoritesCount);
	  		listPage.addItem('prot test onions', 'prot test veggies', '2');
	  		// listPage.addItem('prot test milk', 'prot test dairy', '1');
	  		// listPage.addItem('prot test beef', 'prot test produce', '500');

			utils.sleep(2);
			expect(listPage.myList.count()).toEqual(originalFavoritesCount + 1);
		}); // beforeAll

		afterAll(function() {
			sideMenuPage.gotoAndExpectPage('favorites');

			// delete the earlier created 3 items
			listPage.findAndDeleteItem('2 ' + 'prot test onions');
			// listPage.findAndDeleteItem('1 ' + 'prot test milk');
			// listPage.findAndDeleteItem('500 ' + 'prot test beef');

			utils.sleep(2);
			expect(listPage.myList.count()).toEqual(originalFavoritesCount);
		}); // afterAll

		it('should check an item on SL page', function() {
			sideMenuPage.gotoAndExpectPage('shoppingList');

			listPage.checkCheckboxAndExpectToBeChecked('2 ' + 'prot test onions');

		}); // it

	}); // describe 'Add/ Remove Favorites to Shopping List Tests'

});


