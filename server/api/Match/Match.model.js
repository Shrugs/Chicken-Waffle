'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MatchSchema = new Schema({
    timestamp: {
        type: Date,
        default: Date.now
    },
    nonce: Number,
    // I could use the UserSchema here, but I'm focusing on the algorithm, so I'll just ignore this for now
    // is a simple array of pairs [first, second]
    pairs: [
        {
            people: [String]
        }
    ]
});

module.exports = mongoose.model('Match', MatchSchema);