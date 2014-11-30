'use strict';

describe('Directive: TeamCard', function () {

  // load the directive's module and view
  beforeEach(module('cpwApp'));
  beforeEach(module('app/TeamCard/TeamCard.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<-team-card></-team-card>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the TeamCard directive');
  }));
});