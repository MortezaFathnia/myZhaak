import React from 'react';
import PropTypes from 'prop-types';
import classname from 'classnames';

// import classes from './TextInputGroup.module.css';

const TextInputGroup = ({
  label,
  name,
  value,
  placeholder,
  type,
  wrapperClass,
  onChange,
  error
}) => {
  return (
    <div className={`${wrapperClass} form-group`}>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        className={classname('form-control form-control-lg', {
          'is-invalid': error
        })}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && <div className={`invalid-feedback`}>{error}</div>}
    </div>
  );
};

TextInputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string
};

TextInputGroup.default = {
  type: 'text'
};

export default TextInputGroup;
