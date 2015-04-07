'use strict';

describe('Service: productsFromString', function () {

  // load the service's module
  beforeEach(module('productsFromStringMod'));

  // instantiate service
  var productsFromString;
  beforeEach(inject(function (_productsFromString_) {
    productsFromString = _productsFromString_;
  }));

  it('should do something', function () {
    expect(!!productsFromString).toBe(true);
  });

  it('should get products', function () {
    var productsStr = 'VEGGIES&FRUIT 1 bunch kale\nEXTRAS 2 bottles virgin coconut oil';
    var products = productsFromString.getProductsFromString(productsStr, 'FAVORITES', 'FAVORITES');
    expect(products.length).toEqual(2);
    expect(products[0].isbought).toEqual(false);
    expect(products[0].isonlist).toEqual(true);
    expect(products[0].recipe).toEqual('FAVORITES');
    expect(products[0].recipeId).toEqual('FAVORITES');
    expect(products[0].aisle).toEqual('VEGGIES&FRUIT');
    expect(products[0].amount).toEqual(1);
    expect(products[0].unit).toEqual('bunch');
    expect(products[0].product).toEqual('kale');
    expect(products[1].isbought).toEqual(false);
    expect(products[1].isonlist).toEqual(true);
    expect(products[1].recipe).toEqual('FAVORITES');
    expect(products[1].recipeId).toEqual('FAVORITES');
    expect(products[1].aisle).toEqual('EXTRAS');
    expect(products[1].amount).toEqual(2);
    expect(products[1].unit).toEqual('bottles');
    expect(products[1].product).toEqual('virgin coconut oil');
  });

  it('should ignore extra spaces when getting products', function () {
    var productsStr = '  VEGGIES&FRUIT  \t 1   bunch   kale  \n  EXTRAS   2   bottles   virgin coconut oil  ';
    var products = productsFromString.getProductsFromString(productsStr, 'FAVORITES', 'FAVORITES');
    expect(products.length).toEqual(2);
    expect(products[0].aisle).toEqual('VEGGIES&FRUIT');
    expect(products[0].amount).toEqual(1);
    expect(products[0].unit).toEqual('bunch');
    expect(products[0].product).toEqual('kale');
    expect(products[1].aisle).toEqual('EXTRAS');
    expect(products[1].amount).toEqual(2);
    expect(products[1].unit).toEqual('bottles');
    expect(products[1].product).toEqual('virgin coconut oil');
  });

  it('should ignore extra empty lines when getting products', function () {
    var productsStr = '  VEGGIES&FRUIT  \t 1   bunch   kale \n \n  EXTRAS   2   bottles   virgin coconut oil \n ';
    var products = productsFromString.getProductsFromString(productsStr, 'FAVORITES', 'FAVORITES');
    expect(products.length).toEqual(2);
    expect(products[0].aisle).toEqual('VEGGIES&FRUIT');
    expect(products[0].amount).toEqual(1);
    expect(products[0].unit).toEqual('bunch');
    expect(products[0].product).toEqual('kale');
    expect(products[1].aisle).toEqual('EXTRAS');
    expect(products[1].amount).toEqual(2);
    expect(products[1].unit).toEqual('bottles');
    expect(products[1].product).toEqual('virgin coconut oil');
  });

  it('should read specific special numbers when getting products', function () {
    var productsStr = '  VEGGIES&FRUIT  ½ tsp baking soda  \n  EXTRAS   ¼ tsp coarse sea salt \n GRAINS ¾ cup whole-wheat pastry flour ';
    var products = productsFromString.getProductsFromString(productsStr, 'FAVORITES', 'FAVORITES');
    expect(products.length).toEqual(3);
    expect(products[0].aisle).toEqual('VEGGIES&FRUIT');
    expect(products[0].amount).toEqual(0.5);
    expect(products[0].unit).toEqual('tsp');
    expect(products[0].product).toEqual('baking soda');
    expect(products[1].aisle).toEqual('EXTRAS');
    expect(products[1].amount).toEqual(0.25);
    expect(products[1].unit).toEqual('tsp');
    expect(products[1].product).toEqual('coarse sea salt');
    expect(products[2].aisle).toEqual('GRAINS');
    expect(products[2].amount).toEqual(0.75);
    expect(products[2].unit).toEqual('cup');
    expect(products[2].product).toEqual('whole-wheat pastry flour');
  });

});
