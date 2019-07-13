import React from "react";
import Logo from "../../assets/img/404.png";
import classes from "./NotFound.module.sass";
export default () => {
  return (
    <div class="container">
      <div className={`${classes.main}`}>
        <div className={`${classes.img_404}`}>
          <img src={Logo} />
        </div>
        <p className={`${classes.text_404}`}>
          متاسفیم,ما نتونستیم صفحه مورد نظر شما رو پیدا کنیم!
        </p>
        <div class={`${classes.btn}`}>
          <a href="/">منو از اینجا ببر</a>
        </div>
      </div>
    </div>
  );
};
