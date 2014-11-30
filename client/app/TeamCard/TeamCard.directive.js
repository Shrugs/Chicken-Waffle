'use strict';

angular.module('cpwApp')
.directive('teamCard', function () {
    return {
        templateUrl: 'app/TeamCard/TeamCard.html',
        restrict: 'EA',
        transclude: true,
        scope: {
            ngModel: '='
        },
        link: function (scope, element, attrs) {

        }
    };
});