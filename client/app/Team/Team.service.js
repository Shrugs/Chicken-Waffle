'use strict';

angular.module('cpwApp')
.factory('Team', function ($resource) {
    return $resource('/api/teams/:id', {
        id: '@_id'
    });
});
