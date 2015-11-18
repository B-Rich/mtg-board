import React from 'react';

let Controls = React.createClass({
  getInitialState: function() {
    return { username: prompt('Enter name:') }
  },
  componentDidMount: function() {
    this.socket = io();
    this.socket.emit('new_player', this.state.username);
  },
  updateLife: function(e) {
		e.preventDefault();
		let life = this.refs['life'].getDOMNode().value;

    this.socket.emit('update_life', { name: this.state.username, life: life });

		this.refs['form'].getDOMNode().reset();
	},
  resetMatch: function() {
    if (confirm('Are you sure?')) {
      this.socket.emit('reset_match');
    }
  },
  render: function() {
    return (
      <div id='controls'>
        <form action='' ref='form' onSubmit={this.updateLife}>
          <div>
            <label htmlFor="life-input">Life:</label>
            <input type="text" pattern="-?[0-9]*(\.[0-9]+)?" ref="life" />
          </div>
          <button>Enviar</button>
        </form>
        <a id='reset' href='#' onClick={this.resetMatch}>Reset match</a>
      </div>
    );
  }
});

module.exports = Controls;
