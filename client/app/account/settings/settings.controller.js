'use strict';

angular.module('cpwApp')
.controller('SettingsCtrl', function ($scope, User, Auth, Team) {
    $scope.errors = {};

    $scope.teams = Team.query();
    $scope.myTeams = Auth.getCurrentUser().teams;
    $scope.selectedTeams = {};
    $scope.$watch('myTeams', function() {
        // when myTeams changes, update selectedTeams
        angular.forEach($scope.myTeams, function(team) {
            $scope.selectedTeams[team.name] = true;
        });
    }, true);

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
                thisUser.teams = teams;
                thisUser.$save();
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
