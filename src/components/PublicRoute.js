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

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
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
                isAuthenticated && restricted ? (
                  <Redirect to="/dashboard" />
                ) : (
                  <Component {...props} />
                )
              }
            />
          </LoadingOverlay>
        );
      }}
    </Consumer>
  );
};

export default PublicRoute;
