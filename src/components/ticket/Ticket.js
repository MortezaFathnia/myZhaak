import React, { Component } from "react";
import Main from "./mainTicket/MainTicket";
import TicketsRightPanel from "./ticketsRightPanel/TicketsRightPanel";
class Ticket extends Component {
  constructor() {
    super();
    this.child = React.createRef();
  }
  handleAddTicket = () => {
    this.child.current.showTickets(
      "https://api.zhaak.com/api/v1/aparnik/tickets/"
    );
  };
  render() {
    return (
      <div id="ticket">
        {/* <RightPanel ref={this.child} /> */}
        <TicketsRightPanel ref={this.child} />
        <Main
          updateTickets={() => {
            this.handleAddTicket(this);
            console.log(456);
          }}
        />
      </div>
    );
  }
}
export default Ticket;
