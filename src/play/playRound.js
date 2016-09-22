'use strict';
const matchups = require('./matchups');
const randomPlay = require('./randomPlay');

const playRound = (userThrew) => {
    const computerThrow = randomPlay();
    let result;

    switch (userThrew) {
        case 'Rock':
            result = matchups.rockVs(computerThrow);
            break;
        case 'Paper':
            result = matchups.paperVs(computerThrow);
            break;
        case 'Scissors':
            result = matchups.scissorsVs(computerThrow);
            break;
        case 'Lizard':
            result = matchups.lizardVs(computerThrow);
            break;
        case 'Spock':
            result = matchups.spockVs(computerThrow);
            break;
        default:
            console.log(`error! Bad input: ${userThrew}`);
    }
    return {
        userThrow: userThrew,
        computerThrow: computerThrow,
        result: result
    }
}

module.exports = playRound;
