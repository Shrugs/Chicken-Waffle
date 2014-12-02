'use strict';

var config = require('../../config/environment');
var http = require('http');
var request = require('request');

var placesURL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=37.7834213,-122.4084272&radius=2000&key=' + config.secrets.placesAPIKey

module.exports = function(req, res) {
    request.get(placesURL, function(e, r, body) {
        res.json(JSON.parse(body));
    });
};