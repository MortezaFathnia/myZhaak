import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';
import { Consumer } from '../context';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Consumer>
    {value => {
      const { isAuthenticated } = value;

      return (
        <Route
          {...rest}
          render={props =>
            /* cookies.get('token') || isAuthenticated */ true ? (
              <Component {...props} />
            ) : (
              <Redirect to="/" />
            )
          }
        />
      );
    }}
  </Consumer>
);

export default PrivateRoute;
