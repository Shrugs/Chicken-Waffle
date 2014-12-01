'use strict';

angular.module('cpwApp')
.controller('AdminCtrl', function ($scope, $http, Auth, User, pinteresting) {

    // Use the User $resource to fetch all users
    User.query(function(users) {
        $scope.users = pinteresting(users, 3);
    });

    $scope.delete = function(user) {
        User.remove({ id: user._id });
        angular.forEach($scope.users, function(u, i) {
            if (u === user) {
            $scope.users.splice(i, 1);
            }
        });
    };
});
