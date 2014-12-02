'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('GET /api/todo', function() {

    it('should insert a new team in the db', function(done) {
        request(app)
            .get('/api/todo')
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Object);
                res.body.results.should.be.instanceof(Array);
                done();
            });
    });

});