import React from 'react';

let Player = React.createClass({
  render: function() {
    return (
      <li key={this.props.key} className={'player ' + this.props.color}>
        <div className='life'>{this.props.life}</div>
        <div className='name'>{this.props.name}</div>
      </li>
    );
  }
});

module.exports = Player;
