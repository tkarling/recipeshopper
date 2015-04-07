'use strict';
/**
 * @ngdoc service
 * @name productsFromStringMod.productsFromString
 * @description
 * # productsFromString
 * Factory in the productsFromStringMod.
 */

angular.module('productsFromStringMod', []);
angular.module('productsFromStringMod')
  .factory('productsFromString', function ($log) {

    var createProductStringsArray = function (productsString) {
      //$log.debug('productsFromString: createProductsArray productsString', productsString);
      return productsString.split('\n');
    };// createProductStringsArray

    // from http://stackoverflow.com/questions/237104/array-containsobj-in-javascript
    var isInArray = function (array, search) {
      return array.indexOf(search) >= 0;
    };// isInArray

    var units = ['cup', 'tbsp', 'tsp', 'oz', 'qt', 'lb',
      'bag', 'bottle', 'box', 'bunch', 'container', 'dozen', 'jar', 'loaf',
      'bags', 'bottles', 'boxes', 'bunches', 'containers', 'dozens', 'jars', 'loaves'];
    var isUnit = function (aString) {
      return isInArray(units, aString);
    };// isUnit

    var checkIfHasUnit = function (aString) {
      var unit = aString.slice(0, aString.indexOf(' '));
      unit = isUnit(unit) ? unit : '';
      return unit;
    }; // checkIfHasUnit

    var aisles = ['PROTEINS', 'DAIRY', 'VEGGIES&FRUIT', 'GRAINS', 'NUTS&SEEDS', 'EXTRAS'];
    var isAisle = function (aString) {
      return isInArray(aisles, aString);
    }; // isAisle

    var checkIfHasAisle = function (aString) {
      var aisle = aString.slice(0, aString.indexOf(' '));
      aisle = isAisle(aisle) ? aisle : '';
      return aisle;
    }; // checkIfHasAmount

    var specialNums = ['¼', '½', '¾'];
    var checkIfHasAmount = function (aString) {
      var amountStr = aString.slice(0, aString.indexOf(' '));
      if (isNaN(amountStr) && !isInArray(specialNums, amountStr)) {
        amountStr = '';
      }
      return amountStr;
    }; // checkIfHasAmount

    var specialToNumber = function (aString) {
      var amount = aString;
      switch (aString) {
        case '¼':
          amount = 0.25;
          break;
        case '½':
          amount = 0.5;
          break;
        case '¾':
          amount = 0.75;
          break;
        default:
          amount = Number(aString);
      }
      return amount;
    }; // specialToNumber

    var getProduct = function(productString, recipeId, recipe) {
      var product = {
        isonlist: true, isbought: false,
        recipeId: recipeId,
        recipe: recipe
      }
      var aisle = checkIfHasAisle(productString);
      if (aisle) {
        product.aisle = aisle;
        productString = productString.slice(aisle.length + 1, productString.length).trim();
      }
      var amount = checkIfHasAmount(productString);
      if (amount) {
        product.amount = specialToNumber(amount);
        productString = productString.slice(amount.length + 1, productString.length).trim();
      }
      var unit = checkIfHasUnit(productString);
      if (unit) {
        product.unit = unit;
        productString = productString.slice(unit.length + 1, productString.length).trim();
      }
      product.product = productString;
      //$log.debug('productsFromString getProductsFromArray product[', i, ']= ', product);
      return product;
    }

    var getProductsFromArray = function (productStringsArray, recipeId, recipe) {
      //$log.debug('productsFromString: getProductsFromArray productStringsArray', productStringsArray);
      var products = [];
      for (var i = 0; i < productStringsArray.length; i++) {
        var productString = productStringsArray[i].trim();
        if (productString) {
          var product = getProduct(productString, recipeId, recipe);
          products.push(product);
        }
      }
      return products;
    }; // getProductsFromArray

    // Public API here
    return {
      getProductsFromString: function (productsString, recipeId, recipe) {
        var productStringsArray = createProductStringsArray(productsString);
        return getProductsFromArray(productStringsArray, recipeId, recipe);
      }, // getProductsFromString

      getAisles: function () {
        return aisles;
      } // getAisles
    };
  });
