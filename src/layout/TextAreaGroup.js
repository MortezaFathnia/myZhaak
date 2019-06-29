import React from 'react';
import PropTypes from 'prop-types';
import classname from 'classnames';

import classes from './TextAreaGroup.module.css';

const TextAreaGroup = ({
  label,
  name,
  value,
  placeholder,
  type,
  onChange,
  icon,
  rows,
  error
}) => {
  let style = '';
  if (icon) {
    let mobile = require(`../assets/svg/${icon}.svg`);
    style = {
      background: '#fff url(' + `${mobile}` + ') no-repeat 99% 4% / 25px 25px',
      paddingRight: '40px'
    };
  }
  return (
    <div className="form-group">
      {label ? (
        <label className={`${classes.labelForm}`} htmlFor={name}>
          {label}
        </label>
      ) : (
        ''
      )}
      {style ? (
        <textarea
          type={type}
          name={name}
          style={style}
          className={classname(
            `form-control form-control-lg ${classes.textareaElem}`,
            {
              'is-invalid': error
            }
          )}
          placeholder={placeholder}
          rows={rows}
          value={value}
          onChange={onChange}
        />
      ) : (
        <textarea
          type={type}
          name={name}
          className={classname('form-control form-control-lg', {
            'is-invalid': error
          })}
          placeholder={placeholder}
          rows={rows}
          value={value}
          onChange={onChange}
        />
      )}

      {error && <div className={`invalid-feedback`}>{error}</div>}
    </div>
  );
};

TextAreaGroup.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

TextAreaGroup.default = {
  type: 'text'
};

export default TextAreaGroup;
