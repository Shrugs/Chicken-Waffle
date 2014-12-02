## Chicken + Waffle

Pairs teammates together every week to hang out and get chicken and waffles, among other things.

## Features

- Pairs teammates together for weekly 1+1 time together where they can hang out and stuff.
- Can also pair non-teammates, while prioritizing teammates.
- Gravatar integration
- Google Places integration for figuring out what to do.

## Installation

1. acquire mongo
2. clone
3. `npm install && bower install`
4. [Acquire Google Places Server API Key](https://developers.google.com/places/documentation/)
4. `export PLACES_API_KEY=<your api key>`
4. `grunt serve`
5. [http://localhost:9000](http://localhost:9000)

Note, because cryptojs (used for gravatar email hashing) claims that its main pacakge is `**/*.js`, which cannot simply be loaded, you'll want to manually change cryptojs/bower.json's `main` key to have `rollup/md5.js` as the value. This is just to keep everyone sane and keep grunt from inserting `**/*.js` into `index.html`.

## Usage

The database is seeded with the various musicians and relationships as below:

- The Beatles
    + paul@mccartney.org
    + john@lennon.org
    + george@harrison.org
    + ringo@starr.org
- The Quarrymen
    + john@lennon.org
    + paul@mccartney.org
    + stu@sutcliffe.org
- Wings
    + paul@mccartney.org
    + linda@mccartney.org
- Plastic Ono Band
    + john@lennon.org
    + yoko@ono.org
- Traveling Wilburys
    + george@harrison.org
    + tom@petty.org
    + roy@orbison.org

All with default password `password`.

You can sign up at `/signup` or by clicking the link in the navbar. After signing up, you can modify your team associations and add new teams.

On the homepage, click the `GENERATE 1+1` button (with the optional `pair loners` check box) so generate a new set of 1+1s. This is stateless, so if you restart the server (and it's running in production because otherwise it resets the database), you will still have deterministically random (lol) pairings.

## Algorithm

The process to pair teammates (in `/server/api/Match/Match.controller.js`) is as follows:

- grab all of the users
    + sort by number of teams they're associated with, ASC
- create a reverse map of teams -> users
- generate combinations of users
    + for each user, create a pair where he pairs with every other possible teammate
- filter out duplicates
    + using a ghetto hash that makes [a, b] === [b, a] for the purposes of the `_.uniq` function
- acquire and increment old nonce from db or set nonce to 0
    + nonce is the index of the first _key_ pair
    + iterates through the pairs containing the user with the most team associations
    + I'm technically using that vocabulary incorrectly because nonce's should be unique and our's loops over itself all the time
- select first key pair using nonce and filter out any pairs that are no longer valid (i.e., users are taken)
- while there are still possible pairs to be made
    + randomly select a new key pair
    + filter out duplicates
- with leftover people (generally those on small teams or only on 1 team)
    + either match with themselves
    + or match with other leftover non-teammates
- store match in database, along with nonce for future


## Future Features

- More event API integration for easy things to do during 1+1 times.
    + Eventbrite
    + Yelp
    + Etc
- Admin console for adding/removing users and team associations.
    + currently you must log into that user and modify associations from there
    + if I have time, I'll add this, but it's not necessary
- Past matches and events attended
    + to help you diversify your events and remember who you last hung out with

## Known Issues

- Forms have no feedback; if you did something wrong, better open up the console and check yourself before you wreck yourself.

## Testing

Tests available for backend controllers (`grunt test:server`).

This was my first serious foray into actual unit testing, so the tests are pretty minimal. I don't have the time to invest in unit tests for the frontend, so those have gone unimplemented.

I wrote tests last because I found them the least interesting portion of the development cycle, but I now realize that if I write them first, at least as a general idea, it'll help me during the programming phase. It'll also combat the fact that I now feel I am 'done' with the project and therefore don't want to work on it anymore, yet I still have to write tests.


## Notes

I used `generator-angular-fullstack` to scaffold out the application, which made a lot of the CRUD operations extremely easy to implement. It also came with basic authentication boilerplate, so I stuck with the auth at the beginning. There are probably some places where an unauthenticated user can modify someone else's data, but I stopped caring about auth after it was deemed not necessary.

### Issues

I tried out `angular-material` for the first time because I've started loving the material design aesthetic. The stylings are great, but I had the hardest time with the flexbox layout engine. I was probably doing something wrong, but my markup is just awful now because when I wanted a stack of centered elements using

```javascript

<div layout="column" layout-align="center center">
  <div>one</div>
  <div>two</div>
  <div>three</div>
</div>

```

(from the tutorial, mind you) it always gave it to me in the row format. Getting things to stack onto each other was a massive pain, and it shows in the markup.

That said, I'll probably try to use it again soon, and this time a bit more carefully to figure out what works and what doesn't.

----



## Todo

- frontend testing