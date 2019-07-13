import React, { Component } from "react";
import Header from "./header/Header";
import Panel from "./panel/Panel";
import Main from "../main/Main";
import Card from "../card/Card";
import Guid from "../guid/Guid";
import Ticket from "../ticket/Ticket";
import Report from "../report/Report";
import Application from "../application/Application";
import Upgrade from "../upgrade/Upgrade";
import { Consumer } from "../../context";

import classes from "./Dashboard.module.sass";
class Dashboard extends Component {
  state = { collapsed: "", mobileCollapsed: "" };
  handlePanel = collapsed => {
    this.setState({ collapsed: !collapsed });
  };

  handleMobile = mobileCollapsed => {
    this.setState({ mobileCollapsed: !mobileCollapsed });
  };
  switchTab = tab => {
    switch (tab) {
      case "ticket":
        return <Ticket />;
      case "card":
        return <Card />;
      case "guid":
        return <Guid />;
      case "report":
        return <Report />;
      case "application":
        return <Application />;
      case "upgrade":
        return <Upgrade />;
      case "main":
        return <Main />;
      default:
        return <Upgrade />;
    }
  };
  render() {
    const { collapsed, mobileCollapsed } = this.state;
    return (
      <Consumer>
        {value => {
          const { tab } = value;
          return (
            <div>
              <Panel
                handleClick={this.handlePanel}
                handleMobileClick={this.handleMobile}
              />
              <div>
                <Header
                  collapsed={collapsed}
                  mobileCollapsed={mobileCollapsed}
                />
                {collapsed || mobileCollapsed ? (
                  <div className={`${classes.mainCollapsed}`}>
                    {this.switchTab(tab)}
                  </div>
                ) : (
                  <div className={`${classes.mainUnCollapsed}`}>
                    {this.switchTab(tab)}
                  </div>
                )}
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}
export default Dashboard;
