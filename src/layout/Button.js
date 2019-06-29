import React from 'react';
import PropTypes from 'prop-types';

import style from './Button.module.css';
const Button = ({ label, onClick, type, classes }) => {
  return (
    <button type={type} onClick={onClick} className={`${classes} btn`}>
      {label}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

export default Button;
