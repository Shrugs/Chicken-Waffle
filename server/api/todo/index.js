'use strict';

var config = require('../../config/environment');
var http = require('http');
var request = require('request');
var Q = require('q');

var now = Date.now();
var eventbriteURL = 'https://www.eventbriteapi.com/v3/events/search?popular=true&venue.city=San+Francisco&start_date.keyword=today&token=' + config.secrets.eventbriteAPIKey

module.exports = function(req, res) {

    function getEventbrite(data) {
        var deferred = Q.defer();

        request.get(eventbriteURL, function(e, r, body) {
            data.eventbrite = JSON.parse(body);
            deferred.resolve(data);
        });

        return deferred.promise;
    }

    function getYelp(data) {
        var deferred = Q.defer();

        data.yelp = {lol: 'k'};
        deferred.resolve(data);

        return deferred.promise;
    }

    getEventbrite({}).then(getYelp).then(function(data) {
        res.json(data);
    });
};