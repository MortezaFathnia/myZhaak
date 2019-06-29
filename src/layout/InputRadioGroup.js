import React from 'react';
import PropTypes from 'prop-types';

const InputRadioGroup = ({ label, id, value, name, onChange }) => {
  return (
    <div className={`form-check form-check-inline`}>
      <input
        className={`form-check-input`}
        type="radio"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
      />
      <label className={`form-check-label`} htmlFor={id}>
        {label}
      </label>
    </div>
  );
};

InputRadioGroup.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.func.isRequired
};

export default InputRadioGroup;
