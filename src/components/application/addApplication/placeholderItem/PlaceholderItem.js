import React from 'react';
import Icons from '../../../../assets/svg/icons.svg';
import Logo from '../../../../assets/svg/logo';

import classes from './PlaceholerItem.module.sass';
const placeholderItem = ({ widthLogo, heightLogo, className }) => {
  return (
    <div className={`${classes.placeholderItem} ${className}`}>
      <Logo
        className={`${classes.iconLogo}`}
        style={{
          width: widthLogo,
          height: heightLogo
        }}
        fill="#ccc"
        viewBox="0 0 500 500"
      />
    </div>
  );
};
export default placeholderItem;
