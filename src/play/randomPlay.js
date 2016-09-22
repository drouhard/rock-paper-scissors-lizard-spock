const conversions = require('./conversions');

const randomPlay = () => {
    const min = 1;
    const max = 5;
    return conversions.numToPlay(
        Math.floor(Math.random() * (max - min + 1)) + min
    );
};

module.exports = randomPlay;
