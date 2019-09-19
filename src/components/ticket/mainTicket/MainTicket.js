import React, { Component } from "react";
import NoTicketContent from "./noTicketContent/NoTicketContent";
import AddTicket from "./addTicket/AddTicket";
import TicketsContent from "./ticketsContent/TicketsContent";
import { Consumer } from "../../../context";
import classes from "./MainTicket.module.sass";
class MainTicket extends Component {
  TicketContent = state => {
    switch (state.content) {
      case "addTicket":
        return <AddTicket ticketAdded={this.props.updateTickets} />;
      case "ticketCotent":
        return <TicketsContent ticket={state.ticket} />;
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
