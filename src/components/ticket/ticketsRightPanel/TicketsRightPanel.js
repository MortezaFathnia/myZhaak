import React, { Component } from "react";
import Request from "../../../api/request";
import AddButton from "../../../layout/AddButton";
import PriorityLabel from "../../../layout/PriorityLabel";
import Logo from "../../../assets/svg/logo";
import LoadingOverlay from "react-loading-overlay";
import { Consumer } from "../../../context";
import { toast } from "react-toastify";
import User from "../../../assets/svg/userPanel";
import moment from "jalali-moment";

import classes from "./TicketsRightPanel.module.sass";

class TicketsRightPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tickets: [],
      loadingOverlay: true,
      statuses: { 0: "باز", 1: "منتظر باز بینی", 2: "بررسی شده" },
      priorities: { 0: "Low", 1: "Medium", 2: "High" },
      previousTicketsUrl: "",
      nextTicketsUrl: "https://api.zhaak.com/api/v1/aparnik/tickets/"
    };
    this.showTickets();
  }

  handleAddTicket = (dispatch, e) => {
    dispatch({
      type: "MAINTICKET",
      payload: { content: "addTicket", url_conversation: {} }
    });
  };
  showConversation = (ticket, dispatch, e) => {
    dispatch({
      type: "MAINTICKET",
      payload: { content: "ticketCotent", ticket }
    });
  };
  showTickets = async (url, e) => {
    let { nextTicketsUrl, tickets } = this.state;

    if (url) {
      nextTicketsUrl = url;
      this.setState({ tickets: [] });
    }
    this.setState({ loadingOverlay: true });
    Request(nextTicketsUrl, "get", "", "Authorization")
      .then(resTicketsList => {
        if (url) {
          this.setState({
            tickets: resTicketsList.data.results,
            nextTicketsUrl: resTicketsList.data.next,
            previousTicketsUrl: resTicketsList.data.previous,
            loadingOverlay: false
          });
        } else {
          this.setState({
            tickets: tickets.concat(resTicketsList.data.results),
            nextTicketsUrl: resTicketsList.data.next,
            previousTicketsUrl: resTicketsList.data.previous,
            loadingOverlay: false
          });
        }
      })
      .catch(err => {
        this.setState({ loadingOverlay: false });
        toast.error(err);
      });
  };
  render() {
    const { tickets, priorities, statuses, loadingOverlay } = this.state;
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className={`${classes.rightPanel}`}>
              {tickets.length > 0 ? (
                <div id="ticketList">
                  <ul className={`${classes.ticketList}`}>
                    <li
                      className={`${classes.ticketListItem} justify-content-center`}
                    >
                      <AddButton
                        type="button"
                        onClick={this.handleAddTicket.bind(this, dispatch)}
                        label="افزودن تیکت"
                      ></AddButton>
                    </li>
                    <LoadingOverlay
                      active={loadingOverlay}
                      spinner
                      className={`${classes.overlay}`}
                      text="در حال دریافت اطلاعات ..."
                    >
                      {tickets.map(ticket => {
                        return (
                          <li
                            onClick={this.showConversation.bind(
                              this,
                              ticket,
                              dispatch
                            )}
                            className={`${classes.ticketListItem}`}
                            key={ticket["id"]}
                          >
                            <div className={`${classes.ticketContainer}`}>
                              <div className={``}>
                                {ticket["user"]["avatar"] ? (
                                  <img
                                    className={`${classes.profileImg}`}
                                    src={ticket["user"]["avatar"]["file_url"]}
                                  />
                                ) : (
                                  <User
                                    style={{
                                      width: "50px",
                                      height: "50px",
                                      marginLeft: "5px"
                                    }}
                                    viewBox="0 0 53 53"
                                  />
                                )}
                                <div className={`${classes.ticketWrapper}`}>
                                  <p
                                    className={`${classes.ticketTitle}  mt-1 mb-2 text-right`}
                                  >
                                    {ticket.title}
                                  </p>
                                  <p className={`${classes.status}`}>
                                    {statuses[ticket.status]}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className={`${classes.ticketDetailes}`}>
                              <PriorityLabel
                                type={priorities[ticket.priority]}
                              />
                              <p className={`${classes.ticketDate} mb-0`}>
                                {moment(
                                  ticket["created_at"].split("T")[0],
                                  "YYYY/MM/DD"
                                )
                                  .locale("fa")
                                  .format("YYYY/MM/DD")}
                              </p>
                            </div>
                          </li>
                        );
                      })}
                      <li
                        className={`${classes.ticketListItem} justify-content-center`}
                      >
                        <AddButton
                          type="button"
                          onClick={this.showTickets.bind(this, "")}
                          label="تیکت های بیشتر"
                        ></AddButton>
                      </li>
                    </LoadingOverlay>
                  </ul>
                </div>
              ) : (
                <LoadingOverlay
                  active={loadingOverlay}
                  spinner
                  className={`${classes.overlay}`}
                  text="در حال دریافت اطلاعات ..."
                >
                  <div className={`${classes.noTicket}`}>
                    <Logo
                      className={`${classes.iconLogo} mb-5`}
                      fill="#bdcadb"
                      width="80px"
                      viewBox="0 0 500 500"
                    />
                    <p className={`${classes.cotentAddTicket}`}>
                      شما تاکنون تیکتی ارسال نکرده اید
                    </p>
                    <AddButton
                      type="button"
                      onClick={this.handleAddTicket.bind(this, dispatch)}
                      label="افزودن تیکت"
                    ></AddButton>
                  </div>
                </LoadingOverlay>
              )}
            </div>
          );
        }}
      </Consumer>
    );
  }
}
export default TicketsRightPanel;
