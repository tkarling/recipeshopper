'use strict';

describe('Filter: miscFilters', function () {

  // load the filter's module
  beforeEach(module('recipeshopperApp'));

  describe('titleCase', function() {
  // by hollandben from https://gist.github.com/maruf-nc/5625869

      var fixtures = [
          'AWAITING DISPATCH',
          'AWAITING_DISPATCH',
          'AWaiTing-DISPatcH',
          'Awaiting DISPATCH'
      ];

      it('should convert strings correctly', inject(function(titleCaseFilter) {

          fixtures.forEach(function(fixture) {
              expect(titleCaseFilter(fixture)).toEqual('Awaiting Dispatch');
          });

      }));

      it('should return an empty string when a value is not passed', inject(function(titleCaseFilter) {
          expect(titleCaseFilter()).toEqual('');
          expect(titleCaseFilter(null)).toEqual('');
      }));
  });

  // // initialize a new instance of the filter before each test
  // var miscFilters;
  // beforeEach(inject(function ($filter) {
  //   miscFilters = $filter('miscFilters');
  // }));

  // it('should return the input prefixed with "miscFilters filter:"', function () {
  //   var text = 'angularjs';
  //   expect(miscFilters(text)).toBe('miscFilters filter: ' + text);
  // });

});
