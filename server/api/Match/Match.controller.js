'use strict';

var _ = require('lodash');
var Match = require('./Match.model');
var User = require('../user/user.model');

var MATCH_OUTSIDE_TEAM = true;


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
// @TODO(Shrugs) this
exports.match = function(req, res) {
    getMostRecentMatch(function (err, Match) {
        if(err) { return handleError(res, err); }
        if(!Match) { return res.send(404); }
        // req.params.userId
        return res.json(Match[0]);
    });
};

//
function combinations(user, teams) {
    // return pairs [first, second] of all possible combinations for a given user given his teams
    var combos = [];
    _(user.teams).each(function(team) {
        // for each of his teammates
        // gen [user, teammate]
        combos.push(_(teams[team.name])
            // actually, this is debatable; user-> user pairs might be a convenient way of removing edge cases towards te end of the matching process
            // -> where we have one person without a match (the user->user match will be valid)
            .filter(function(teammate) {
                // filter out [user, user] combos
                return teammate.email !== user.email;
            })
        .map(function(teammate) {
            return [user.email, teammate.email];
        }).value());
    });

    return _(combos).flatten(true).value();
}

// Creates a new Match in the DB.
// super fun logic here
exports.create = function(req, res) {

    // need to create a 'deterministic' method of generating the combinations
    // save the nonce (or whatever) in the match object and use it to generate the next iteration

    // first, get a list of all of the users
    User.find().exec(function(err, users) {
        // then we need to match users up based on the teams they're in
        // start with the users in the most teams, because that's a good heuristic for who has the most options
        // and therefore who everyone else's matches should be governed by
        // for each user, generate combinations of people they could meet
        // then only get uniq ones
        // then simply iterate though the most common -> least common matches each time they want matches
        // for each initial match, do that recursively until there's only one match left per person
        // this is probably a good time to learn some functional programming

        users = _(users).filter(function(user) {
            return user.teams.length;
        }).sortBy(function(user) {
            return user.teams.length;
        }).reverse();

        var emails = users.pluck('email');

        // create a reverse map of teams -> users for convenience
        // need to do the dual pluck because they all have different keys due to the improper seeding
        // if things are made interactively, they should all have the same _id keys
        var teams = {};
        users.pluck('teams').flatten().pluck('name').uniq().each(function(teamName) {
            // for each teamName, get all of the relevant people and add to hashmap
            teams[teamName] = _(users).filter(function(user) {
                return _.contains(_.pluck(user.teams, 'name'), teamName);
            })
        });

        // now generate the combinations
        // for each user, create combos for each user he could possibly match with
        var possiblePairs = _(users).map(function(user) {
            return combinations(user, teams);
        }).flatten(true).uniq(function(pair) {
            // only use uniq pairs by using a ghetto hash
            // known problems with this; is not an actual hashing function, so john@lennon.org will 'hash' the same as 'nhoj@lennon.org'
            // this isn't really an issue for this case,
            // but if it becomes one, use md5 or something; will require separate workaround

            // this line call makes sure that [a, b] === [b, a] for the uniq call
            return (pair[0].toLowerCase() + pair[1].toLowerCase()).split("").sort().join("");
        }).value();

        // now we have the set of all possible pairs
        // we want to select a certain subset of them as valid for this iteration of the matching process

        // therefore, get the most recent match to get the last nonce
        getMostRecentMatch(function(err, match) {
            var pairs = [];


            var nonce = 0;
            if (match.length) {
                // increment if using from db
                nonce = match[0].nonce + 1;
            }

            // method 1:
            // nonce is just whichever pair _must_ happen
            // then every pair must happen at some point
            // decide next pairs by just finding next available pair for that user
            //
            // method 2:
            // user with most pairs is key user
            // iterate through his matches with nonce
            // then recursively do that until we have pairs for everyone

            // going to try #2 first
            // so the list of possible pairs is currently in order, so the first n will all have the same first person
            // we want to select a pair for the first user based on nonce
            // then we can probably ranomize the rest and it isn't a big deal
            // if it _is_ a big deal, we can use a second (or third, etc) nonce to keep track of second- and third-most popular teammembers pairs

            if (possiblePairs[nonce][0] !== possiblePairs[0][0]) {
                // nonce is over first user bounds
                nonce = 0;
            }

            var selectPair = function(i)  {
                var selectedPair = possiblePairs[i];
                pairs.push(selectedPair);
                possiblePairs = _(possiblePairs).filter(function(pair) {
                    // filter out pairs that are no longer possible
                    return (!_.contains(pair, selectedPair[0])) && (!_.contains(pair, selectedPair[1]));
                }).value();
            };

            selectPair(nonce)
            while (possiblePairs.length > 2) {
                // now that we've removed the largest user (and therefore many of the options, selected a random pair as the next key pair)
                selectPair(_.random(0, possiblePairs.length-1));
            }

            // sweet, now we have all of the valid pairs
            // everyone else has to go play video games in the corner or something
            // optionally, we can enable matching people outside of their teams, allowing the stragglers to hang out or whatever
            // because someone who's only on one team will have many less pairing opportunities than his teammate on 2+ teams

            // grab the leftover people and either match with self or randomly with the rest of the available people
            var leftoverPeople = emails.difference(_(pairs).flatten().value()).value();

            if (MATCH_OUTSIDE_TEAM) {
                while (leftoverPeople.length > 1) {
                    var first = leftoverPeople.pop();
                    var second = leftoverPeople.splice(_.random(0, leftoverPeople.length-1), 1)[0];
                    pairs.push([first, second]);
                }
            }

            _(leftoverPeople).each(function(person) {
                pairs.push([person, person]);
            });

            Match.create({
                nonce: nonce,
                pairs: _.map(pairs, function(pair) {
                    return {
                        people: pair
                    };
                })
            }, function(err, Match) {
                if(err) { return handleError(res, err); }
                return res.json(201, Match);
            });

        });

    });

};

// I feel like there should be a datastructure that optimizes for the scenario where
// there's a type with two properties that are linked and separate, but not order dependent
// so you could query on either of the properties
// but the object is just one thing


function handleError(res, err) {
  return res.send(500, err);
}