import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Provider } from './context';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import Confirm from './components/confirm/Confirm';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from '../src/components/PrivateRoute';

import 'rc-color-picker/assets/index.css';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './layout/datepicker.css';
import './App.css';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./firebase-messaging-sw.js')
    .then(function(registration) {
      console.log('Registration successful, scope is:', registration.scope);
    })
    .catch(function(err) {
      console.log('Service worker registration failed, error:', err);
    });
}

function App() {
  return (
    <Provider>
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Login} />
            <PrivateRoute exact path="/signup" component={Signup} />
            <Route exact path="/confirm" component={Confirm} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
          </Switch>
          <ToastContainer rtl position="bottom-center" />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
