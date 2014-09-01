'use strict';
angular.module('angular-react')
  .constant('REACT_COMPONENT', {
    hello: window.hello
  })
  .controller('DemoCtrl', function ($scope, REACT_COMPONENT) {
    $scope.data = {data: 'World'};
    $scope.hello = REACT_COMPONENT.hello;
  });