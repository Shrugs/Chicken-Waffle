'use strict';

var _ = require('lodash');
var Team = require('./Team.model');

// Get list of Teams
exports.index = function(req, res) {
  Team.find(function (err, Teams) {
    if(err) { return handleError(res, err); }
    return res.json(200, Teams);
  });
};

// Get a single Team
exports.show = function(req, res) {
  Team.findById(req.params.id, function (err, Team) {
    if(err) { return handleError(res, err); }
    if(!Team) { return res.send(404); }
    return res.json(Team);
  });
};

// Creates a new Team in the DB.
exports.create = function(req, res) {
  Team.create(req.body, function(err, Team) {
    if(err) { return handleError(res, err); }
    return res.json(201, Team);
  });
};

// Updates an existing Team in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Team.findById(req.params.id, function (err, Team) {
    if (err) { return handleError(res, err); }
    if(!Team) { return res.send(404); }
    var updated = _.merge(Team, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, Team);
    });
  });
};

// Deletes a Team from the DB.
exports.destroy = function(req, res) {
  Team.findById(req.params.id, function (err, Team) {
    if(err) { return handleError(res, err); }
    if(!Team) { return res.send(404); }
    Team.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}