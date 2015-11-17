import React from 'react';

let Controls = React.createClass({
  componentDidMount() {
    this.socket = io();
  },
	updateLife(e) {
		e.preventDefault();
		let name = this.state.username;
		let life = this.refs['life'].getDOMNode().value;

    this.socket.emit('update_life', { name: name, life: life });

		this.refs['form'].getDOMNode().reset();
	},
  render() {
    return
      <div id='controls'>
        <form action='' ref='form' onSubmit={this.updateLife}>
          <div>
            <input type="text" pattern="-?[0-9]*(\.[0-9]+)?" ref="life" />
            <label htmlFor="life-input">Life...</label>
            <span>Input is not a number!</span>
          </div>
          <button>
            Enviar
          </button>
        </form>
      </div>;
  }
});

module.exports = Controls;
