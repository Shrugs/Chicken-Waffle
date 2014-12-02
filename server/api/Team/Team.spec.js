'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var Team = require('./Team.model');
var _ = require('lodash');

var name = 'Yet Another Test Team';

describe('POST /api/teams', function() {

    it('should insert a new team in the db', function(done) {
        request(app)
            .post('/api/teams')
            .send({name: name})
            .expect(201)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });

});

describe('GET /api/teams', function() {

    it('should respond with JSON array', function(done) {
        request(app)
            .get('/api/teams')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Array);
                should(_.contains(_.pluck(res.body, 'name'), name)).eql(true);
                done();
            });
    });
});