import React, { Component } from 'react';
import Menu from '../../../assets/svg/menu';
import Reports from '../../../assets/svg/reports';
import Home from '../../../assets/svg/home';
import User from '../../../assets/svg/userPanel';
import ModalAccess from '../../../layout/ModalAccess';
import Cookies from 'universal-cookie';
import { Consumer } from '../../../context';

import classes from './Panel.module.sass';

const cookies = new Cookies();
class Panel extends Component {
  constructor() {
    super();
    this.state = {
      collapsed: true,
      mobileCollapsed: true
    };
    this.child = React.createRef();
  }
  changeActiveTab = event => {
    var elems = document.querySelectorAll('.tabList li');

    [].forEach.call(elems, function(el) {
      el.classList.remove('activeTab');
    });
    if (event.target && event.target.tagName.toLowerCase() !== 'button') {
      if (event.target.closest('li').classList.contains('activeTab') > 0) {
        event.target.closest('li').classList.remove('activeTab');
      } else {
        event.target.closest('li').classList.add('activeTab');
      }
    }
  };
  componentDidMount() {
    if (window.innerWidth < 576) {
      this.setState({ collapsed: false });
    }
  }
  handleTab = (dispatch, upgradeLevel, tab, event) => {
    dispatch({ type: 'TAB', payload: tab });
    this.changeActiveTab(event);
  };

  handlePanel = () => {
    this.setState({ collapsed: !this.state.collapsed });
    this.props.handleClick(!this.state.collapsed);
  };
  handlePanelMobile = () => {
    this.setState({ mobileCollapsed: !this.state.mobileCollapsed });
    this.props.handleMobileClick(!this.state.mobileCollapsed);
  };
  render() {
    const { collapsed, mobileCollapsed } = this.state;
    return (
      <Consumer>
        {value => {
          const { dispatch, upgradeLevel, user } = value;
          return (
            <React.Fragment>
              <ModalAccess show={true} ref={this.child} />
              {collapsed ? (
                <div
                  className={`${
                    classes.panelWrapper
                  } d-none d-md-block d-xl-block`}
                >
                  <div
                    className={`${
                      classes.pishkanBtnWrapper
                    } d-none d-md-block d-xl-block`}
                  >
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
                      {user && user['avatar'] ? (
                        <img src={user['avatar']['file_url']} />
                      ) : (
                        <User
                          style={{
                            width: '60px',
                            height: '60px',
                            marginLeft: '10px'
                          }}
                          viewBox="0 0 53 53"
                        />
                      )}

                      {user['first_name'] && user['last_name'] ? (
                        <p className={`${classes.username} mb-2`}>{`${
                          user['first_name']
                        } ${user['last_name']}`}</p>
                      ) : (
                        <p>کاربر میهمان</p>
                      )}
                      <p className={`${classes.phone} mb-2`}>
                        {cookies.get('mobile')}
                      </p>
                    </div>
                    <ul className={`${classes.userMenuList} tabList`}>
                      <li
                        className={`activeTab`}
                        onClick={this.handleTab.bind(
                          this,
                          dispatch,
                          upgradeLevel,
                          'main'
                        )}
                      >
                        <Home viewBox="0 0 58.365 58.365" />
                        <a>پیشخوان</a>
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
              ) : (
                <div
                  className={`${classes.panelWrapper} ${classes.UnCollapsed}`}
                >
                  <div
                    className={`${
                      classes.pishkanBtnWrapper
                    } d-none d-md-block d-xl-block`}
                  >
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
                  <div
                    className={
                      mobileCollapsed
                        ? `${classes.pishkanBtnWrapper} pr-2 d-block d-sm-none`
                        : `${classes.pishkanBtnWrapper} ${
                            classes.pishkanMobileBtnWrapper
                          } pr-2 d-block d-sm-none`
                    }
                  >
                    <button
                      className={`btn ${classes.pishkanBtn}`}
                      onClick={this.handlePanelMobile}
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
                  <div
                    className={
                      !mobileCollapsed
                        ? 'd-none'
                        : `${classes.userMenu} ${classes.userMenuMobile}`
                    }
                  >
                    <ul className={`${classes.userMenuList} tabList`}>
                      <li
                        className={`activeTab`}
                        onClick={this.handleTab.bind(
                          this,
                          dispatch,
                          upgradeLevel,
                          'main'
                        )}
                      >
                        <Home viewBox="0 0 58.365 58.365" />
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
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        }}
      </Consumer>
    );
  }
}
export default Panel;
