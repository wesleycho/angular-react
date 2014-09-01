'use strict';

angular.module('angular-react', [])
  .factory('React', function ($window) {
    return $window.React;
  })
  .provider('$react', function () {
    var reactComponents = {};

    this.register = function (name, reactComponent) {
      if (!name) {
        throw 'Invalid React component name';
      }
      if (!angular.isFunction(reactComponent)) {
        throw 'Invalid React component class';
      }
      reactComponents[name] = reactComponent;
      return this;
    };

    this.$get = ['React', function (React) {
      var $react = {
        getComponent: getComponent
      };

      return $react;

      function getComponent(name) {
        return reactComponents[name];
      }
    }];
  })
  .directive('react', function (React) {
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
          React.renderComponent(scope[attrs.component](scope[attrs.props]), elem[0]);
        }
      }
    }
  });