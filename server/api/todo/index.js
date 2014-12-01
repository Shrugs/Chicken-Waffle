'use strict';

var config = require('../../config/environment');
var http = require('http');
var request = require('request');
var Q = require('q');

var now = Date.now();
var eventbriteURL = 'https://www.eventbriteapi.com/v3/events/search?popular=true&venue.city=San+Francisco&start_date.keyword=today&token=' + config.secrets.eventbriteAPIKey
var placesURL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=37.7834213,-122.4084272&radius=2000&key=' + config.secrets.placesAPIKey

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

        request.get(placesURL, function(e, r, body) {
            data.places = JSON.parse(body);
            deferred.resolve(data);
        });

        return deferred.promise;
    }

    getEventbrite({}).then(getYelp).then(function(data) {
        res.json(data);
    });
};