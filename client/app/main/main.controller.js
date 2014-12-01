'use strict';

angular.module('cpwApp')
.controller('MainCtrl', function ($scope, $window, Auth) {
    $scope.generate1plus1s = function() {

    };

    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.height = $window.innerHeight;

    // $scope.matches = [
    //     {
    //         first: {
    //             email: 'm@cond.in'
    //         },
    //         second: {
    //             email: 'mattcmultimedia@gmail.com'
    //         }
    //     },
    //     {
    //         first: {
    //             email: 'm@cond.in'
    //         },
    //         second: {
    //             email: 'mattcmultimedia@gmail.com'
    //         }
    //     }
    // ];
});
