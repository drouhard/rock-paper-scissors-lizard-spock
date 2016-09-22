'use strict';

const chai = require('chai');
const expect = chai.expect;

const { rockVs, paperVs, scissorsVs, lizardVs, spockVs } = require('../src/play/matchups.js');

const matchupFuncs = [
    rockVs,
    paperVs,
    scissorsVs,
    lizardVs,
    spockVs
];

describe("matchups returns correct results when", () => {
    it("throwing rock", () => {
        expect(rockVs("Rock")).to.equal("Tie");
        expect(rockVs("Paper")).to.equal("Lose");
        expect(rockVs("Scissors")).to.equal("Win");
        expect(rockVs("Lizard")).to.equal("Win");
        expect(rockVs("Spock")).to.equal("Lose");
    });

    it("throwing paper", () => {
        expect(paperVs("Rock")).to.equal("Win");
        expect(paperVs("Paper")).to.equal("Tie");
        expect(paperVs("Scissors")).to.equal("Lose");
        expect(paperVs("Lizard")).to.equal("Lose");
        expect(paperVs("Spock")).to.equal("Win");
    });

    it("throwing scissors", () => {
        expect(scissorsVs("Rock")).to.equal("Lose");
        expect(scissorsVs("Paper")).to.equal("Win");
        expect(scissorsVs("Scissors")).to.equal("Tie");
        expect(scissorsVs("Lizard")).to.equal("Win");
        expect(scissorsVs("Spock")).to.equal("Lose");
    });

    it("throwing lizard", () => {
        expect(lizardVs("Rock")).to.equal("Lose");
        expect(lizardVs("Paper")).to.equal("Win");
        expect(lizardVs("Scissors")).to.equal("Lose");
        expect(lizardVs("Lizard")).to.equal("Tie");
        expect(lizardVs("Spock")).to.equal("Win");
    });

    it("throwing spock", () => {
        expect(spockVs("Rock")).to.equal("Win");
        expect(spockVs("Paper")).to.equal("Lose");
        expect(spockVs("Scissors")).to.equal("Win");
        expect(spockVs("Lizard")).to.equal("Lose");
        expect(spockVs("Spock")).to.equal("Tie");
    });

});

xdescribe("matchups throws errors when", () => {
    it("receiving null input", () => {
        for (let func of matchupFuncs) {
            console.log(`func is of type: ${typeof func}`);
            console.log(`func is: ${func}`);
            const nullInput = () => {
                func(null);
            };
            expect(nullInput).to.throw(TypeError);
        }
    });

    it("receiving non-string input", () => {
        for (let func of matchupFuncs) {
            const arrayInput = () => {
                func([1,2,3]);
            };
            const numericInput = () => {
                func(3);
            };

            expect(arrayInput).to.throw(TypeError);
            expect(numericInput).to.throw(TypeError);
        };
    });

});
