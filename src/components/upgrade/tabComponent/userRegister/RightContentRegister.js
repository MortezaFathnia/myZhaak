import React, { Component } from 'react';
import AvatarSabteDarkhast from '../../../../assets/svg/avatarSabteDarkhast';

import classes from '../../Upgrade.module.sass';

class RightContentRegister extends Component {
  render() {
    return (
      <React.Fragment>
        <AvatarSabteDarkhast
          width="100px"
          style={{
            margin: 'auto',
            display: 'table'
          }}
          viewBox="0 0 100 83"
        />
        <h5 className={`${classes.headerRightContent}`}>
          پیش بسوی ثبت درخواست
        </h5>
        <p className={`${classes.rightContext}`}>
          برای ثبت درخواست نیاز به طی نمودن مراحل گام به گام مانند دریافت
          اطلاعات شماست. لطفا صبورانه اطلاعات در خواست شده را وارد نمایید
        </p>
      </React.Fragment>
    );
  }
}
export default RightContentRegister;
