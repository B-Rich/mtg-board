import React from 'react';

let Player = React.createClass({
  render: function() {
    return (
      <div key={this.props.key} className={'column player'}>
        <div className='life'>{this.props.life}</div>
        <div className='name'>{this.props.name}</div>
      </div>
    );
  }
});

module.exports = Player;
