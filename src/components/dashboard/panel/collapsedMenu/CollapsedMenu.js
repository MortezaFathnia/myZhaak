import React from 'react';
import Menu from '../../../assets/svg/menu';
import Reports from '../../../assets/svg/reports';
import Home from '../../../assets/svg/home';
import Ticket from '../../../assets/svg/ticket';
import Card from '../../../assets/svg/card';
import Guid from '../../../assets/svg/guid';
import Application from '../../../assets/svg/application';

import classes from '../Panel.module.sass';

const CollapsedMenu = () => {
  return (
    <div className={`${classes.panelWrapper}`}>
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
        پیشخوان
      </div>
      <div className={`${classes.userMenu}`}>
        <div className={`${classes.userInfo}`}>
          <User
            style={{
              width: '60px',
              height: '60px',
              marginLeft: '10px'
            }}
            viewBox="0 0 53 53"
          />
          <p className={`${classes.username} mb-2`}>ریحانه احمدی</p>
          <p className={`${classes.phone} mb-2`}>09383477545</p>
          {!upgradeLevel ? (
            <button
              onClick={this.handleTab.bind(
                this,
                dispatch,
                upgradeLevel,
                'upgrade'
              )}
              className={`${classes.updateBtn} btn`}
            >
              ارتقا به سطح نقره ای
            </button>
          ) : (
            ''
          )}
        </div>
        <ul className={`${classes.userMenuList} tabList`}>
          <li
            className={`activeTab`}
            onClick={this.handleTab.bind(this, dispatch, upgradeLevel, 'main')}
          >
            <Home viewBox="0 0 58.365 58.365" />
            <a>پیشخوان</a>
          </li>
          <li
            onClick={this.handleTab.bind(
              this,
              dispatch,
              upgradeLevel,
              'application'
            )}
          >
            <Application viewBox="0 0 21 20" />
            <a>اپلیکیشن</a>
          </li>
          <li
            onClick={this.handleTab.bind(this, dispatch, upgradeLevel, 'card')}
          >
            <Card viewBox="0 0 21 16" />
            <a>کارت ها</a>
          </li>
          <li
            onClick={this.handleTab.bind(
              this,
              dispatch,
              upgradeLevel,
              'ticket'
            )}
          >
            <Ticket viewBox="0 0 27.036 8.547" />
            <a>تیکت ها</a>
          </li>
          <li
            onClick={this.handleTab.bind(this, dispatch, upgradeLevel, 'guid')}
          >
            <Guid viewBox="0 0 21 21" />
            <a>راهنمایی</a>
          </li>
          <li
            onClick={this.handleTab.bind(
              this,
              dispatch,
              upgradeLevel,
              'report'
            )}
          >
            <Reports viewBox="0 0 21 21" />
            <a>گزارشات</a>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default CollapsedMenu;
