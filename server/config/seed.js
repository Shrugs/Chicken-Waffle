/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var Team = require('../api/Team/Team.model').model;
var Match = require('../api/Match/Match.model');

// The Beatles
//     paul@mccartney.org
//     john@lennon.org
//     george@harrison.org
//     ringo@starr.org
// The Quarrymen
//     john@lennon.org
//     paul@mccartney.org
//     stu@sutcliffe.org
// Wings
//     paul@mccartney.org
//     linda@mccartney.org
// Plastic Ono Band
//     john@lennon.org
//     yoko@ono.org
// Traveling Wilburys
//     george@harrison.org
//     tom@petty.org
//     roy@orbison.org

Team.find({}).remove(function() {
    Team.create(
    {
        name: 'The Beatles'
    },
    {
        name: 'The Quarrymen'
    },
    {
        name: 'Wings'
    },
    {
        name: 'Plastic Ono Band'
    },
    {
        name: 'Traveling Wilburys'
    },
    {
        name: 'Test Team, Please Ignore'
    }, function() {
        console.log('Populated Teams...');
    });
});


// cool, so this isn't linking teams and users like I thought it would
// but that doesn't matter because the keys are the teams names
//  which are consistent
// this just means that I should not use team._id to do stuff
// I could make it use the correct team instance, but that's a lot mroe typing when this will work for our needs

User.find({}).remove(function() {
  User.create(
  {
    provider: 'local',
    email: 'paul@mccartney.org',
    password: 'password',
    teams: [
        {name: 'The Beatles'},
        {name: 'The Quarrymen'},
        {name: 'Wings'}
    ]
  },
  {
    provider: 'local',
    email: 'john@lennon.org',
    password: 'password',
    teams: [
        {name: 'The Beatles'},
        {name: 'The Quarrymen'},
        {name: 'Plastic Ono Band'}
    ]
  },
  {
    provider: 'local',
    email: 'george@harrison.org',
    password: 'password',
    teams: [
        {name: 'The Beatles'},
        {name: 'Traveling Wilburys'}
    ]
  },
  {
    provider: 'local',
    email: 'ringo@starr.org',
    password: 'password',
    teams: [{name: 'The Beatles'}]
  },
  {
    provider: 'local',
    email: 'stu@sutcliffe.org',
    password: 'password',
    teams: [{name: 'The Quarrymen'}]
  },
  {
    provider: 'local',
    email: 'linda@mccartney.org',
    password: 'password',
    teams: [{name: 'Wings'}]
  },
  {
    provider: 'local',
    email: 'yoko@ono.org',
    password: 'password',
    teams: [{name: 'Plastic Ono Band'}]
  },
  {
    provider: 'local',
    email: 'tom@petty.org',
    password: 'password',
    teams: [{name: 'Traveling Wilburys'}]
  },
  {
    provider: 'local',
    email: 'roy@orbison.org',
    password: 'password',
    teams: [{name: 'Traveling Wilburys'}]
  },
  {
    provider: 'local',
    role: 'admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('Populated Users...');
    }
  );
});

Match.find({}).remove(function() {
    Match.create({
        nonce: 0,
        pairs: [
            {
                people: ['m@cond.in', 'mattcmultimedia@gmail.com']
            },
            {
                people: ['m@cond.in', 'mattcmultimedia@gmail.com']
            }
        ]
    }, function() {
        console.log('Populated Matches...');
    })
});