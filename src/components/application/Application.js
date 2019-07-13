import React, { Component } from "react";

import NoApplication from "./noApplication/NoApplication";
import AddApplication from "./addApplication/AddApplication";

import classes from "./Application.module.sass";

class Application extends Component {
  state = { component: "noApplication" };
  changeComponent = component => {
    switch (component) {
      case "noApplication":
        return (
          <NoApplication changeComponent={this.changeComponent.bind(this)} />
        );
      case "addApplication":
        return <AddApplication />;
      default:
        return (
          <NoApplication changeComponent={this.changeComponent.bind(this)} />
        );
    }
  };
  render() {
    const { component } = this.state;
    return (
      <div className={`${classes.applicationWrapper}`}>
        {component === "noApplication" ? (
          <NoApplication
            changeComponent={component => {
              this.setState({ component: component });
            }}
          />
        ) : (
          <AddApplication />
        )}
      </div>
    );
  }
}
export default Application;
