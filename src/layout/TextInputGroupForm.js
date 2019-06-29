import React from 'react';
import PropTypes from 'prop-types';
import classname from 'classnames';

import classes from './TextInputGroupForm.module.css';

const TextInputGroupForm = ({
  name,
  value,
  placeholder,
  type,
  wrapperClass,
  onChange,
  label,
  id,
  icon,
  error
}) => {
  let style = {};
  if (icon) {
    let mobile = require(`../assets/svg/${icon}.svg`);
    style = {
      background: '#fff url(' + `${mobile}` + ') no-repeat 98% 50% / 25px 25px'
    };
  }

  return style ? (
    <div className={`${wrapperClass} form-group`}>
      {label ? (
        <label className={`${classes.labelForm}`} htmlFor={id}>
          {label}
        </label>
      ) : (
        ''
      )}
      <input
        type={type}
        id={id}
        style={style}
        name={name}
        className={classname(
          `form-control form-control-lg ${classes.inputForm}`,
          {
            'is-invalid': error
          }
        )}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && <div className={`invalid-feedback`}>{error}</div>}
    </div>
  ) : (
    <div className={`${wrapperClass} form-group`}>
      {label ? (
        <label className={`${classes.labelForm}`} htmlFor={id}>
          {label}
        </label>
      ) : (
        ''
      )}
      <input
        type={type}
        id={id}
        name={name}
        className={classname(
          `form-control form-control-lg ${classes.inputForm}`,
          {
            'is-invalid': error
          }
        )}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && <div className={`invalid-feedback`}>{error}</div>}
    </div>
  );
};

TextInputGroupForm.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string
};

TextInputGroupForm.default = {
  type: 'text'
};

export default TextInputGroupForm;
