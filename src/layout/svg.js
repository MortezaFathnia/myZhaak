import React from 'react';

React.DOM.svg(
  { className: 'my-svg' },
  React.createElement('use', { xlinkHref: '/svg/svg-sprite#my-icon' }, '')
);
