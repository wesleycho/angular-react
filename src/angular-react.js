'use strict';

(function(angular, React) {
  
  angular.module('angular-react', []).value('React', React)
    .factory('$react', ['React', function (React) {
      
      var components = {};
      var $react = {
        createClass: createReactDirective
      };

      return $react;
      
      function createReactDirective(componentName, reactClass, options) {
        
        if(!components[componentName]){
          components[componentName] = React.createClass(reactClass);
        }
        
        var component = components[componentName];

        var directive = {
          restrict: 'EA',
          link: function (scope, elem, attrs) {
            var renderPostponed = false;
            if (attrs.props) {
              scope.$watch(attrs.props, function() {
                if (!renderPostponed) {
                  renderPostponed = true;
                  scope.$$postDigest(postponedRender);
                }
              }, true);
            } else {
              postponedRender();
            }

            scope.$on('$destroy', function() {
              React.unmountComponentAtNode(elem[0]);
            });

            function postponedRender() {
              renderPostponed = false;
              React.renderComponent(component(scope[attrs.props]), elem[0]);
            }
          }
        };

        if (angular.isObject(options)) {
          angular.extend(directive, options);
          if (directive.compile) {
            delete directive.link;
          }
        }
        
        return directive;
      }
    }]);
})(angular, React);