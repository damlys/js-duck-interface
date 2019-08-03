const { DuckInterface } = require('../src/DuckInterface');

test('passes a correct implementation', () => {
  let object = {
    a1: null,
    a2: false,
    a3: 0,
    a4: '',
    a5: Symbol('whatever'),
    m1: function () {},
    m2: function () {},
    m3: function () {}
  };

  let iNothingable = new DuckInterface(['m1', 'm2', 'm3'], ['a1', 'a2', 'a3', 'a4', 'a5']);

  iNothingable.isImplementedBy(object);
});

test('throws error for missing methods', () => {
  let object = {
    m1: function () {}
  };

  let iNothingable = new DuckInterface(['m1', 'm2', 'm3']);

  expect(() => iNothingable.isImplementedBy(object)).toThrow('Missing methods: m2, m3.');
});

test('throws error for missing attributes', () => {
  let object = {
    a1: null
  };

  let iNothingable = new DuckInterface([], ['a1', 'a2', 'a3']);

  expect(() => iNothingable.isImplementedBy(object)).toThrow('Missing attributes: a2, a3.');
});

test('throws error for missing methods and attributes', () => {
  let object = {
    a1: null,
    m1: function () {}
  };

  let iNothingable = new DuckInterface(['m1', 'm2', 'm3'], ['a1', 'a2', 'a3']);

  expect(() => iNothingable.isImplementedBy(object)).toThrow('Missing methods: m2, m3. Missing attributes: a2, a3.');
});

test('throws error for attributes defined as methods', () => {
  let object = {
    a1: null,
    a2: false,
    a3: 0,
    a4: '',
    a5: Symbol('whatever')
  };

  let iNothingable = new DuckInterface(['a1', 'a2', 'a3', 'a4', 'a5']);

  expect(() => iNothingable.isImplementedBy(object)).toThrow('Missing methods: a1, a2, a3, a4, a5.');
});

test('throws error for methods defined as attributes', () => {
  let object = {
    m1: function () {},
    m2: function () {},
    m3: function () {}
  };

  let iNothingable = new DuckInterface([], ['m1', 'm2', 'm3']);

  expect(() => iNothingable.isImplementedBy(object)).toThrow('Missing attributes: m1, m2, m3.');
});

test('throws error for methods and attributes with undefined value', () => {
  let object = {
    a1: undefined,
    m1: undefined
  };

  let iNothingable = new DuckInterface(['m1'], ['a1']);

  expect(() => iNothingable.isImplementedBy(object)).toThrow('Missing methods: m1. Missing attributes: a1.');
});
