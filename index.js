import React from 'react';
import Controls from './src/components/controls';

let App = React.createClass({
	getInitialState() {
		return {
			players: [],
      history: [],
			username: ''
		}
	},
	componentDidMount() {
    var that = this;
		this.socket = io();
    this.socket.on('player_added', function(payload){
      that.setState({ players: payload });
    });
    this.socket.on('life_updated', function(payload){
      that.setState({ players: payload });
    });

    this.newPlayer();
	},
  newPlayer() {
		var username = '';

		do {
			username = prompt('Enter name:');
		} while (!username.length);

    let player = { name: username, life: 40, color: 'red' }

    this.setState({username: username});

    this.socket.emit('new_player', player);
  },
	render() {
		return <div>
			<ul className="players" ref='players'>
				{this.state.players.map((player, k) => {
					return (
            <li key={k} className={'player ' + player.color}>
              <div className='life'>{player.life}</div>
              <div className='name'>{player.name}</div>
            </li>
            );
				})}
			</ul>
      <Controls />
		</div>;
	}
});

React.render(<App />, document.getElementById('container'));
