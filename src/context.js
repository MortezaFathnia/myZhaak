import React, { Component } from "react";
import axios from "axios";
import firebase from "firebase";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const ready = { fcmToken: false, home: false };
let guid = function() {
  var nav = window.navigator;
  var screen = window.screen;
  var guid = nav.mimeTypes.length;
  guid += nav.userAgent.replace(/\D+/g, "");
  guid += nav.plugins.length;
  guid += screen.height || "";
  guid += screen.width || "";
  guid += screen.pixelDepth || "";

  return guid;
};
const Context = React.createContext();
const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        number: action.payload
      };
    case "CONFIRM":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true
      };
    case "TAB":
      return {
        ...state,
        tab: action.payload
      };
    case "STEP":
      return {
        ...state,
        step: action.payload
      };
    case "MAINTICKET":
      return {
        ...state,
        mainTicket: action.payload
      };
    case "TYPEREPORT":
      return {
        ...state,
        typeReports: action.payload
      };
    default:
      return state;
  }
};
export class Provider extends Component {
  state = {
    aboutus: {},
    apiUrl: {},
    user: {},
    isAuthenticated: false,
    device_id: "",
    loadingOverlay: true,
    os_version: "",
    device_model: "",
    homeProperties: {},
    upgradeLevel: false,
    typeReports: [],
    tab: "report",
    mainTicket: "",
    step: "agreement",
    dispatch: action => this.setState(state => reducer(state, action))
  };
  verifyToken = async () => {
    const { device_id, os_version, device_model, apiUrl } = this.state;
    let data = new FormData();
    data.set("token", cookies.get("token"));
    data.set("version_number", "1.3");
    data.set("device_id", device_id);
    data.set("os_version", os_version);
    data.set("device_model", device_model);
    data.set("device_type", "w");
    await axios
      .post(apiUrl["verify"], data)
      .then(resApi => {
        this.setState({ user: resApi.data.user });
        this.setState({ isAuthenticated: true });
      })
      .catch(function(error) {
        console.log("error Occured. ");
      });
  };
  async componentDidMount() {
    await axios
      .get("https://api.zhaak.com/api/v1/home")
      .then(resApi => {
        this.setState({ apiUrl: resApi.data.url });
        this.setState({ device_id: guid() });
        this.setState({ os_version: window.navigator.appVersion });
        this.setState({ device_model: window.navigator.platform });
        this.setState({ homeProperties: resApi.data.properties });
        if (
          resApi.data.properties.IS_SHOW_UPGRADE_TO_SILVER_LEVEL_ACCOUNT_BUTTON
        ) {
          this.setState({ upgradeLevel: true });
        }
        ready.home = true;
        if (cookies.get("token")) {
          this.verifyToken();
        }
        if (!cookies.get("fcmtoken")) {
          // Your web app's Firebase configuration
          var firebaseConfig = {
            apiKey: "AIzaSyCO0POv68FmCPNhexLnSpGg0wDx40zZqA0",
            authDomain: "zhaak-4ad4e.firebaseapp.com",
            databaseURL: "https://zhaak-4ad4e.firebaseio.com",
            projectId: "zhaak-4ad4e",
            storageBucket: "zhaak-4ad4e.appspot.com",
            messagingSenderId: "242627529388",
            appId: "1:242627529388:web:ce695ee1d62716ea"
          };
          // Initialize Firebase
          firebase.initializeApp(firebaseConfig);
          const messaging = firebase.messaging();

          messaging
            .requestPermission()
            .then(function() {
              console.log("Have Permission!");
              return messaging.getToken();
            })
            .then(function(token) {
              cookies.set("fcmtoken", token, { path: "/" });
              let data = new FormData();
              data.set("device_id", guid());
              data.set("device_model", "iphone 6plus");
              data.set("device_type", "w");
              data.set("fcm_token", token);
              axios
                .post(
                  "https://api.zhaak.com/api/v1/aparnik/users/notification-add-token/",
                  data
                )
                .then(res => {
                  ready.fcmToken = true;
                  console.log(res);
                  this.setState({ loadingOverlay: false });
                });
            })
            .catch(function(error) {
              console.log("error Occured. ");
            });
        } else {
          this.setState({ loadingOverlay: false });
        }
      })
      .catch(function(error) {
        console.log("error Occured. ");
      });
  }
  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}
export const Consumer = Context.Consumer;
