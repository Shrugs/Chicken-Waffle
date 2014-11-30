'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    User = require('../user/user.model');

var TeamSchema = new Schema({
  name: String,
  members: [User]
});

module.exports = mongoose.model('Team', TeamSchema);