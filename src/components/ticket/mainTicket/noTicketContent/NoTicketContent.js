import React, { Component } from 'react';
import Logo from '../../../../assets/svg/logo';

import classes from './NoTicketContent.module.sass';

class NoTicketContent extends Component {
  render() {
    return (
      <div className={`${classes.noTicketContent}`}>
        <Logo
          className={`${classes.logo}`}
          fill="#bdcadb"
          width="80px"
          viewBox="0 0 500 500"
        />
        <p style={{ color: '#bdcadb' }}>تیکتی برای نمایش وجود ندارد</p>
      </div>
    );
  }
}
export default NoTicketContent;
