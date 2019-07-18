import React, { Component } from "react";
import Notification from "../../../assets/svg/notification";
import User from "../../../assets/svg/user";
import Logo from "../../../assets/svg/logo";
import Logout from "../../../assets/svg/logout";
import classes from "./Header.module.sass";
import { Consumer } from "../../../context";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import axios from "axios";

const cookies = new Cookies();
class Header extends Component {
  state = { loading: false };

  logout = (dispatch, Apis, device_id, device_model, event) => {
    let data = new FormData();
    data.set("device_type", "w");
    data.set("device_id", device_id);
    data.set("device_model", device_model);
    try {
      this.setState({ loading: true });
      console.log(Apis["logout"]);
      axios
        .post(Apis["logout"], data, {
          headers: {
            Authorization: `Aparnik ${cookies.get("token")}`,
            "Content-Type": "application/json"
          }
        })
        .then(res => {
          console.log(res);
          this.setState({ loading: false });
          if (res.status === 200) {
            cookies.remove("token");
            cookies.remove("mobile");
            cookies.remove("fcmtoken");
            window.location.reload();
          }
          dispatch({ type: "LOGOUT", payload: false });
        })
        .catch(error => {
          this.setState({ loading: false });
          console.log(error);
        });
    } catch (error) {
      toast.error("خطایی رخ داده است دوبازه امتحان کنید");
    }
  };

  render() {
    return (
      <Consumer>
        {value => {
          const { user, dispatch, apiUrl, device_id, device_model } = value;
          return (
            <div
              className={
                !this.props.collapsed
                  ? `${classes.navContainer}`
                  : `${classes.navUncollapsedContainer}`
              }
            >
              <nav className={`nav`}>
                <div
                  className={`${
                    classes.logoWrapper
                  } m-0 col-xl-8 col-lg-7 col-6`}
                >
                  <Logo
                    className={`${classes.logo}`}
                    fill="#6bb5ef"
                    width="40px"
                    viewBox="0 0 500 500"
                  />
                </div>
                <div
                  className={`col-xl-4 col-lg-5 col-6 float-left no-gutters`}
                >
                  <div className={`row ${classes.navLeft}`}>
                    <div className={`col-lg-8 d-none d-md-block`}>
                      <a href="tel:0513847591" className={`${classes.phone}`}>
                        <span dir="ltr" className={`float-left`}>
                          0513-
                        </span>
                        پشتیبانی: 847591
                      </a>
                    </div>
                    <div
                      className={`col-lg-4 justify-content-end ${
                        classes.notifiWrapper
                      }`}
                    >
                      <button className={`btn ${classes.notificationbtn}`}>
                        <Notification
                          viewBox="0 0 512 512"
                          width="15px"
                          fill="#737381"
                        />
                      </button>
                      <button
                        className={`btn ${classes.userBtn}`}
                        id="navbarDropdown"
                        role="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <User viewBox="0 0 32 32" width="28px" fill="#737381" />
                      </button>
                      <div
                        className={`dropdown-menu ${
                          classes.profileMenu
                        } text-right`}
                        aria-labelledby="navbarDropdown"
                      >
                        <a className={`dropdown-item ${classes.userInfo}`}>
                          {user && user["avatar"] ? (
                            <img src={user["avatar"]["file_url"]} />
                          ) : (
                            <User
                              style={{
                                width: "25px",
                                height: "25px",
                                marginLeft: "5px",
                                float: "right"
                              }}
                              viewBox="0 0 32 32"
                            />
                          )}

                          {user["first_name"] && user["last_name"] ? (
                            <p className={`${classes.username} mb-2`}>{`${
                              user["first_name"]
                            } ${user["last_name"]}`}</p>
                          ) : (
                            <p>کاربر میهمان</p>
                          )}
                        </a>
                        <a
                          className="dropdown-item"
                          onClick={this.logout.bind(
                            this,
                            dispatch,
                            apiUrl,
                            device_id,
                            device_model
                          )}
                        >
                          <Logout
                            style={{
                              width: "20px",
                              height: "20px",
                              marginLeft: "5px",
                              float: "right"
                            }}
                          />
                          خروج
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </nav>
            </div>
          );
        }}
      </Consumer>
    );
  }
}
export default Header;
