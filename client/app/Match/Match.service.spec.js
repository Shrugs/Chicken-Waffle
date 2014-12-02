'use strict';

describe('Service: Match', function () {

  // load the service's module
  beforeEach(module('cpwApp'));

  // instantiate service
  var Match;
  beforeEach(inject(function (_Match_) {
        Match = _Match_;
  }));

  it('should do something', function () {
        expect(!!Match).toBe(true);
  });

});
