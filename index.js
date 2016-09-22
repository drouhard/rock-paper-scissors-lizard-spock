'use strict';

// set up express and request helpers
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const port = process.env.PORT || 5000;

// the function that gives the results of a round
const playRound = require('./src/play/playRound');

// Firebase database setup
const firebase = require('./src/firebaseSetup.js');
const db = firebase.db;


// Get the current top 10 scores
// TODO: Implement a store so currentHighScores isn't just a global.
let currentHighScores;
const topTenQuery = db.ref('/highScores').orderByChild('score').limitToLast(10);

topTenQuery.once('value', (snapshot) => {
    currentHighScores = snapshot.val();
    // Reset database to only the top 10 high scores.
    // TODO: Do this as a cron job
    db.ref('/highScores').set(currentHighScores);
});

app.use(express.static('srv'));
app.use(bodyParser.json());

const server = app.listen(port, function() {
    console.log(`Listening on port ${port}`);
});

const io = require('socket.io').listen(server);


// TODO: move these to separate error utilities module
function handleError(res, message, code) {
    console.log("ERROR: " + message);
    res.status(code || 500).json({
        "error": message
    });
}

const isValidThrow = (play) => {
    switch (play) {
        case "Rock":
        case "Paper":
        case "Scissors":
        case "Lizard":
        case "Spock":
            return true;
        default:
            return false;
    }
}

// Our main API Route.
// Expects req.body to be a JSON object like this:
// {
//   name: stringUsername
//   thrown: stringPossibleThrow
// }
// Returns a JSON response that has the round results and scores
app.post('/play', jsonParser, function(req, res) {
    // error if empty response or no name given
    if (!req.body || !req.body.name) {
        return res.sendStatus(400);
    }

    // error if invalid throw
    if (!isValidThrow(req.body.thrown)) {
        handleError(res, `expected one of:
            "Rock",
            "Paper",
            "Scissors",
            "Lizard",
            "Spock",
            got ${req.body.thrown}`);
    } else {
        const name = req.body.name;
        const userRef = db.ref(`users/${name}`);
        let currentScore;

        const completedRound = playRound(req.body.thrown);
        completedRound.name = name;
        completedRound.highScores = currentHighScores;

        if (completedRound.result === "Tie") {
            userRef.once('value').then(function(snapshot) {
                // The first promise succeeded. Save snapshot for later.
                currentScore = snapshot.val();
                // By returning a Promise, we know the function passed to "then" below
                // will execute after the transaction finishes.
            }).then(function() {
                // All promises succeeded.
                completedRound.currentScore = currentScore;
                res.send(completedRound);
            }, function(error) {
                // Something went wrong.
                console.error(error);
            });
        }

        if (completedRound.result === "Win") {
            userRef.once('value').then(function(snapshot) {
                currentScore = snapshot.val();

                return userRef.transaction(function(current) {
                    return (current || 0) + 1;
                });
            }).then(function(userScoreTxn) {
                completedRound.currentScore = userScoreTxn.snapshot.val();
                res.send(completedRound);
            }, function(error) {
                // Something went wrong.
                console.error(error);
            });
        }

        if (completedRound.result === "Lose") {
            userRef.once('value').then(function(snapshot) {
                currentScore = snapshot.val();

                let rawScores = [];
                completedRound.newHighScore = false;

                if (currentHighScores.length) {
                    for (let id in currentHighScores) {
                        let score = currentHighScores[id].score;
                        rawScores.push(currentHighScores[id].score);
                    }
                    rawScores.sort();

                    if (currentScore > rawScores[rawScores.length - 1]) {
                        completedRound.newHighScore = true;
                    }
                }

                // Get a key for a new score.
                const newScoreKey = db.ref('highScores/').push().key;

                return db.ref('highScores/' + newScoreKey).set(
                    {name: snapshot.key, score: currentScore}
                );
            }).then(function() {
                return topTenQuery.once('value', (snapshot) => {
                    completedRound.highScores = currentHighScores = snapshot.val();
                });
            }).then(function(){
                return userRef.transaction(function(current) {
                    return 0;
                });
            }).then(function(userScoreTxn) {
                completedRound.currentScore = userScoreTxn.snapshot.val();
                res.send(completedRound);
            }, function(error) {
                console.error(error);
            });
        }
    }
});
