# angular-react [![Build Status](https://travis-ci.org/wesleycho/angular-react.svg?branch=master)](https://travis-ci.org/wesleycho/angular-react)

This project is for those wishing to integrate [AngularJS](https://angularjs.org) using [ReactJS](http://facebook.github.io/react/), a performant view layer that can play well with a popular MV* framework for complex web applications.

This is currently a rough WIP.

## Setup

* (Recommended) Install `react-tools` via `npm install -g react-tools`
* (Recommended) Run `jsx --watch src/ dest/` (source and destination directories - stub paths as needed)

## Usage

To use this library, one must inject the `$react` helper service into your directive.  `$react` is a wrapper around the `React` api that implements a createClass method, which registers the React component class and creates a directive object.  If the component is already registered, it will return you the component.

### Example

<pre>
/* hello directive - lives in separate file for JSX to compile */
module.directive('hello', function ($react) {
  return $react.createClass('hello', {
    render: function () {
      /** @jsx React.DOM */
      var person = this.props.person || 'World';
      return (
        &lt;div&gt;Hello {person}!&lt;/div&gt;
      );
    }
  });
});

/* Scripts */
module.controller('DemoCtrl', function ($scope) {
  $scope.props = {
    person: 'Wesley'
  };
});

/* html */
&lt;hello&gt;&lt;/hello&gt; // renders &lt;div&gt;Hello World!&lt;/div&gt;
&lt;hello props="props">&lt;/hello&gt; // renders &lt;div&gt;Hello Wesley!&lt;/div&gt;
</pre>

## API

`$react.createClass(componentName, reactClass, options)` - function that takes a componentName, React component class, and options and returns a directive object back
  *  componentName: String
  *  reactClass: React class - standard input for [React.createClass](http://facebook.github.io/react/docs/top-level-api.html#react.createclass)
  *  options: Object.  Standard input for [directive object definitions](https://docs.angularjs.org/api/ng/service/$compile)
`$react.renderComponent(scope, element, attributes)` - function that takes a $scope, element, and attributes.  These are the same arguments passed in by a linking function in a directive.