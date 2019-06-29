import React from 'react';
import classes from './DatepickerInput.module.css';

const DatepickerInput = props => {
  return <input className={`${classes.DatepickerInput}`} {...props} />;
};

export default DatepickerInput;
