import React from 'react';
import PropTypes from 'prop-types';

import classes from './PriorityLabel.module.css';

const PriorityLabel = ({ type }) => {
  const label = { normal: 'عادی', important: 'مهم', high: 'خیلی مهم' };
  return <label className={`${classes[type]}`}>{label[type]}</label>;
};

PriorityLabel.propTypes = {
  type: PropTypes.string.isRequired
};
export default PriorityLabel;
