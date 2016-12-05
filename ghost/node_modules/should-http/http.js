/*!
 * Should
 * Copyright(c) 2010-2014 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

module.exports = function(should, Assertion) {
  var i = should.format;

  /**
   * Asserts given object has property headers which contain `field` and optional `val`. Will work well with node Request/Response etc.
   *
   * @name header
   * @memberOf Assertion
   * @category assertion http
   * @module should-http
   * @param {string} field Name of field
   * @param {string} [val] Optional value of field
   * @example
   *
   * res.should.have.header('content-type', 'application/json');
   */
  Assertion.add('header', function(field, val) {
    this.have.property('headers');
    this.params = { obj: '{ ..., headers: ' + i(this.obj) + ', ... }', operator: 'to have header ' + i(field) + (val !== undefined ? (':' + i(val)) : '') };
    if (val !== undefined) {
      this.have.property(field.toLowerCase(), val);
    } else {
      this.have.property(field.toLowerCase());
    }
  });

  /**
   * Asserts given object has property statusCode which equal to `code`. Works well with node's Response.
   *
   * @name status
   * @memberOf Assertion
   * @category assertion http
   * @module should-http
   * @param {number} code Status code value
   * @example
   *
   * res.should.have.status(200);
   */
  Assertion.add('status', function(code) {
    var obj = this.obj;
    var copy = { body: obj.body, statusCode: obj.statusCode };

    copy.should.have.property('statusCode', code);
  });

  /**
   * Shortcut for .should.header('content-type', 'application/json')
   *
   * @name json
   * @memberOf Assertion
   * @category assertion http
   * @module should-http
   * @example
   *
   * res.should.be.json();
   */
  Assertion.add('json', function() {
    this.have.header('content-type').match(/application\/json/i);
  });

  /**
   * Shortcut for .should.header('content-type', 'text/html')
   *
   * @name html
   * @memberOf Assertion
   * @category assertion http
   * @module should-http
   * @example
   *
   * res.should.be.html();
   */
  Assertion.add('html', function() {
    this.have.header('content-type').match(/text\/html/i);
  });
};

