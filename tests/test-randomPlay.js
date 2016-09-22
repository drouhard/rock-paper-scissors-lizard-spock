'use strict';

const chai = require('chai');
const expect = chai.expect;

const randomPlay = require('../src/play/randomPlay.js');

describe("randomPlay", () => {
    it("returns a valid play string", () => {
        let timesRun = 0;
        while (timesRun < 1000) {
            timesRun++;
            const result = randomPlay();
            expect(result).to.be.oneOf(['Rock', 'Paper', 'Scissors', 'Lizard', 'Spock']);
        }
    });
});
