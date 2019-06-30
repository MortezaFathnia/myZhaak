import React, { Component } from 'react';
import logo from '../../../assets/svg/logo.svg';
import Notification from '../../../assets/svg/notification';
import User from '../../../assets/svg/user';
import Logo from '../../../assets/svg/logo';
import classes from './Header.module.sass';
class Header extends Component {
  // handleSidebar = () => {
  //   this.props.panelHandler();
  // };

  render() {
    return (
      <div
        className={
          !this.props.collapsed
            ? `${classes.navContainer}`
            : `${classes.navUncollapsedContainer}`
        }
      >
        <nav className={`nav`}>
          <div className={`${classes.logoWrapper} m-0 col-xl-8 col-lg-7 col-6`}>
            <Logo
              className={`${classes.logo}`}
              fill="#6bb5ef"
              width="40px"
              viewBox="0 0 500 500"
            />
          </div>
          <div className={`col-xl-4 col-lg-5 col-6 float-left no-gutters`}>
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
                <button className={`btn ${classes.userBtn}`}>
                  <User viewBox="0 0 32 32" width="28px" fill="#737381" />
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
export default Header;
