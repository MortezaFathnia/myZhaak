import React from 'react';
import Menu from '../../../assets/svg/menu';
import Reports from '../../../assets/svg/reports';
import Home from '../../../assets/svg/home';
import Ticket from '../../../assets/svg/ticket';
import Card from '../../../assets/svg/card';
import Guid from '../../../assets/svg/guid';
import Application from '../../../assets/svg/application';

import classes from '../Panel.module.sass';

const UnCollapsedMenu = () => {
  return (
    <div className={`${classes.panelWrapper} ${classes.UnCollapsed}`}>
      <div className={`${classes.pishkanBtnWrapper}`}>
        <button
          className={`btn ${classes.pishkanBtn}`}
          onClick={this.handlePanel}
        >
          <Menu
            style={{
              width: '30px',
              height: '30px',
              marginLeft: '5px'
            }}
            viewBox="0 0 32 32"
          />
        </button>
      </div>
      <div className={`${classes.userMenu}`}>
        <ul className={`${classes.userMenuList}`}>
          <li
            className={`${classes.active}`}
            onClick={this.handleTab.bind(this, dispatch, 'main')}
          >
            <Home viewBox="0 0 58.365 58.365" />
          </li>
          <li>
            <Application viewBox="0 0 21 20" />
          </li>
          <li>
            <Card viewBox="0 0 21 16" />
          </li>
          <li>
            <Ticket viewBox="0 0 27.036 8.547" />
          </li>
          <li>
            <Guid viewBox="0 0 21 21" />
          </li>
          <li>
            <Reports viewBox="0 0 21 21" />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UnCollapsedMenu;
