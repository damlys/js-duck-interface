Duck Interface
===

> "If it walks like a duck and quacks like a duck, it probably is a duck." ~ Dave Thomas about duck typing

Right? Well... I'm not pretty sure about that,
but if you think so then this simple package
might be usable for you.

## Installation

```
$ npm install --save duck-interface
```

## Usage

```javascript
const { DuckInterface } = require('duck-interface');

let iExecutable = new DuckInterface(['execute']);
let iWritable = new DuckInterface(['write'], ['writer']);

let exampleCommand = {
  execute: function() {
    console.log('Doing some stuff...');
  }
};

iExecutable.isImplementedBy(exampleCommand);
// Nothing happens, just continuing

iWritable.isImplementedBy(exampleCommand);
// Throws an error: "Object does not implement interface. Missing methods: write. Missing attributes: writer."
```

## How it works

The `DuckInterface` constructor gets a list of methods
and a list of attributes. The `isImplementedBy` method
iterates given object properties and checks if this object
contains required methods and attributes.

JavaScript types considered as a valid method:

- `function`

JavaScript types considered as a valid attribute:

- `boolean`
- `number`
- `object` (that means also a `null` value)
- `string`
- `symbol`

Types considered as an invalid method nor attribute:

- `undefined`
