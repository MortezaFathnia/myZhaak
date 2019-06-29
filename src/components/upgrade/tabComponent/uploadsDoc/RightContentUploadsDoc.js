import React, { Component } from 'react';

import classes from '../../Upgrade.module.sass';
import User from '../../../../assets/svg/userPanel';
class RightContentUploadsDoc extends Component {
  render() {
    return (
      <React.Fragment>
        <h5 className={`${classes.headerRightContent}`}>احراز هویت</h5>
        <p>لطفا برای احراز هویت مراحل زیر را انجام دهید:</p>
        <ul className={`${classes.rightContext} ${classes.listTradition}`}>
          <li>
            1- فایل موردنظر را از لینک فایل رو به رو دانلود کنید. آن ر پرینت
            بگیرید، مطالعه کنید و بعد از تکمیل اطلاعات مورد نظر امضا کنید
          </li>
          <li>
            2- کارت ملی خود را در قسمت مشخص شده در فرم بچسبانید و از خودتان به
            همراه فرم عکس بگیرید،
          </li>
          <li>3- بصورت جدا از کارت ملی خود عکس بگیرید</li>
          <li>4- عکس های گرفته شده را از طریق آموژاک ارسال نمایید</li>
          <li>
            نکته: در صورتی که امکان پرینت گرفتن برای شما فراهم نیست، می توانید
            روی کاغذ A4 عینا متن فایل را بنویسید و امضا کنید.
          </li>
          <li>
            نکته: لطفا دقت فرمایید عکس ارسالی شما کاملا مشابه نمونه عکس مورد
            قبول باشد.
          </li>
        </ul>
      </React.Fragment>
    );
  }
}
export default RightContentUploadsDoc;
