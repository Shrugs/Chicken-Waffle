/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var Team = require('../api/Team/Team.model').model;

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('Populated Users...');
    }
  );
});

Team.find({}).remove(function() {
    Team.create({
        name: 'Data'
    }, {
        name: 'Frontend'
    }, {
        name: 'Backend'
    }, {
        name: 'Ops'
    }, {
        name: 'Test Team, Please Ignore'
    }, function() {
        console.log('Populated Teams...');
    });
})