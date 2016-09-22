const playToNum = (str) => {
    switch (str) {
        case "Rock":
            return 1;
        case "Paper":
            return 2;
        case "Scissors":
            return 3;
        case "Lizard":
            return 4;
        case "Spock":
            return 5;
        default:
            console.log(`error! Bad input!`);
    }
}

const numToPlay = (int) => {
    switch (int) {
        case 1:
            return "Rock";
        case 2:
            return "Paper";
        case 3:
            return "Scissors";
        case 4:
            return "Lizard";
        case 5:
            return "Spock";
        default:
            console.log(`error! Bad input!`);
    }
}

module.exports = {
    numToPlay,
    playToNum
}
