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
	},
  resetMatch: function() {
    if (confirm('Are you sure?')) {
      this.socket.emit('reset_match');
    }
  },
  render: function() {
    return (
      <div id='controls' className={'row'}>
        <div className={'small-9 columns'}>
          <div className={'small button-group'}>
            <a href='#' className={'button'} onClick={this.updateLife.bind(this, 10)}>+10</a>
            <a href='#' className={'button'} onClick={this.updateLife.bind(this, 5)}>+5</a>
            <a href='#' className={'button'} onClick={this.updateLife.bind(this, 1)}>+1</a>
            <a href='#' className={'button'} onClick={this.updateLife.bind(this, -10)}>-10</a>
            <a href='#' className={'button'} onClick={this.updateLife.bind(this, -5)}>-5</a>
            <a href='#' className={'button'} onClick={this.updateLife.bind(this, -1)}>-1</a>
          </div>
        </div>
        <div className={'small-3 columns'}>
          <a id='reset' href='#' className={'alert small button'}  onClick={this.resetMatch}>Reset</a>
        </div>
      </div>
    );
  }
});

module.exports = Controls;
