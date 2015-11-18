import React from 'react';
import Controls from './src/components/controls';
import Player from './src/components/player';
import Players from './src/components/players';
import History from './src/components/history';

let App = React.createClass({
  render: function() {
		return (
      <div>
        <Players />
        <Controls />
        <History />
		  </div>
    );
	}
});

React.render(<App />, document.getElementById('app'));
