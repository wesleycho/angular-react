# angular-react

This project is for those wishing to integrate [AngularJS](https://angularjs.org) using [ReactJS](http://facebook.github.io/react/), a performant view layer that can play well with a popular MV* framework for complex web applications.

This is currently a rough WIP.

## Setup

* (Recommended) Install `react-tools` via `npm install -g react-tools`
* (Recommended) Run `jsx --watch src/ dest/` (source and destination directories - stub paths as needed)

## Usage

To use this library, one must register a React component created via the `React.createClass` method to the `$reactProvider`.  The best way to do this is to use separate script files for each component created this way, inject the components into Angular, and then register it.  Once the component is available on `$scope`, one can use the `react` directive provided in this library to render the component with automatic updates when the state attribute value is updated on `$scope`.

### Example

<pre>
/* helloComponent - lives in separate file for JSX to compile */
window.helloComponent = React.createClass({
  render: function () {
    /** @jsx React.DOM */
    var person = this.props.person || 'World';
    return (
      &lt;div&gt;Hello {person}!&lt;/div&gt;
    );
  }
});

/* Scripts */
module.constant('REACT_COMPONENT', {
  hello: helloComponent
}).config(function ($reactProvider, REACT_COMPONENT) {
  $reactProvider.register('hello', REACT_COMPONENT.hello);
}).controller('DemoCtrl', function ($scope) {
  $scope.state = {
    person: 'Wesley'
  };
});

/* html */
&lt;react component="hello"&gt;&lt;/react&gt; // renders &lt;div&gt;Hello World!&lt;/div&gt;
&lt;react component="hello" props="state">&lt;/react&gt; // renders &lt;div&gt;Hello Wesley!&lt;/div&gt;
</pre>