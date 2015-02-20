// spec.js

describe('angularjs homepage', function() {
	var flow = protractor.promise.controlFlow();

	function waitOne() {
		return protractor.promise.delayed(1000);
	}

	function sleep() {
		return flow.execute(waitOne);
	}

	var loginEmail = element(by.model('inputUser.email'));
	var loginPassword = element(by.model('inputUser.password'));
    var loginButton = element(by.id('loginbutton'));

	function login() {
	    loginEmail.sendKeys('testuser@test.com');
	    loginPassword.sendKeys('testpwd');
	    loginButton.click();
  	}

	var addInput1, addInput2, addButton;
	var thisList, listItemField1, listItemField2,deleteButtonId;
  	function shouldAddAndDeleteItem (field1Content, field2Content, separator) {

		function addItem(a, b) {
		    addInput1.sendKeys(a);
		    addInput2.sendKeys(b);
		    addButton.click();
	  	}

		thisList.count().then(function(originalCount) {
	  	 	console.log('NOTE originalCount: ', originalCount);

	  	 	// add item
	  		addItem(field1Content, field2Content);
			expect(thisList.count()).toEqual(originalCount + 1);

			thisList.filter(function(elem, index) {
			  return elem.element(by.binding(listItemField1)).getText().then(function(text) {
			    return text === field1Content;
			  });
			}).then(function(filteredElements) {
				// check content of new item
				newItem = filteredElements[0];
				expect(newItem.element(by.binding(listItemField1)).getText()).toEqual(field1Content);
				expect(newItem.element(by.binding(listItemField2)).getText()).toEqual(field2Content + separator);

				// delete item
				newItem.element(by.id(deleteButtonId)).click();
				expect(thisList.count()).toEqual(originalCount);
			});
		});
  	}

	beforeEach(function() {
		// sleep();
		browser.get('http://localhost:9005/#/login');
	});

	// it('should have a title', function() {
	// 	expect(browser.getTitle()).toEqual('Recipe Shopper');
	// });


	it('should add and delete a product on shopping list', function() {
		login();

	    expect(browser.getCurrentUrl()).toBe('http://localhost:9005/#/main');

		addInput1 = element(by.model('product'));
		addInput2 = element(by.model('aisle'));
	    addButton = element(by.id('addproductbutton'));
		thisList = element.all(by.repeater('item in groceries'));
		listItemField1 = 'product';
		listItemField2 = 'aisle';
		deleteButtonId = 'deleteproductbutton'

		shouldAddAndDeleteItem('carrots', 'veggies', ';');
	});

	it('should add and delete a recipe on recipe list', function() {
		// not needed at the momen as the test opens browser with menu open
	    // var menuButton = element(by.id('menubutton'));
	    // menuButton.click();
	    // expect(browser.getCurrentUrl()).toBe('http://localhost:9005/#/main');

	    var recipeListMenuButton = element(by.id('recipelistmenubutton'));
	    recipeListMenuButton.click();
	    expect(browser.getCurrentUrl()).toBe('http://localhost:9005/#/recipelist');

	    addInput1 = element(by.model('recipename'));
		addInput2 = element(by.model('category'));
	    addButton = element(by.id('addrecipebutton'));
		thisList = element.all(by.repeater('item in recipes'));
		listItemField1 = 'recipename';
		listItemField2 = 'category';
		deleteButtonId = 'deleterecipebutton'

		shouldAddAndDeleteItem('soup', 'thanksgiving', '');

	});


});


