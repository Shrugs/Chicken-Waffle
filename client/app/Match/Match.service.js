'use strict';

angular.module('cpwApp')
.factory('Match', function ($resource) {
    return $resource('/api/matches/:id');
});
