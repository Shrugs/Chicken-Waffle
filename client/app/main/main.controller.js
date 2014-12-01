'use strict';

angular.module('cpwApp')
.controller('MainCtrl', function ($scope, $window, Auth, Match) {

    $scope.updateMatches = function() {
        Match.get().$promise.then(function(match) {
            // make the results pretty if you're logged in (you're always top right)
            if (Auth.isLoggedIn()) {
                $scope.pairs = match.pairs.sort(function(pair) {
                    return pair.people.indexOf(Auth.getCurrentUser().email) !== -1;
                }).reverse();
                if ($scope.pairs[0].people[1] === Auth.getCurrentUser().email) {
                    $scope.pairs[0].people = [Auth.getCurrentUser().email, $scope.pairs[0].people[0]];
                }
            } else {
                // else, no worries
                $scope.pairs = match.pairs;
            }
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
