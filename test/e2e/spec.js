// spec.js
describe('angularjs homepage', function() {
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
  	function shouldAddAndDeleteItem (field1Content, field2Content) {

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
			    return text === 'carrots';
			  });
			}).then(function(filteredElements) {
				// check content of new item
				newItem = filteredElements[0];
				expect(newItem.element(by.binding(listItemField1)).getText()).toEqual(field1Content);
				expect(newItem.element(by.binding(listItemField2)).getText()).toEqual(field2Content + ';');

				// delete item
				newItem.element(by.id(deleteButtonId)).click();
				expect(thisList.count()).toEqual(originalCount);
			});
		});
  	}

	beforeEach(function() {
		browser.get('http://localhost:9005/#/login');
		login();
	});

	// it('should have a title', function() {
	// 	expect(browser.getTitle()).toEqual('Recipe Shopper');
	// });


	it('should add and delete a product on shopping list', function() {
		addInput1 = element(by.model('product'));
		addInput2 = element(by.model('aisle'));
	    addButton = element(by.id('addproductbutton'));
		thisList = element.all(by.repeater('item in groceries'));
		listItemField1 = 'product';
		listItemField2 = 'aisle';
		deleteButtonId = 'deleteproductbutton'

		shouldAddAndDeleteItem('carrots', 'veggies');
	});

});

		// var recipeName = element(by.model('recipename'));
		// var category = element(by.model('category'));
	 //    var addButton = element(by.id('addbutton'));
		// var recipeList = element.all(by.repeater('item in recipes'));

		// function add(a, b) {
		//     recipeName.sendKeys(a);
		//     category.sendKeys(b);
		//     addButton.click();
	 //  	}

		// add('soup', 'thanksgiving');
		// expect(recipeList.count()).toEqual(4);

