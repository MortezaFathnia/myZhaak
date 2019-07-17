import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';
import { Consumer } from '../context';
import Cookies from 'universal-cookie';
import LoadingOverlay from 'react-loading-overlay';

const cookies = new Cookies();

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Consumer>
      {value => {
        const { isAuthenticated, loadingOverlay } = value;
        return (
          <LoadingOverlay
            active={loadingOverlay}
            spinner
            text="در حال دریافت اطلاعات ..."
          >
            <Route
              {...rest}
              render={props =>
                cookies.get('token') || isAuthenticated ? (
                  <Component {...props} />
                ) : (
                  <Redirect to="/" />
                )
              }
            />
          </LoadingOverlay>
        );
      }}
    </Consumer>
  );
};

export default PrivateRoute;
