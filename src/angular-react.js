'use strict';

angular.module('angular-react', [])
  .factory('React', function ($window) {
    return $window.React;
  })
  .provider('$react', function () {
    var reactComponents = {};

    this.register = register.bind(this);

    this.$get = ['React', function (React) {
      var $react = {
        getComponent: getComponent,
        setComponent: setComponent
      };

      return $react;

      function getComponent(name) {
        return reactComponents[name];
      }

      function setComponent(name, reactComponent) {
        return register.call($react, name, reactComponent);
      }
    }];

    function register(name, reactComponent) {
      if (!name) {
        throw 'Invalid React component name';
      }
      if (!angular.isFunction(reactComponent)) {
        throw 'Invalid React component class';
      }
      reactComponents[name] = reactComponent;
      return this;
    }
  })
  .directive('react', function ($react, React) {
    return {
      restrict: 'EA',
      link: function (scope, elem, attrs) {
        var renderPostponed = false;
        if (attrs.props) {
          scope.$watch(attrs.props, function () {
            if (!renderPostponed) {
              renderPostponed = true;
              scope.$$postDigest(postponedRender);
            }
          }, true);
        } else {
          postponedRender();
        }

        scope.$on('$destroy', function () {
          React.unmountComponentAtNode(elem[0]);
        });

        function postponedRender() {
          renderPostponed = false;
          React.renderComponent($react.getComponent(attrs.component)(scope[attrs.props]), elem[0]);
        }
      }
    };
  });