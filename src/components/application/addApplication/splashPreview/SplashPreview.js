import React from 'react';

import classes from './SplashPreview.module.sass';
const SplashPreview = ({ color }) => {
  let style = {};
  if (color) {
    style = {
      background: color
    };
  }
  return (
    <div style={style} className={`${classes.previewSplash}`}>
      <div className={`${classes.logoSplash}`}>
        <p className={`mb-0`}>لوگو اسپلش</p>
      </div>
    </div>
  );
};
export default SplashPreview;
