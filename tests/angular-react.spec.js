'use strict';

describe('angular-react', function () {
  describe('Provider: $react', function () {
    beforeEach(module('angular-react'));

    it('should throw an invalid name exception with no valid name', function () {
      module(function ($reactProvider) {
        expect($reactProvider.register()).toThrow();
        try {
          $reactProvider.register(null, 'foo');
        } catch (e) {
          expect(e).toBe('Invalid React component name');
        }
      });
    });

    it('should throw an invalid component class exception with no valid class', function () {
      module(function ($reactProvider) {
        expect($reactProvider.register('foo', 'bar')).toThrow();
        try {
          $reactProvider.register('foo', {});
        } catch (e) {
          expect(e).toBe('Invalid React component class');
        }
      });
    });

    it('should register a class successfully', function () {
      var bar = function () {
        return 'bar';
      };
      module(function ($reactProvider) {
        expect($reactProvider.register('foo', bar)).toBe($reactProvider);
      });

      inject(function ($react) {
        expect($react.getComponent('foo')).toBe(bar);
      });
    });
  });

  describe('Factory: $react', function () {
    var $react;
    beforeEach(module('angular-react'));
    beforeEach(inject(function (_$react_) {
      $react = _$react_;
    }));

    it('should register a class successfully', function () {
      var bar = function () {
        return 'bar';
      };
      expect($react.setComponent('foo', bar)).toBe($react);
    });
  });

  describe('Directive', function () {
    var $compile, $react, compile, scope, reactClass;
    beforeEach(module('angular-react'));
    beforeEach(module(function ($reactProvider) {
      reactClass = React.createClass({
        displayName: 'hello',
        render: function () {
          var person = this.props.person;
          return (
            React.DOM.div(null, 
              'Hello ', person, '!'
            )
          );
        }
      });
      $reactProvider.register('foo', reactClass);
    }));
    beforeEach(inject(function(_$compile_, $rootScope, _$react_) {
      scope = $rootScope.$new();
      $compile = _$compile_;
      $react = _$react_;
      compile = function () {
        return $compile('<react component="foo" props="props"></react>')(scope);
      };
    }));

    it('should compile with no binding', function () {
      var elem = $compile('<react component="foo"></react>')(scope);
      expect(elem.html())
        .toBe('<div data-reactid=".0"><span data-reactid=".0.0">Hello </span><span data-reactid=".0.2">!</span></div>');
    });

    it('should compile with binding and update element html on state change', function () {
      scope.props = {
        person: 'World'
      };
      var elem = compile();
      scope.$digest();
      expect(elem.html())
        .toBe('<div data-reactid=".1"><span data-reactid=".1.0">Hello </span><span data-reactid=".1.1">World</span><span data-reactid=".1.2">!</span></div>');

      scope.props.person = 'Wesley';
      scope.$digest();
      expect(elem.html())
        .toBe('<div data-reactid=".1"><span data-reactid=".1.0">Hello </span><span data-reactid=".1.1">Wesley</span><span data-reactid=".1.2">!</span></div>');
    });
  });
});