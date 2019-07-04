import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';

import classes from './SelectOption.module.css';

const SelectOptionGroup = ({ label, options, id, onChange, titleKey }) => {
  return (
    <select
      className={`form-control ${classes.select}`}
      onChange={onChange}
      id={id}
    >
      {label ? <option>{label}</option> : ''}
      {options
        ? options.map(option => {
            return (
              <option
                key={option.id}
                onChange={onChange}
                value={JSON.stringify(option)}
              >
                {option[`${titleKey}`]}
              </option>
            );
          })
        : ''}
    </select>
  );
};

SelectOptionGroup.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired
};

SelectOptionGroup.default = {
  options: []
};

export default SelectOptionGroup;
