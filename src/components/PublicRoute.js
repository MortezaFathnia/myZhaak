import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
import { Consumer } from "../context";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  return (
    <Consumer>
      {value => {
        const { isAuthenticated } = value;
        return (
          <Route
            {...rest}
            render={props =>
              isAuthenticated && restricted ? (
                <Redirect to="/dashboard" />
              ) : (
                <Component {...props} />
              )
            }
          />
        );
      }}
    </Consumer>
  );
};

export default PublicRoute;
