import React, { Component } from "react";
import Icons from "../../../assets/svg/icons.svg";

import classes from "./NoApplication.module.sass";
class NoApplication extends Component {
  render() {
    return (
      <div className={`${classes.noApplicationWrapper}`}>
        <div className={`${classes.createApplicationTitle} row`}>
          <div
            className={`${classes.noApplicationHeaderWrapper} col-5 text-right`}
          >
            <p className={`${classes.noApplicationHeader}`}>اپلیکیشن</p>
            <p className={`${classes.noApplicationTitle}`}>
              تمامی اپلیکیشن های شما در این صفحه نمایش داده می شود
            </p>
          </div>
          <div className={`col-2 mr-auto`}>
            <button
              type="button"
              className={`btn btnForm ${classes.sendTicket}`}
              onClick={() => this.props.changeComponent("addApplication")}
            >
              <svg className={`iconAdd`} width="10px" fill="#fff" height="10px">
                <use xlinkHref={`${Icons}#icon-ticketAdd`} />
              </svg>
              ایجاد اپلیکیشن
            </button>
          </div>
        </div>
        <div className={`${classes.contextCenter}`}>
          <div className={`${classes.noApplicationContentCenter}`}>
            <svg
              className={`${classes.iconLogo} mb-5`}
              width="80px"
              height="80px"
              fill="#ababab"
            >
              <use xlinkHref={`${Icons}#icon-logo`} />
            </svg>
            <p>موردی برای نمایش وجود ندارد</p>
          </div>
        </div>
      </div>
    );
  }
}
export default NoApplication;
