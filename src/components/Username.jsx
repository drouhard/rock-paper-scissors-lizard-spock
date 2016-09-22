const React = require('react');

const Username = React.createClass({
    propTypes: {
        submitUsername: React.PropTypes.func.isRequired
    },

    setInputReference: function(inputReference) {
        this.inputElement = inputReference;
    },

    clickHandler() {
        const name = this.inputElement.value;
        this.props.submitUsername(name);
    },

    render() {
        return (
            <div>
                <label>Enter your name for posterity</label>
                <input type="text" defaultValue="Matt" placeholder="Leroy Jenkins" ref={this.setInputReference} required/>
                <button className="submit-name" onClick={this.clickHandler}>Go</button>
            </div>
        );
    }
});

module.exports = Username;
