/** @jsx React.DOM */

window.hello = React.createClass({
  render: function () {
    var person = this.props.person || 'World';
    return (
      <div>
        Hello {person}!
      </div>
    );
  }
});