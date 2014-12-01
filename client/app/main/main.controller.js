'use strict';

angular.module('cpwApp')
.controller('MainCtrl', function ($scope, $window, Auth, Match) {

    $scope.updateMatches = function() {
        Match.get().$promise.then(function(match) {
            $scope.pairs = match.pairs;
        });
    };

    $scope.updateMatches();

    $scope.generate1plus1s = function() {
        // generate new matches and reload
        var newMatch = new Match();
        newMatch.pairOutsideTeam = $scope.pairOutsideTeam;
        newMatch.$save(function() {
            $scope.updateMatches();
        });
    };

    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.height = $window.innerHeight;
});
