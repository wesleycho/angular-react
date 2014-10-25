'use strict';

describe('angular-react', function () {
  describe('Factory: $react', function () {
    var $react,
      bar = {
        render: function () {
          return React.DOM.div('bar');
        }
      };

    beforeEach(module('angular-react'));
    beforeEach(inject(function (_$react_) {
      $react = _$react_;
    }));

    describe('createClass', function () {
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

    describe('renderComponent', function () {
      var component, scope, elem, attrs;

      beforeEach(function () {
        component = React.createClass(bar);
        inject(function ($rootScope) {
          scope = $rootScope.$new();
          elem = angular.element('<div></div>');
          attrs = {};
        });
      });

      it('should run a first time render', function () {
        spyOn(React, 'renderComponent');
        $react.renderComponent(component)(scope, elem, attrs);

        expect(scope.$$watchers).toBe(null);
        expect(scope.$$listeners.$destroy.length).toBe(1);

        scope.$apply();
        expect(React.renderComponent).toHaveBeenCalledWith(component(undefined), elem[0]);
      });

      it('should create a $$watcher and $$listener', function () {
        attrs.props = 'foo';
        scope.foo = 'bar';
        $react.renderComponent(component)(scope, elem, attrs);

        expect(scope.$$watchers.length).toBe(1);
        expect(scope.$$listeners.$destroy.length).toBe(1);
      });

      it('should render the component when the attributes change', function () {
        spyOn(React, 'renderComponent');
        attrs.props = 'foo';
        scope.foo = 'bar';
        scope.bar = 'baz';
        $react.renderComponent(component)(scope, elem, attrs);
        scope.$apply();

        expect(React.renderComponent).toHaveBeenCalledWith(component('bar'), elem[0]);

        attrs.props = 'bar';
        scope.$apply();

        expect(React.renderComponent.calls.length).toBe(2);
        expect(React.renderComponent).toHaveBeenCalledWith(component('baz'), elem[0]);
      });
    });
  });
});