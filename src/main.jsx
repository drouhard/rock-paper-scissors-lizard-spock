const React = require('react');
const ReactDOM = require('react-dom');
const request = require('superagent');
const socket = window.socket;

const Username = require('./components/Username');
const Game = require('./components/Game');

const App = React.createClass({
    getInitialState() {
        return {
            name: '',
            waiting: false,
            lastResult: null,
            connectionToServer: true,
        }
    },

    componentDidMount(){
        socket.on('disconnect', () => {
            this.setState({connectionActive: false})
        });

        socket.on('connect', () => {
            this.setState({connectionActive: true});
        });
    },

    submitUsername(name) {
        // TODO: better sanitizing and messaging here
        name = encodeURIComponent(name).replace(/\./g, '');
        this.setState({name: name});
    },

    renderHighScores() {
        const scores = this.state.lastResult.highScores;
        let highScores = [];
        for (let id in scores) {
            let item = scores[id];
            highScores.push({
                name: item.name,
                score: item.score
            });
        }

        highScores.sort((a, b) => {
            return b.score - a.score;
        })

        const highScoreNodes = highScores.map( (el, index) => {
            return (
                <li key={index}>{el.name}: {el.score}</li>
            );
        });

        return (
            <div>
                <h2>High Scores</h2>
                <ol className="high-scores">
                    {highScoreNodes}
                </ol>
            </div>
        )
    },

    processGameResult(err, res) {
        if (err) {
            console.log(`error! ${err}`);
            console.log(`msg from server is: ${res.text}`);
            this.setState({waiting: false});
        } else {
            this.setState({
                lastResult: res.body,
                waiting: false
            });
        }
    },

    throwWith(play) {
        this.setState({waiting: true});
        // make api call
        request.post('/play')
        .send({ name: this.state.name, thrown: play })
        .end(this.processGameResult);
    },

    renderConnectionBanner() {
        return (this.state.connectionActive ?
            <span className="connection-banner active">
                Connected to server.
            </span> :
            <span className="connection-banner">
                Disconnected from server.
            </span>
        );
    },

    render() {
        return (
            <div>
                {this.renderConnectionBanner()}

            <header><h1>Rock, Paper, Scissors, Lizard, Spock!</h1></header>

            <main>


                {this.state.name ?
                    <Game
                        name={this.state.name}
                        throwWith={this.throwWith}
                        waiting={this.state.waiting}
                        lastResult={this.state.lastResult}
                    /> :
                    <Username submitUsername={this.submitUsername} />
                }
                {this.state.lastResult ?
                    this.renderHighScores() :
                    null
                }
            </main>

            <footer>
                <p>Made with ♥️ by <a href="https://mattdrouhard.com">Matt Drouhard</a></p>
            </footer>
        </div>
        );
    }
});

ReactDOM.render(< App />, document.getElementById('mount'));
