'use strict';

describe('angular-react', function () {
  describe('Factory: $react', function () {
    var $react,
      bar = {
        render: function () {
          return 'bar';
        }
      };

    beforeEach(module('angular-react'));
    beforeEach(inject(function (_$react_) {
      $react = _$react_;
    }));

    it('should register a class successfully', function () {
      expect($react.createClass('foo', bar)).toEqual(jasmine.objectContaining({
        restrict: 'EA',
        link: jasmine.any(Function)
      }));
    });

    it('should take options to override the defaults', function () {
      var reactDirective = $react.createClass('foo', bar, {
        restrict: 'A',
        scope: true
      });
      expect(reactDirective).toEqual(jasmine.objectContaining({
        restrict: 'A',
        scope: true,
        link: jasmine.any(Function)
      }));
    });

    it('should override the linking function with a compile function', function () {
      var compile = function () {
        return 'moo';
      };
      var reactDirective = $react.createClass('foo', bar, {
        compile: compile
      });
      expect(reactDirective).toEqual(jasmine.objectContaining({
        restrict: 'EA',
        compile: compile
      }));
    });
  });
});