'use strict';

var LoginAndUtils = require('./loginandutils.js');
var utils = new LoginAndUtils();

var SideMenu = require('./sidemenupage.js');
var sideMenuPage = new SideMenu();

var ListPage = require('./listpage.js');
var listPage = new ListPage();

var ProductDetailsPage = require('./productdetailspage.js');
var productDetailsPage = new ProductDetailsPage();

var RecipeDetailsPage = require('./recipedetailspage.js');
var recipeDetailsPage = new RecipeDetailsPage();

describe('angularjs homepage', function() {

	var originalSLItemCount = 0;
	var originalRecipeCount = 0;
	var originalFavoritesCount = 0;

	beforeAll(function() {
		browser.get('http://localhost:9005/#/login');
		utils.login();
		utils.sleep(3);
    expect(browser.getCurrentUrl()).toBe('http://localhost:9005/#/main');

    listPage.itemCount().then(function (count) {
      originalSLItemCount = count;
      console.log('NOTE originalSLItemCount: ', originalSLItemCount);
    });

    sideMenuPage.gotoAndExpectPage('favorites');
    listPage.itemCount().then(function (count) {
      originalFavoritesCount = count;
      console.log('NOTE originalFavoritesCount: ', originalFavoritesCount);
    });

    sideMenuPage.gotoAndExpectPage('recipes');
    listPage.itemCount().then(function (count) {
      originalRecipeCount = count;
      console.log('NOTE originalRecipeCount: ', originalRecipeCount);
    });
	});

	afterAll(function() {
		console.log('logging out');
		sideMenuPage.logout();
	});

	describe('Add/ Delete Tests', function() {

    it('should add a product starting from SL, check it is on SL and favorites and delete it on favorites', function () {
      // goto shopping list page
      sideMenuPage.gotoAndExpectPage('shoppingList');
      listPage.expectItemCount(originalSLItemCount);

      // add item
      listPage.gotoAndExpectPage('addProductFromSL');
      productDetailsPage.addProductContentAndSave('2', 'pcs', 'prot test carrots', 'VEGGIES&FRUIT', 'prot test note');
      // aisle is ignored for now as have not implemented select aisle
      // check added on Shoppinglist page
      utils.expectPage('shoppingList');
      utils.sleep(2);
      listPage.expectItemCount(originalSLItemCount + 1);
      listPage.findProductAndExpectContent(listPage.UNCHECKED, '2 ' + 'pcs ' + 'prot test carrots', 'UNKNOWN' + ';', 'favorites');
      // check added on favorites page
      sideMenuPage.gotoAndExpectPage('favorites');
      utils.sleep(2);
      listPage.expectItemCount(originalFavoritesCount + 1);
      listPage.findProductAndExpectContent(listPage.CHECKED, '2 ' + 'pcs ' + 'prot test carrots', 'UNKNOWN' + ';', 'favorites');

      // delete item
      listPage.findAndDeleteProduct('2 ' + 'pcs ' + 'prot test carrots');
      // check deleted from favorites
      listPage.expectItemCount(originalFavoritesCount);
      // check deleted from shopping list
      sideMenuPage.gotoAndExpectPage('shoppingList');
      listPage.expectItemCount(originalSLItemCount);
    }); // it

    it('should add a product on favorites, check that it is on shoppinglist too and delete it on favorites', function () {
      // goto favorites page
      sideMenuPage.gotoAndExpectPage('favorites');
      listPage.expectItemCount(originalFavoritesCount);

      // add item
      listPage.gotoAndExpectPage('addProductFromFavorites');
      productDetailsPage.addProductContentAndSave('3', 'head', 'prot test lettuce', 'VEGGIES&FRUIT', 'prot test note');
      // aisle is ignored for now as have not implemented select aisle
      // check added on favorites page
      utils.sleep(2);
      listPage.expectItemCount(originalFavoritesCount + 1);
      listPage.findProductAndExpectContent(listPage.CHECKED, '3 ' + 'head ' + 'prot test lettuce', 'UNKNOWN' + ';', 'favorites');
      // check added on shopping list page
      sideMenuPage.gotoAndExpectPage('shoppingList');
      utils.sleep(2);
      listPage.expectItemCount(originalSLItemCount + 1);
      listPage.findProductAndExpectContent(listPage.UNCHECKED, '3 ' + 'head ' + 'prot test lettuce', 'UNKNOWN' + ';', 'favorites');

      // delete item
      sideMenuPage.gotoAndExpectPage('favorites');
      listPage.findAndDeleteProduct('3 ' + 'head ' + 'prot test lettuce');
      // check deleted from favorites
      listPage.expectItemCount(originalFavoritesCount);
      // check deleted from shopping list
      sideMenuPage.gotoAndExpectPage('shoppingList');
      listPage.expectItemCount(originalSLItemCount);
    }); // it


		it('should add and delete a recipe w no ingredients on recipe list', function () {
      // goto recipes page
      sideMenuPage.gotoAndExpectPage('recipes');
      listPage.expectItemCount(originalRecipeCount);

      // add recipe
      listPage.gotoAndExpectPage('addRecipe');
      recipeDetailsPage.addRecipeContentAndSave('prot test soup', 'prot test thanksgiving', 'prot test note');
      // check added on recipelist
      utils.sleep(2);
      listPage.expectItemCount(originalRecipeCount + 1);
      listPage.findRecipeAndExpectContent(listPage.CHECKED, 'prot test soup', 'prot test thanksgiving');

      // delete recipe
      listPage.findAndDeleteRecipe('prot test soup');
      // check deleted from recipelist
      listPage.expectItemCount(originalRecipeCount);

		}); // it

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
	//		listPage.findAndDeleteProduct('2 ' + 'prot test onions');
	//		listPage.findAndDeleteProduct('1 ' + 'prot test milk');
	//		listPage.findAndDeleteProduct('500 ' + 'prot test beef');
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
	//		listPage.findAndDeleteProduct('1 ' + 'prot test milk');
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
	//		listPage.findAndDeleteProduct(itemIdText);
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


