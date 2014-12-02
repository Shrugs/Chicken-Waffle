'use strict';

angular.module('cpwApp')
.controller('TodoCtrl', function ($scope, $http, pinteresting) {
    $http.get('/api/todo').then(function(data) {
        $scope.places = pinteresting(data.data.results, 3);
    });
})
.filter('urlencode', function() {
    return encodeURIComponent;
});