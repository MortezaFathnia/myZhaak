import React, { Component } from 'react';
import Main from './mainTicket/MainTicket';
import RightPanel from './rightPanelTicket/RightPanelTicket';
class Ticket extends Component {
  state = { mainContent: '' };
  render() {
    return (
      <div id="ticket">
        <RightPanel />
        <Main />
      </div>
    );
  }
}
export default Ticket;
