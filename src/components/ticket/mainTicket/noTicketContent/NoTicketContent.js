import React, { Component } from 'react';
import Icons from '../../../../assets/svg/icons.svg';

import classes from './NoTicketContent.module.sass';

class NoTicketContent extends Component {
  render() {
    return (
      <div className={`${classes.noTicketContent}`}>
        <svg
          className={`${classes.iconLogo}`}
          width="80px"
          height="80px"
          fill="#bdcadb"
        >
          <use xlinkHref={`${Icons}#icon-logo`} />
        </svg>
        <p style={{ color: '#bdcadb' }}>تیکتی برای نمایش وجود ندارد</p>
      </div>
    );
  }
}
export default NoTicketContent;
