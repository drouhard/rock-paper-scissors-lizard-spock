const checkThrowValidity = (play) => {
    if (typeof play != "string") {
        throw new TypeError(`expected a number, got ${typeof play}`);
    }

    switch (play) {
        case "Rock":
        case "Paper":
        case "Scissors":
        case "Lizard":
        case "Spock":
            return true;
        default:
            throw new Error(`${play} is invalid.
                play must be one of the following strings:
                "Rock"
                "Paper"
                "Scissors"
                "Lizard"
                "Spock"`
            );
    }
}

const rockVs = (versus) => {
    checkThrowValidity(versus);

    switch (versus) {
        case "Rock":
            return "Tie";
            break;
        case "Paper":
        case "Spock":
            return "Lose";
        case "Scissors":
        case "Lizard":
            return "Win";
    }
};

const paperVs = (versus) => {
    checkThrowValidity(versus);

    switch (versus) {
        case "Paper":
            return "Tie";
            break;
        case "Scissors":
        case "Lizard":
            return "Lose";
        case "Spock":
        case "Rock":
            return "Win";
    }
};

const scissorsVs = (versus) => {
    checkThrowValidity(versus);

    switch (versus) {
        case "Scissors":
            return "Tie";
            break;
        case "Spock":
        case "Rock":
            return "Lose";
        case "Lizard":
        case "Paper":
            return "Win";
    }
};

const lizardVs = (versus) => {
    checkThrowValidity(versus);

    switch (versus) {
        case "Lizard":
            return "Tie";
            break;
        case "Rock":
        case "Scissors":
            return "Lose";
        case "Spock":
        case "Paper":
            return "Win";
    }
};

const spockVs = (versus) => {
    checkThrowValidity(versus);

    switch (versus) {
        case "Spock":
            return "Tie";
            break;
        case "Paper":
        case "Lizard":
            return "Lose";
        case "Rock":
        case "Scissors":
            return "Win";
    }
};


module.exports = {
    rockVs,
    paperVs,
    scissorsVs,
    lizardVs,
    spockVs,
    checkThrowValidity
}
