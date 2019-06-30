import React from 'react';
import PropTypes from 'prop-types';

import style from './ToggleState.module.css';
const Button = ({ label, onClick, type, classes }) => {
  return (
    <div className="can-toggle demo-rebrand-1">
      <input id="d" type="checkbox" />
      <label for="d">
        <div
          className="can-toggle__switch"
          data-checked="ستونی"
          data-unchecked="دایره ای"
        />
        <div className="can-toggle__label-text">.can-toggle.demo-rebrand-1</div>
      </label>
    </div>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

export default Button;
