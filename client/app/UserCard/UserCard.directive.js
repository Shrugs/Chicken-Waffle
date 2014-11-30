'use strict';

angular.module('cpwApp')
.directive('userCard', function () {
    return {
        templateUrl: 'app/UserCard/UserCard.html',
        restrict: 'EA',
        link: function (scope, element, attrs) {
            scope.email = attrs.email;
            scope.hash = window.CryptoJS.MD5(attrs.email.toLowerCase()).toString();
        }
    };
});