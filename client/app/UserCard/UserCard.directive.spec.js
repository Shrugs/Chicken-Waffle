'use strict';

describe('Directive: UserCard', function () {

  // load the directive's module and view
  beforeEach(module('cpwApp'));
  beforeEach(module('app/UserCard/UserCard.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<-user-card></-user-card>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the UserCard directive');
  }));
});