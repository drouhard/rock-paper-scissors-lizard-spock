const React = require('react');

const Play = require('./Play.jsx');

const Game = React.createClass({
    propTypes: {
        name: React.PropTypes.string.isRequired,
        waiting: React.PropTypes.bool.isRequired,
        lastResult: React.PropTypes.object
    },

    waitMsg() {
        return <p>Waiting for computer to play</p>
    },

    showGame() {
        return <Play throwWith={this.props.throwWith} />
    },

    renderResults() {
        return (
            <div className="results">
                <p>Results from the last round:</p>
                <ul>
                    <li>You threw {this.props.lastResult.userThrow}</li>
                    <li>Computer threw {this.props.lastResult.computerThrow}</li>
                    <li>You <b>{this.props.lastResult.result}</b>!</li>
                </ul>
                <h3>Current win streak: {this.props.lastResult.currentScore}</h3>
            </div>
        )
    },

    render() {
        return (
            <section>
                <p>Ready, {this.props.name}?</p>
                {
                    this.props.waiting ?
                    this.waitMsg() :
                    this.showGame()
                }
                {
                    this.props.lastResult ?
                    this.renderResults()
                    : null
                }
            </section>
        );
    }
});

module.exports = Game;
