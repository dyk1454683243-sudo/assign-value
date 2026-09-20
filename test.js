'use strict';

/* deps: mocha */
var assert = require('assert');
var should = require('should');
var assign = require('./');

describe('assign', function () {
  it('should extend a value:', function () {
    var obj = {};
    assign(obj, {a: 'b'})
    obj.should.eql({a: 'b'});
  });

  it('should assign a nested value:', function () {
    var obj = {};
    assign(obj, 'foo', {a: 'b'})
    obj.foo.should.eql({a: 'b'});
  });

  it('should work for key/value pairs:', function () {
    var obj = {};
    assign(obj, 'foo', 'b');
    obj.foo.should.equal('b');
  });

  it('should extend an existing value:', function () {
    var obj = {foo: {a: 'b'}};
    assign(obj, 'foo', {c: 'd'})
    obj.foo.should.eql({a: 'b', c: 'd'});
  });

  it('should assign a deeply nested value:', function () {
    var obj = {};
    assign(obj, 'a.b.c', {one: 'two'});
    assign(obj, 'a.b.c', {three: 'four'});
    obj.a.b.c.should.eql({one: 'two', three: 'four'});
  });

  it('should throw an error when invalid args are passed:', function () {
    (function () {
      assign();
    }).should.throw('expected the first argument to be an object.');
  });

  it('should not pollute Object.prototype via __proto__ path:', function () {
    delete Object.prototype.polluted;

    (function () {
      assign({}, '__proto__.polluted', 'yes');
    }).should.throw('cannot assign to prototype path.');

    assert.strictEqual({}.polluted, undefined);
    assert.strictEqual(Object.prototype.hasOwnProperty('polluted'), false);
  });

  it('should not pollute Object.prototype via constructor.prototype path:', function () {
    delete Object.prototype.polluted;

    (function () {
      assign({}, 'constructor.prototype.polluted', 'yes');
    }).should.throw('cannot assign to prototype path.');

    assert.strictEqual({}.polluted, undefined);
    assert.strictEqual(Object.prototype.hasOwnProperty('polluted'), false);
  });

  it('should still assign a normal nested path like a.b.c:', function () {
    var obj = {};
    assign(obj, 'a.b.c', 'yes');
    obj.a.b.c.should.equal('yes');
  });
});
