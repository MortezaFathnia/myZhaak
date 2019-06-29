import React from 'react';

import classes from './Icon.module.css';
const Icon = ({ icon, width, height }) => {
  let path = require(`../assets/svg/${icon}.svg`);
  let style = {
    background: '#fff url(' + `${path}` + ') no-repeat 50% 50%',
    width: width,
    height: height,
    display: 'inline-block'
  };
  return <div style={style} />;
};
export default Icon;
