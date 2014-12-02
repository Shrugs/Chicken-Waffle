'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var Match = require('./Match.model');

var then = Date.now();

describe('POST /api/match', function() {

    it('should create a match', function(done) {
        request(app)
            .post('/api/match')
            .send({pairOutsideTeam: false})
            .expect(201)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });

    // it('should return the just created match', function(done) {
    //     request(app)
    //         .get('/api/match')
    //         .expect(200)
    //         .expect('Content-Type', /json/)
    //         .end(function(err, res) {
    //             if (err) return done(err);
    //             res.body.should.be.an.instanceof(Object);
    //             console.log(res);
    //             should(res.body.timestamp).be.above(then);
    //             done();
    //         });
    // });
});