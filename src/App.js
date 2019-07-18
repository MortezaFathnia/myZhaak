import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Provider } from "./context";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import Confirm from "./components/confirm/Confirm";
import NotFound from "./components/pages/NotFound";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "../src/components/PrivateRoute";
import PublicRoute from "../src/components/PublicRoute";
import $ from "jquery";
import Popper from "popper.js";
import "bootstrap/dist/js/bootstrap.bundle.min";

import "rc-color-picker/assets/index.css";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./layout/datepicker.css";
import "./App.css";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./firebase-messaging-sw.js")
    .then(function(registration) {
      console.log("Registration successful, scope is:", registration.scope);
    })
    .catch(function(err) {
      console.log("Service worker registration failed, error:", err);
    });
}

function App() {
  return (
    <Provider>
      <Router>
        <div className="App">
          <Switch>
            <PublicRoute restricted={true} path="/" component={Login} exact />
            <PublicRoute
              restricted={true}
              path="/signup"
              component={Signup}
              exact
            />
            <PublicRoute path="/confirm" component={Confirm} exact />
            <PrivateRoute path="/dashboard" component={Dashboard} exact />
            <Route component={NotFound} />
          </Switch>
          <ToastContainer rtl position="bottom-center" />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
