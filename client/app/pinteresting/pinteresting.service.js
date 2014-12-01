'use strict';

angular.module('cpwApp')
.factory('pinteresting', function () {
    // for some reason, I had the hardest time making this a filter
    // returning rows (as it does now) within the filter caused a $digest recusive loop, causing angular to throw and exception
    // no idea why it was wrong, but this works, so fuck it, ship it
    return function(input, n) {
        n = n || 5;
        // splits input array into many rows of n length each
        if (input.length > n) {
            var rows = [];
            while (input.length) {
                rows.push(input.splice(0, n));
            }
            return rows;
        }
        return [input];
    };
});
