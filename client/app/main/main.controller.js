'use strict';

angular.module('cpwApp')
.controller('MainCtrl', function ($scope, $window, Auth, Match) {
    $scope.generate1plus1s = function() {
        // generate new matches and reload
    };

    Match.get().$promise.then(function(match) {
        $scope.pairs = match.pairs;
    });

    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.height = $window.innerHeight;

    // $scope.pairs = [
    //     {
    //         people: ['m@cond.in', 'mattcmultimedia@gmail.com']
    //     },
    //     {
    //         people: ['m@cond.in', 'mattcmultimedia@gmail.com']
    //     },
    // ];
});
