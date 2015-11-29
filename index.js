import React from 'react';
import Controls from './src/components/controls';
import Player from './src/components/player';
import Players from './src/components/players';
import History from './src/components/history';

let App = React.createClass({
  render: function() {
		return (
      <div className={'row'}>
        <ul className={'tabs'} data-tabs>
          <li className={'tabs-title is-active'} aria-selected={'true'}><a href="#board">Board</a></li>
          <li className={'tabs-title'}><a href="#history">History</a></li>
        </ul>
        <div className={'tabs-content'}>
          <div className={'tabs-panel is-active'} id='board'>
            <Players />
            <hr/>
            <Controls />
          </div>
          <div className={'tabs-panel'} id='history'>
            <History />
          </div>
        </div>
		  </div>
    );
	}
});

let App2 = React.createClass({
  componentDidMount: function() {
    this.socket = io();
  },
  createRoom: function() {
    var roomName = prompt('Enter room name:');
    this.socket.emit('createRoom', roomName);
  },
  render: function() {
    return (
      <div className={'row'}><a href='#' onClick={this.createRoom}>Create room</a></div>
    );
  }
});

//React.render(<App />, document.getElementById('app'));
React.render(<App2 />, document.getElementById('app'));
