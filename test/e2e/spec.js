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

  it('should do something', function () {
    sideMenuPage.gotoAndExpectPage('favorites');
    listPage.expectItemCount(originalFavoritesCount);
  }); // it

	describe('Add/ Delete One Tests', function() {

    it('should add a product starting from SL, check it is on SL and favorites and delete it on favorites', function () {
      // goto shopping list page
      sideMenuPage.gotoAndExpectPage('shoppingList');
      listPage.expectItemCount(originalSLItemCount);

      // add item
      listPage.gotoAndExpectPage('addProductFromSL');
      var firstRowContent = productDetailsPage.addProductContentAndSave('2', 'pcs', 'prot test carrots', 'VEGGIES&FRUIT', 'prot test note');
      // aisle is ignored for now as have not implemented select aisle
      // check added on Shoppinglist page
      utils.expectPage('shoppingList');
      utils.sleep(2);
      listPage.expectItemCount(originalSLItemCount + 1);
      listPage.findProductAndExpectContent(listPage.UNCHECKED, firstRowContent, 'UNKNOWN' + ';', 'favorites');
      // check added on favorites page
      sideMenuPage.gotoAndExpectPage('favorites');
      utils.sleep(2);
      listPage.expectItemCount(originalFavoritesCount + 1);
      listPage.findProductAndExpectContent(listPage.CHECKED, firstRowContent, 'UNKNOWN' + ';', 'favorites');

      // delete item
      listPage.findAndDeleteProduct(firstRowContent);
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
      var firstRowContent = productDetailsPage.addProductContentAndSave('3', 'head', 'prot test lettuce', 'VEGGIES&FRUIT', 'prot test note');
      // aisle is ignored for now as have not implemented select aisle
      // check added on favorites page
      utils.expectPage('favorites');
      utils.sleep(2);
      listPage.expectItemCount(originalFavoritesCount + 1);
      listPage.findProductAndExpectContent(listPage.CHECKED, firstRowContent, 'UNKNOWN' + ';', 'favorites');
      // check added on shopping list page
      sideMenuPage.gotoAndExpectPage('shoppingList');
      utils.sleep(2);
      listPage.expectItemCount(originalSLItemCount + 1);
      listPage.findProductAndExpectContent(listPage.UNCHECKED, firstRowContent, 'UNKNOWN' + ';', 'favorites');

      // delete item
      sideMenuPage.gotoAndExpectPage('favorites');
      listPage.findAndDeleteProduct(firstRowContent);
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

	}); // describe 'Add/ Delete One Tests'

  // COMMENTED OUT FOR NOW as not able to figure out how to press tab
  //fdescribe('Add/ Delete Many Products Tests', function() {
  //  it('should add many products from favorites, check that they are on shoppinglist too and delete them from favorites', function () {
  //    // goto favorites page
  //    sideMenuPage.gotoAndExpectPage('favorites');
  //    listPage.expectItemCount(originalFavoritesCount);
  //
  //    // add item
  //    listPage.gotoAndExpectPage('addProductFromFavorites');
  //    var products = [{amount:'3', unit:'heads', product:'prot test broccoli', aisle:'VEGGIES&FRUIT'},
  //      {amount:'1', unit:'cup', product:'prot test sour cream', aisle:'DAIRY'},
  //      {amount:'1', unit:'lb', product:'prot test cod', aisle:'PROTEINS'}];
  //    var firstRowContentArr = productDetailsPage.addProductsAndSave(products);
  //
  //    // check added on favorites page
  //    utils.expectPage('favorites');
  //    utils.sleep();
  //    listPage.expectItemCount(originalFavoritesCount + 3);
  //    listPage.findProductAndExpectContent(listPage.CHECKED, firstRowContentArr[0], 'VEGGIES&FRUIT' + ';', 'favorites');
  //    listPage.findProductAndExpectContent(listPage.CHECKED, firstRowContentArr[1], 'DAIRY' + ';', 'favorites');
  //    listPage.findProductAndExpectContent(listPage.CHECKED, firstRowContentArr[2], 'PROTEINS' + ';', 'favorites');
  //    // check added on shopping list page
  //    sideMenuPage.gotoAndExpectPage('shoppingList');
  //    utils.sleep();
  //    listPage.expectItemCount(originalSLItemCount + 3);
  //    listPage.findProductAndExpectContent(listPage.UNCHECKED, firstRowContentArr[0], 'VEGGIES&FRUIT' + ';', 'favorites');
  //    listPage.findProductAndExpectContent(listPage.UNCHECKED, firstRowContentArr[1], 'DAIRY' + ';', 'favorites');
  //    listPage.findProductAndExpectContent(listPage.UNCHECKED, firstRowContentArr[2], 'PROTEINS' + ';', 'favorites');
  //
  //    // delete items
  //    sideMenuPage.gotoAndExpectPage('favorites');
  //    listPage.findAndDeleteProduct(firstRowContentArr[0]);
  //    listPage.findAndDeleteProduct(firstRowContentArr[1]);
  //    listPage.findAndDeleteProduct(firstRowContentArr[2]);
  //    // check deleted from favorites
  //    listPage.expectItemCount(originalFavoritesCount);
  //    // check deleted from shopping list
  //    sideMenuPage.gotoAndExpectPage('shoppingList');
  //    listPage.expectItemCount(originalSLItemCount);
  //  }); // it
  //
  //}); // describe 'Add/ Delete Many Tests'


  describe('Checkbox Tests', function() {
    var productOneFirstRow;
    var productTwoFirstRow;
    var productThreeFirstRow;

    // returns firstRowContent of added item
    var addProductFromFavoritesPage = function(amount, unit, product, aisle) {
      listPage.gotoAndExpectPage('addProductFromFavorites');
      var firstRowContent = productDetailsPage.addProductContentAndSave(amount, unit, product, aisle);
      // aisle is ignored for now
      utils.expectPage('favorites');
      utils.sleep();
      return firstRowContent;
    }; // addProductFromFavoritesPage

		var noOfAddedItems = 0;
    beforeAll(function () {
      sideMenuPage.gotoAndExpectPage('favorites');
      listPage.expectItemCount(originalFavoritesCount);

      // add 3 items
      productOneFirstRow = addProductFromFavoritesPage('2', 'pcs', 'prot test onions', 'VEGGIES&FRUIT');
      productTwoFirstRow = addProductFromFavoritesPage('3', 'cartons', 'prot test milk', 'DAIRY');
      productThreeFirstRow = addProductFromFavoritesPage('1', 'lb', 'prot test beef', 'PROTEINS');
      noOfAddedItems = noOfAddedItems + 3;

      listPage.expectItemCount(originalFavoritesCount + noOfAddedItems);
    }); // beforeAll

		afterAll(function() {
			sideMenuPage.gotoAndExpectPage('favorites');

			// delete the earlier created 3 items
			listPage.findAndDeleteProduct(productOneFirstRow);
			listPage.findAndDeleteProduct(productTwoFirstRow);
			listPage.findAndDeleteProduct(productThreeFirstRow);

			utils.sleep(2);
      listPage.expectItemCount(originalFavoritesCount);
		}); // afterAll

		it('should check an item on SL page', function() {
			sideMenuPage.gotoAndExpectPage('shoppingList');

			listPage.findProductClickCheckboxAndExpectCheckBoxToBe(productOneFirstRow, listPage.CHECKED);
		}); // it

		it('should remove an item on SL page but keep it on favorites', function() {
			sideMenuPage.gotoAndExpectPage('shoppingList');

			listPage.findAndDeleteProduct(productTwoFirstRow);
			listPage.expectItemCount(originalSLItemCount + noOfAddedItems - 1);

			sideMenuPage.gotoAndExpectPage('favorites');
      listPage.expectItemCount(originalFavoritesCount + noOfAddedItems);
		}); // it

		it('should reset bought item to unbought if it is removed from SL and brought back', function() {
			// check item on SL page
			sideMenuPage.gotoAndExpectPage('shoppingList');
			listPage.findProductClickCheckboxAndExpectCheckBoxToBe(productThreeFirstRow, listPage.CHECKED);

			// remove item from SL page
			utils.sleep(2);
			listPage.findAndDeleteProduct(productThreeFirstRow);

			// bring item back to SL page (on fav page)
			sideMenuPage.gotoAndExpectPage('favorites');
			utils.sleep(2);
			listPage.findProductClickCheckboxAndExpectCheckBoxToBe(productThreeFirstRow, listPage.CHECKED);

			// verify item is not checked on SL page
			sideMenuPage.gotoAndExpectPage('shoppingList');
			utils.sleep(2);
			listPage.findProductAndExpectCheckBoxToBe(productThreeFirstRow, listPage.UNCHECKED);

		}); // it

	}); // describe 'Add/ Remove Favorites to Shopping List Tests'

});


