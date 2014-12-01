'use strict';

angular.module('cpwApp')
.controller('SettingsCtrl', function ($scope, User, Auth, Team) {
    $scope.errors = {};

    // for some reason, I had the hardest time making this a filter
    // returning rows (as it does now) within the filter caused a $digest recusive loop, causing angular to throw and exception
    // no idea why it was wrong, but this works, so fuck it, ship it
    $scope.pinteresting = function(input, n) {
        n = n || 5;
        // splits input array into many rows of n length each
        if (input.length > n) {
            var rows = [];
            while (input.length) {
                rows.push(input.splice(0, n));
            }
            return rows;
        }
        return input;
    };

    var teams = Team.query(function() {
        $scope.teams = $scope.pinteresting(teams, 5);
    });
    $scope.selectedTeams = {};
    Auth.getCurrentUser().$promise.then(function(user) {
        // when user loaded, update selectedTeams
        angular.forEach(user.teams, function(team) {
            $scope.selectedTeams[team.name] = true;
        });
    });

    $scope.$watch('selectedTeams', function(selectedTeams) {
        // update user's teams when they change selection
        Auth.isLoggedInAsync(function(isLoggedIn) {
            if (isLoggedIn) {
                var teams = [];
                angular.forEach(selectedTeams, function(v, k) {
                    if (v) {
                        teams.push(k);
                    }
                });
                var thisUser = Auth.getCurrentUser();

                if (!angular.equals(thisUser.teams, teams)) {
                    thisUser.teams = teams;
                    thisUser.$save();
                }
            }
        });
    }, true);

    $scope.createNewTeam = function() {
        // post new team and then reload $scope.teams
        (new Team({name: $scope.newTeamName})).$save(function() {
            $scope.teams = Team.query();
            $scope.newTeamName = undefined;
        });
    };





    $scope.changePassword = function(form) {
        $scope.submitted = true;
        if(form.$valid) {
            Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
            .then( function() {
                $scope.message = 'Password successfully changed.';
                $scope.user.oldPassword = undefined;
                $scope.user.newPassword = undefined;

            })
            .catch( function() {
                form.password.$setValidity('mongoose', false);
                $scope.errors.other = 'Incorrect password';
                $scope.message = '';
            });
        }
    };
});
