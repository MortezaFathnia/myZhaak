import React, { Component } from 'react';
import classes from '../Upgrade.module.sass';
import Icons from '../../../assets/svg/icons.svg';
class SuccessState extends Component {
  render() {
    return (
      <form className={`${classes.registerForm}`}>
        <div className={`${classes.successWrapper}`}>
          <svg className={`${classes.iconSuccess}`} width="80px" height="80px">
            <use xlinkHref={`${Icons}#icon-success`} />
          </svg>
          <p>مراحل ثبت درخواست با موفقیت به پایان رسید</p>
          <div>
            <input
              type="submit"
              value="اتمام"
              className={`btn btn-block ${classes.btnForm}`}
            />
          </div>
        </div>
      </form>
    );
  }
}
export default SuccessState;
