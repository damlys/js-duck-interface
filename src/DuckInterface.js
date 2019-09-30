/** @module duck-interface */

/**
 * Duck Interface constructor.
 *
 * @param {string[]} methods
 * @param {string[]} [attributes]
 * @constructor
 */
function DuckInterface(methods, attributes = []) {
  this._methods = methods;
  this._attributes = attributes;
}

/**
 * Checks if a given object contains required methods and attributes.
 *
 * @param {Object} object
 * @throws {Error}
 * @returns {undefined}
 */
DuckInterface.prototype.isImplementedBy = function (object) {
  // Check methods
  let missingMethods = [];
  for (let method of this._methods) {
    if (typeof object[method] !== 'function') {
      missingMethods.push(method);
    }
  }

  // Check attributes
  let missingAttributes = [];
  for (let attribute of this._attributes) {
    if (typeof object[attribute] === 'undefined' || typeof object[attribute] === 'function') {
      missingAttributes.push(attribute);
    }
  }

  // Throw an error if missing properties found
  if (missingMethods.length > 0 || missingAttributes.length > 0) {
    let message = 'An object does not implement the interface.';
    if (missingMethods.length > 0) {
      message += ' Missing methods: ' + missingMethods.join(', ') + '.';
    }
    if (missingAttributes.length > 0) {
      message += ' Missing attributes: ' + missingAttributes.join(', ') + '.';
    }
    throw new Error(message);
  }
};

module.exports = {
  DuckInterface
};
