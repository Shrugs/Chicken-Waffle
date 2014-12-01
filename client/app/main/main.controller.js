'use strict';

angular.module('cpwApp')
.controller('MainCtrl', function ($scope, $window) {
    $scope.generate1plus1s = function() {
        console.log('test');
    };

    $scope.matches = [
        {
            first: {
                email: 'm@cond.in'
            },
            second: {
                email: 'mattcmultimedia@gmail.com'
            }
        },
        {
            first: {
                email: 'm@cond.in'
            },
            second: {
                email: 'mattcmultimedia@gmail.com'
            }
        }
    ];

    $scope.height = $window.innerHeight;
});
