import React from 'react';

let History = React.createClass({
  getInitialState: function() {
    return { history: [] }
  },
  componentDidMount: function() {
    var that = this;
    this.socket = io();
    this.socket.on('history_updated', function(payload) {
      that.setState({ history: payload });
    });
  },
  render: function() {
    var rows = this.state.history.map(function(row, k) {
      return (<div key={k} className={'small-12 columns'}>{row.text}</div>);
    });
    return (
      <div id='history' className={'row'}>{rows}</div>
    );
  }
});

module.exports = History;
