/** @jsx React.DOM */

angular.module('angular-react')
  .directive('hello', function ($react) {
    return $react.createClass('hello', {
      render: function () {
        var person = this.props.person || 'World';
        return (
          <div>
            Hello {person}!
          </div>
        );
      }
    });
  });