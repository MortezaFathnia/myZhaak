import React from 'react';
import PropTypes from 'prop-types';

import style from './ButtonForm.module.css';
const ButtonForm = ({ label, onClick, type, classes }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${classes} ${style.btnForm} btn`}
    >
      {label}
    </button>
  );
};

ButtonForm.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

export default ButtonForm;
