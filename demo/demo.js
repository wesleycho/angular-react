'use strict';

angular.module('angular-react')
  .constant('REACT_COMPONENT', {
    hello: window.hello
  })
  .config(function ($reactProvider, REACT_COMPONENT) {
    $reactProvider.register('hello', REACT_COMPONENT.hello);
  })
  .controller('DemoCtrl', function ($scope) {
    $scope.data = {data: 'World'};
  });