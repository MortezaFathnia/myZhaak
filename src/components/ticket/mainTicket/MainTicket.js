import React, { Component } from 'react';
import NoTicketContent from './noTicketContent/NoTicketContent';
import AddTicket from './addTicket/AddTicket';
import TicketsContent from './ticketsContent/TicketsContent';
import { Consumer } from '../../../context';
import classes from './MainTicket.module.sass';
class MainTicket extends Component {
  state = { tickets: ['1233'] };
  TicketContent = state => {
    switch (state) {
      case 'addTicket':
        return <AddTicket />;
      case 'tickets':
        return <TicketsContent />;
      default:
        return <NoTicketContent />;
    }
  };
  render() {
    return (
      <Consumer>
        {value => {
          const { mainTicket } = value;
          return (
            <div className={`${classes.mainTicket}`}>
              {this.TicketContent(mainTicket)}
            </div>
          );
        }}
      </Consumer>
    );
  }
}
export default MainTicket;
