import React from 'react';
import Controls from './src/components/controls';
import Player from './src/components/player';
import Players from './src/components/players';
import History from './src/components/history';

let App = React.createClass({
  render: function() {
		return (
      <div className={'row'}>
        <ul className={'tabs'} data-tab role='tablist'>
          <li className={'tabs-title is-active'}><a href="#board">Board</a></li>
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

React.render(<App />, document.getElementById('app'));
