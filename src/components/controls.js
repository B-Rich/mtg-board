import React from 'react';

let Controls = React.createClass({
  getInitialState: function() {
    return {
      username: prompt('Enter name:'),
      id: ''
    }
  },
  componentDidMount: function() {
    var that = this;
    this.socket = io();
    this.socket.emit('new_player', this.state.username);
    this.socket.on('update_player_id', function(id){
      that.setState({id: id});
    });
  },
  updateLife: function(amount, e) {
		e.preventDefault();
    this.socket.emit('update_life', { id: this.state.id, name: this.state.username, life: amount });
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
        <ul>
          <li><a href='#' onClick={this.updateLife.bind(this, 10)}>+10</a></li>
          <li><a href='#' onClick={this.updateLife.bind(this, 5)}>+5</a></li>
          <li><a href='#' onClick={this.updateLife.bind(this, 1)}>+1</a></li>
        </ul>
        <ul>
          <li><a href='#' onClick={this.updateLife.bind(this, -10)}>-10</a></li>
          <li><a href='#' onClick={this.updateLife.bind(this, -5)}>-5</a></li>
          <li><a href='#' onClick={this.updateLife.bind(this, -1)}>-1</a></li>
        </ul>
        <a id='reset' href='#' onClick={this.resetMatch}>Reset match</a>
      </div>
    );
  }
});

module.exports = Controls;
