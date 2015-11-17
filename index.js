import React from 'react';

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
		var username = '';

		do {
			username = prompt('Enter name:');
		} while (!username.length);

    let player = { name: username, life: 40, color: 'red' }

    this.setState({username: username});

    this.socket.emit('new_player', player);
	},
	updateLife(e) {
		e.preventDefault();
		let name = this.state.username;
		let life = this.refs['life'].getDOMNode().value;

    this.socket.emit('update_life', { name: name, life: life });

		this.refs['form'].getDOMNode().reset();
	},
	render() {
		return <div>
			<ul className="players" ref='players'>
				{this.state.players.map((player, k) => {
					return (
            <li key={k} className={'player ' + player.color}>
              <div className='mdl-card mdl-shadow--4dp'>
                <div className='life mdl-card__title mdl-card--expand'>{player.life}</div>
                <div className='name mdl-card__actions mdl-card--border'>{player.name}</div>
              </div>
            </li>
            );
				})}
			</ul>
      <div id='controls'>
        <form action='' ref='form' onSubmit={this.updateLife}>
          <div className="mdl-textfield mdl-js-textfield">
            <input className="mdl-textfield__input" type="text" pattern="-?[0-9]*(\.[0-9]+)?" ref="life" />
            <label className="mdl-textfield__label" htmlFor="life-input">Life...</label>
            <span className="mdl-textfield__error">Input is not a number!</span>
          </div>
          <button className='mdl-button mdl-js-button mdl-button--primary'>
            Enviar
          </button>
        </form>
      </div>
		</div>;
	}
});

React.render(<App />, document.getElementById('container'));
