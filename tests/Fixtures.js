const ROCK = 1;
const PAPER = 2;
const SCISSORS = 3;
const LIZARD = 4;
const SPOCK = 5;

const WIN = 1;
const LOSE = -1;
const TIE = 0;

const checkThrowValidity = (play) => {
    if (typeof play != "number") {
        throw new TypeError(`expected a number, got ${typeof play}`);
    }

    if (play % 1 != 0) {
        throw new TypeError(`expected a whole number, got ${play}`);
    }

    if (play < 1 || play > 5) {
        throw new RangeError(`expected a number between 1 and 5, got ${play}`);
    } else {
        return true;
    }
}

const rockVs = (versus) => {
    checkThrowValidity(versus);

    switch (versus) {
        case ROCK:
            return TIE;
            break;
        case PAPER:
        case SPOCK:
            return LOSE;
        case SCISSORS:
        case LIZARD:
            return WIN;
        default:
            throw new Error;
    }
}



const possibleThrows = [
    {
    },
];

module.exports = {
    rockVs,
    ROCK,
    PAPER,
    SCISSORS,
    LIZARD,
    SPOCK,
    WIN,
    LOSE,
    TIE
};
