const React = require('react');

const Play = React.createClass({
    propTypes: {
        throwWith: React.PropTypes.func.isRequired
    },

    throwRock() {
        this.props.throwWith("Rock");
    },

    throwPaper() {
        this.props.throwWith("Paper");
    },

    throwScissors() {
        this.props.throwWith("Scissors");
    },

    throwLizard() {
        this.props.throwWith("Lizard");
    },

    throwSpock() {
        this.props.throwWith("Spock");
    },

    render() {
        return (
            <div>
                <p>Choose one:</p>
                <button className="play-choice" value="Rock" onClick={this.throwRock}>Rock</button>
                <button className="play-choice" value="Paper" onClick={this.throwPaper}>Paper</button>
                <button className="play-choice" value="Scissors" onClick={this.throwScissors}>Scissors</button>
                <button className="play-choice" value="Lizard" onClick={this.throwLizard}>Lizard</button>
                <button className="play-choice" value="Spock" onClick={this.throwSpock}>Spock</button>
            </div>
        );
    }
});

module.exports = Play;
