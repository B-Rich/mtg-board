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
      return (<li key={k}>{row.text}</li>);
    });
    return (
      <div id='history'><ul>{rows}</ul></div>
    );
  }
});

module.exports = History;
