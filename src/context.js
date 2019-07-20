import React, { Component } from "react";
import axios from "axios";
import firebase from "firebase/app";
import Cookies from "universal-cookie";
import "firebase/auth"; // This line is important
import "@firebase/messaging";
import { toast } from "react-toastify";

export const googleProvider = new firebase.auth.GoogleAuthProvider();

const cookies = new Cookies();
const ready = { fcmToken: false, home: false };
let guid = function() {
  let nav = window.navigator;
  let screen = window.screen;
  let guid = nav.mimeTypes.length;

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
      console.log(action.payload);
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
    case "ADMINAPIS": {
      return {
        ...state,
        adminUrl: action.payload
      };
    }
    case "LOGOUT": {
      return {
        ...state,
        isAuthenticated: action.payload
      };
    }
    case "SIGNUP": {
      return {
        isRegistered: action.payload
      };
    }
    default:
      return state;
  }
};
export class Provider extends Component {
  state = {
    aboutus: {},
    apiUrl: {},
    domain: "",
    adminUrl: {},
    user: {},
    isAuthenticated: false,
    device_id: "",
    loadingOverlay: true,
    os_version: "",
    device_model: "",
    homeProperties: {},
    upgradeLevel: false,
    typeReports: [],
    tab: "main",
    mainTicket: "",
    number: "",
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
        this.logout();
        console.log("error in verify token", error);
      });
  };

  logout = async () => {
    const { device_id, device_model, apiUrl } = this.state;
    let data = new FormData();
    data.set("device_type", "w");
    data.set("device_id", device_id);
    data.set("device_model", device_model);
    try {
      this.setState({ loading: true });
      console.log(apiUrl["logout"]);
      axios
        .post(apiUrl["logout"], data, {
          headers: {
            Authorization: `Aparnik ${cookies.get("token")}`,
            "Content-Type": "application/json"
          }
        })
        .then(res => {
          this.setState({ loading: false });
          if (res.status === 200) {
            cookies.remove("token");
            cookies.remove("mobile");
            cookies.remove("fcmtoken");
            window.location.reload();
          }
          this.setState({ isAuthenticated: false });
        })
        .catch(error => {
          this.setState({ loading: false });
          console.log("error in logout from system", error);
        });
    } catch (error) {
      console.log("error in logout system", error);
      toast.error("خطایی رخ داده است دوبازه امتحان کنید");
    }
  };

  //sending fcmtoken to Api
  sendingFcmTokentoApi = token => {
    let fcmApi =
      "https://api.zhaak.com/api/v1/aparnik/users/notification-add-token/";
    let header = cookies.get("token")
      ? {
          Authorization: `Aparnik ${cookies.get("token")}`,
          "Content-Type": "application/json"
        }
      : "";
    let data = new FormData();
    data.set("device_id", guid());
    data.set("device_model", "iphone 6plus");
    data.set("device_type", "w");
    data.set("fcm_token", token);
    axios
      .post(fcmApi, data, { headers: header })
      .then(res => {
        console.log("success to sending to fcmApi", res);
      })
      .catch(error => {
        console.log("error to sending to fcmApi", error);
      });
  };

  //get permission Firebase
  getPermissionFirebase = () => {
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
      // .catch(error => console.log(error))
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
            console.log("fcm token registered in api", res);
          })
          .catch(error => {
            console.log("fcm token don't registered in api", error);
          });
      })
      .catch(function(error) {
        console.log("Donot have permission.", error);
        cookies.set("fcmtoken", "do not have permission", { path: "/" });
        let data = new FormData();
        data.set("device_id", guid());
        data.set("device_model", "iphone 6plus");
        data.set("device_type", "w");
        data.set("fcm_token", "do not have permission");
        axios
          .post(
            "https://api.zhaak.com/api/v1/aparnik/users/notification-add-token/",
            data
          )
          .then(res => {
            console.log("fcm token registered api in dont permission", res);
          })
          .catch(error => {
            console.log(
              "fcm token don't registered api in dont permission",
              error
            );
          });
      });
  };
  async componentDidMount() {
    // 1- get home api
    let url = "";
    // setting header
    let header = cookies.get("token")
      ? {
          Authorization: `Aparnik ${cookies.get("token")}`,
          "Content-Type": "application/json"
        }
      : "";
    // spliting domains
    let domainRegex = /^(http[s]?:\/\/)(?=.{1,255}$)((.{1,63}\.){1,127}(?![0-9]*$)[a-z0-9-]+\.?)(:[0-9])*/;
    if (window.location.href.match(domainRegex)) {
      url = `${window.location.href.match(domainRegex)["0"]}/api/v1/home`;
      this.setState({ domain: url });
    } else {
      url = "https://api.zhaak.com/api/v1/home";
      this.setState({ domain: "https://api.zhaak.com/api/v1/home" });
    }
    //getting home api with token, domain url
    console.log(header);
    await axios
      .get(url, {
        headers: header
      })
      .then(resApi => {
        console.log(resApi);
        this.setState({ apiUrl: resApi.data.url });
        this.setState({ adminUrl: resApi.data["url_admin"] });
        this.setState({ device_id: guid() });
        this.setState({ os_version: window.navigator.appVersion });
        this.setState({ device_model: window.navigator.platform });
        this.setState({ homeProperties: resApi.data.properties });
        if (
          resApi.data.properties.IS_SHOW_UPGRADE_TO_SILVER_LEVEL_ACCOUNT_BUTTON
        ) {
          this.setState({ upgradeLevel: true });
        }
        this.setState({ loadingOverlay: false });
        //2- logined users
        if (cookies.get("token")) {
          this.verifyToken();
        }
        //3- getting fcm token
        if (!cookies.get("fcmtoken")) {
          this.getPermissionFirebase();
        }
        this.setState({ loadingOverlay: false });
      })
      .catch(function(error) {
        console.log(error);
        console.log("error in getting home api");
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
