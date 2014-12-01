'use strict';

var _ = require('lodash');
var Match = require('./Match.model');

function getMostRecentMatch(cb) {
    Match.find({
      timestamp: {$lt: Date.now()}
    }).sort({timestamp: -1}).limit(1).exec(cb)
}

// Get first Match
exports.index = function(req, res) {
    getMostRecentMatch(function (err, Match) {
        if(err) { return handleError(res, err); }
        return res.json(200, Match[0]);
    });
};

// Get a single Match based on user id
exports.match = function(req, res) {
    getMostRecentMatch(function (err, Match) {
        if(err) { return handleError(res, err); }
        if(!Match) { return res.send(404); }
        // req.params.userId
        return res.json(Match);
    });
};

// Creates a new Match in the DB.
// super fun logic here
exports.create = function(req, res) {





    Match.create(req.body, function(err, Match) {
        if(err) { return handleError(res, err); }
        return res.json(201, Match);
    });
};

function handleError(res, err) {
  return res.send(500, err);
}