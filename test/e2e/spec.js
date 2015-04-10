'use strict';

var LoginAndUtils = require('./loginandutils.js');
var utils = new LoginAndUtils();

var SideMenu = require('./sidemenupage.js');
var sideMenuPage = new SideMenu();

var ListPage = require('./listpage.js');
var listPage = new ListPage();

var ProductDetailsPage = require('./productdetailspage.js');
var productDetailsPage = new ProductDetailsPage();

describe('angularjs homepage', function() {

	var originalSLItemCount = 0;
	var originalRecipeCount = 0;
	var originalFavoritesCount = 0;

	beforeAll(function() {
		browser.get('http://localhost:9005/#/login');
		utils.login();
		utils.sleep(3);
    expect(browser.getCurrentUrl()).toBe('http://localhost:9005/#/main');

		listPage.myList.count().then(function(count) {
			originalSLItemCount = count;
	  	 	console.log('NOTE originalSLItemCount: ', originalSLItemCount);
	  	 });

		//sideMenuPage.gotoAndExpectPage('favorites');
		//listPage.myList.count().then(function(count) {
		//	originalFavoritesCount = count;
	  	// 	console.log('NOTE originalFavoritesCount: ', originalFavoritesCount);
	  	// });
        //
		//sideMenuPage.gotoAndExpectPage('recipes');
   		//listPage.myList.count().then(function(count) {
		//	originalRecipeCount = count;
	  	// 	console.log('NOTE originalRecipeCount: ', originalRecipeCount);
	  	// });
	});

	afterAll(function() {
		console.log('logging out');
		sideMenuPage.logout();
	});

	describe('Add/ Delete Tests', function() {

		it('should add a product starting from SL, check it is on SL and favorites and delete it on favorites', function() {
			// goto shopping list page
			sideMenuPage.gotoAndExpectPage('shoppingList');

  	 	// add item
      listPage.expectItemCount(originalSLItemCount);
      listPage.gotoAndExpectPage('addProductFromSL');
      productDetailsPage.addProductContent('2', 'pcs', 'prot test carrots', 'VEGGIES&FRUIT', 'prot test note');
      productDetailsPage.saveProductAndExpectPage('shoppingList');
      utils.sleep(2);
      //expect(listPage.myList.count()).toEqual(originalSLItemCount + 1);


      //expect(browser.getCurrentUrl()).toBe('http://localhost:9005/#/productdetails/List/ShoppingList/Item/Add');
	  		//listPage.addItem('prot test carrots', 'prot test veggies', '2');
			//utils.sleep(2);
			//expect(listPage.myList.count()).toEqual(originalSLItemCount + 1);

			//// goto favorites page
			//sideMenuPage.gotoAndExpectPage('favorites');
            //
			//listPage.getListItemsWithAccentedText('prot test veggies' + ';').then(function(items) {
			//	// check content of new item
			//	if(items.length != 1) {
			//		console.log('NOTE: items.length is: ', items.length);
			//	}
			//	var newItem = items[0];
			//	expect(listPage.getField(newItem, 'amount')).toEqual('2 prot test carrots');
			//	expect(listPage.getField(newItem, 'accentedText')).toEqual('prot test veggies' + ';');
			//	listPage.expectCheckBoxToBe(newItem, listPage.CHECKED);
			//	// expect(listPage.getCheckBoxClass(newItem)).toContain('md-checked');
            //
			//	// delete item
			//	expect(listPage.myList.count()).toEqual(originalFavoritesCount + 1);
			//	listPage.deleteItem(newItem);
			//	expect(listPage.myList.count()).toEqual(originalFavoritesCount);
			//});

		}); // it


		//it('should add a product on favorites, check that it is on shoppinglist too and delete it on favorites', function() {
		//	// goto favorites page
		//	sideMenuPage.gotoAndExpectPage('favorites');
        //
	  	// 	// add item
		//	expect(listPage.myList.count()).toEqual(originalFavoritesCount);
	  	//	listPage.addItem('prot test carrots', 'prot test veggies', '2');
		//	utils.sleep(2);
		//	expect(listPage.myList.count()).toEqual(originalFavoritesCount + 1);
        //
		//	// goto shopping list page
		//	sideMenuPage.gotoAndExpectPage('shoppingList');
		//	expect(listPage.myList.count()).toEqual(originalSLItemCount + 1);
        //
		//	listPage.getListItemsWithAccentedText('prot test veggies' + ';').then(function(items) {
		//		// check content of new item on shopping list
		//		if(items.length != 1) {
		//			console.log('NOTE: items.length is: ', items.length);
		//		}
		//		var newItemOnSL = items[0];
		//		expect(listPage.getField(newItemOnSL, 'amount')).toEqual('2 prot test carrots');
		//		expect(listPage.getField(newItemOnSL, 'accentedText')).toEqual('prot test veggies' + ';');
		//		listPage.expectCheckBoxToBe(newItemOnSL, listPage.UNCHECKED);
        //
		//		// go back to favorites page
		//		sideMenuPage.gotoAndExpectPage('favorites');
        //
		//		listPage.getListItemsWithAccentedText('prot test veggies' + ';').then(function(items) {
		//			// check content of new item on favorites page
		//			if(items.length != 1) {
		//				console.log('NOTE: items.length is: ', items.length);
		//			}
		//			var newItemOnFavorites = items[0];
		//			expect(listPage.getField(newItemOnFavorites, 'amount')).toEqual('2 prot test carrots');
		//			expect(listPage.getField(newItemOnFavorites, 'accentedText')).toEqual('prot test veggies' + ';');
		//			listPage.expectCheckBoxToBe(newItemOnFavorites, listPage.CHECKED);
        //
		//			// delete item
		//			expect(listPage.myList.count()).toEqual(originalFavoritesCount + 1);
		//			listPage.deleteItem(newItemOnFavorites);
		//			expect(listPage.myList.count()).toEqual(originalFavoritesCount);
		//		});
        //
		//	});
        //
		//}); // it
        //
        //
		//it('should add and delete a recipe on recipe list', function() {
		//	// goto recipes page
		//	sideMenuPage.gotoAndExpectPage('recipes');
        //
	  	// 	// add item
	  	//	listPage.addItem('prot test soup', 'prot test thanksgiving');
		//	expect(listPage.myList.count()).toEqual(originalRecipeCount + 1);
        //
		//	listPage.getListItemsWithAccentedText('prot test thanksgiving').then(function(items) {
		//		// check content of new item
		//		if(items.length != 1) {
		//			console.log('NOTE: items.length is: ', items.length);
		//		}
		//		var newItem = items[0];
		//		expect(listPage.getField(newItem, 'recipe')).toEqual('prot test soup');
		//		expect(listPage.getField(newItem, 'accentedText')).toEqual('prot test thanksgiving');
		//		listPage.expectCheckBoxToBe(newItem, listPage.UNCHECKED);
        //
		//		// delete item
		//		expect(listPage.myList.count()).toEqual(originalRecipeCount + 1);
		//		listPage.deleteItem(newItem);
		//		expect(listPage.myList.count()).toEqual(originalRecipeCount);
		//	});
        //
		//}); // it

	}); // describe 'Add/ Delete Tests'

	//describe('Checkbox Tests', function() {
    //
	//	var noOfAddedItems = 0;
	//	beforeAll(function() {
	//		sideMenuPage.gotoAndExpectPage('favorites');
    //
	//	    // add 3 items
	//		expect(listPage.myList.count()).toEqual(originalFavoritesCount);
	//  		listPage.addItem('prot test onions', 'prot test veggies', '2');
	//  		utils.sleep();
	//  		listPage.addItem('prot test milk', 'prot test dairy', '1');
	//  		utils.sleep();
	//  		listPage.addItem('prot test beef', 'prot test produce', '500');
	//  		noOfAddedItems = noOfAddedItems + 3;
    //
	//		utils.sleep(2);
	//		expect(listPage.myList.count()).toEqual(originalFavoritesCount + noOfAddedItems);
	//	}); // beforeAll
    //
	//	afterAll(function() {
	//		sideMenuPage.gotoAndExpectPage('favorites');
    //
	//		// delete the earlier created 3 items
	//		listPage.findAndDeleteItem('2 ' + 'prot test onions');
	//		listPage.findAndDeleteItem('1 ' + 'prot test milk');
	//		listPage.findAndDeleteItem('500 ' + 'prot test beef');
    //
	//		utils.sleep(2);
	//		expect(listPage.myList.count()).toEqual(originalFavoritesCount);
	//	}); // afterAll
    //
	//	it('should check an item on SL page', function() {
	//		sideMenuPage.gotoAndExpectPage('shoppingList');
    //
	//		listPage.findItemClickCheckboxAndExpectCheckBoxToBe('2 ' + 'prot test onions', listPage.CHECKED);
	//	}); // it
    //
	//	it('should remove an item on SL page but keep it on favorites', function() {
	//		sideMenuPage.gotoAndExpectPage('shoppingList');
    //
	//		listPage.findAndDeleteItem('1 ' + 'prot test milk');
	//		expect(listPage.myList.count()).toEqual(originalSLItemCount + noOfAddedItems - 1);
    //
	//		sideMenuPage.gotoAndExpectPage('favorites');
	//		expect(listPage.myList.count()).toEqual(originalFavoritesCount + noOfAddedItems);
	//	}); // it
    //
	//	it('should reset bought item to unbought if it is removed from SL and brought back', function() {
	//		// check item on SL page
	//		var itemIdText = '500 ' + 'prot test beef';
	//		sideMenuPage.gotoAndExpectPage('shoppingList');
	//		listPage.findItemClickCheckboxAndExpectCheckBoxToBe(itemIdText, listPage.CHECKED);
    //
	//		// remove item from SL page
	//		utils.sleep(2);
	//		listPage.findAndDeleteItem(itemIdText);
    //
	//		// bring item back to SL page (on fav page)
	//		sideMenuPage.gotoAndExpectPage('favorites');
	//		utils.sleep(2);
	//		listPage.findItemClickCheckboxAndExpectCheckBoxToBe(itemIdText, listPage.CHECKED);
    //
	//		// verify item is not checked on SL page
	//		sideMenuPage.gotoAndExpectPage('shoppingList');
	//		utils.sleep(2);
	//		listPage.findItemAndExpectCheckBoxToBe(itemIdText, listPage.UNCHECKED);
    //
	//	}); // it
    //
    //
    //
	//}); // describe 'Add/ Remove Favorites to Shopping List Tests'

});


