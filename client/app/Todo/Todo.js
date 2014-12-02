'use strict';

angular.module('cpwApp')
.config(function ($stateProvider) {
    $stateProvider
        .state('Todo', {
            url: '/todo',
            templateUrl: 'app/Todo/Todo.html',
            controller: 'TodoCtrl'
        });
});