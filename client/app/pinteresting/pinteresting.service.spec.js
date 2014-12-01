'use strict';

describe('Service: pinteresting', function () {

  // load the service's module
  beforeEach(module('cpwApp'));

  // instantiate service
  var pinteresting;
  beforeEach(inject(function (_pinteresting_) {
    pinteresting = _pinteresting_;
  }));

  it('should do something', function () {
    expect(!!pinteresting).toBe(true);
  });

});
