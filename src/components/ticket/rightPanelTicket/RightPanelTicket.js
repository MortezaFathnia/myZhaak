import React, { Component } from 'react';
import TicketsRightPanel from './ticketsRightPanel/TicketsRightPanel';
import classes from './RightPanelTicket.module.sass';
class RightPanelTicket extends Component {
  render() {
    return (
      <div id="rightPanel" className={`${classes.rightPanel}`}>
        <TicketsRightPanel />
      </div>
    );
  }
}
export default RightPanelTicket;
