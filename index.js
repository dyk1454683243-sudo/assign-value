'use strict';

var utils = require('./utils');

var UNSAFE_PATH_KEYS = {
  '__proto__': true,
  constructor: true,
  prototype: true
};

function isUnsafePath(prop) {
  if (typeof prop !== 'string') {
    return false;
  }

  var segments = prop.split('.');
  var i = 0;

  for (; i < segments.length; i++) {
    if (UNSAFE_PATH_KEYS[segments[i]] === true) {
      return true;
    }
  }

  return false;
}

module.exports = function assign(obj, prop, value) {
  if (!utils.isObject(obj)) {
    throw new TypeError('expected the first argument to be an object.');
  }

  if (typeof prop === 'undefined' && typeof value === 'undefined') {
    return obj;
  }

  if (typeof value === 'undefined' && utils.isObject(prop)) {
    return utils.extend(obj, prop);
  }

  if (isUnsafePath(prop)) {
    throw new TypeError('cannot assign to prototype path.');
  }

  if (typeof value === 'string') {
    utils.set(obj, prop, value);
    return obj;
  }

  var current = utils.get(obj, prop);
  var val = utils.extend({}, current, value);
  utils.set(obj, prop, val);
  return obj;
};
