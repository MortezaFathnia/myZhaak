import React, { Component } from 'react';
import Icons from '../../../../assets/svg/icons.svg';
import PriorityLabel from '../../../../layout/PriorityLabel';
import Logo from '../../../../assets/svg/logo';
import { Consumer } from '../../../../context';
import classes from './TicketsRightPanel.module.sass';
export default class TicketsRightPanel extends Component {
  state = { tickets: [`121`] };
  handleAddTicket = (dispatch, e) => {
    dispatch({ type: 'MAINTICKET', payload: 'addTicket' });
  };
  render() {
    const { tickets } = this.state;
    return (
      <Consumer>
        {value => {
          const { mainTicket, dispatch } = value;
          return (
            <React.Fragment>
              {tickets.length > 0 ? (
                <div id="ticketList">
                  <ul className={`${classes.ticketList}`}>
                    <li
                      className={`${
                        classes.ticketListItem
                      } justify-content-center`}
                    >
                      <button
                        className={`${classes.addBtn}`}
                        onClick={this.handleAddTicket.bind(this, dispatch)}
                      >
                        <svg
                          className={`${classes.iconAdd}`}
                          width="12px"
                          fill="#fff"
                          height="12px"
                        >
                          <use xlinkHref={`${Icons}#icon-ticketAdd`} />
                        </svg>
                        افزودن تیکت
                      </button>
                    </li>
                    <li className={`${classes.ticketListItem}`}>
                      <div className={`${classes.ticketContainer}`}>
                        <div className={``}>
                          <svg className={`${classes.iconUser}`}>
                            <use xlinkHref={`${Icons}#icon-user`} />
                          </svg>
                        </div>
                        <div className={`${classes.ticketWrapper}`}>
                          <p
                            className={`${
                              classes.ticketTitle
                            }  mt-1 mb-2 text-right`}
                          >
                            مشکل در ارسال اطلاعات
                          </p>
                          <p className={`${classes.ticketId} text-right mb-0`}>
                            13322353322
                            <p className={`${classes.status}`}>بسته شد</p>
                          </p>
                        </div>
                      </div>
                      <div className={`${classes.ticketDetailes}`}>
                        <PriorityLabel type="normal" />
                        <p className={`${classes.ticketDate} mb-0`}>
                          1397/10/11
                        </p>
                      </div>
                    </li>
                    <li className={`${classes.ticketListItem}`}>
                      <div className={`${classes.ticketContainer}`}>
                        <div className={``}>
                          <svg className={`${classes.iconUser}`}>
                            <use xlinkHref={`${Icons}#icon-user`} />
                          </svg>
                        </div>
                        <div className={`${classes.ticketWrapper}`}>
                          <p
                            className={`${
                              classes.ticketTitle
                            }  mt-1 mb-2 text-right`}
                          >
                            مشکل در ارسال اطلاعات
                          </p>
                          <p className={`${classes.ticketId} text-right mb-0`}>
                            13322353322
                          </p>
                        </div>
                      </div>
                      <div className={`${classes.ticketDetailes}`}>
                        <PriorityLabel type="normal" />
                        <p className={`${classes.ticketDate} mb-0`}>
                          1397/10/11
                        </p>
                      </div>
                    </li>
                    <li className={`${classes.ticketListItem}`}>
                      <div className={`${classes.ticketContainer}`}>
                        <div className={``}>
                          <svg className={`${classes.iconUser}`}>
                            <use xlinkHref={`${Icons}#icon-user`} />
                          </svg>
                        </div>
                        <div className={`${classes.ticketWrapper}`}>
                          <p
                            className={`${
                              classes.ticketTitle
                            }  mt-1 mb-2 text-right`}
                          >
                            مشکل در ارسال اطلاعات
                          </p>
                          <p className={`${classes.ticketId} text-right mb-0`}>
                            13322353322
                          </p>
                        </div>
                      </div>
                      <div className={`${classes.ticketDetailes}`}>
                        <PriorityLabel type="normal" />
                        <p className={`${classes.ticketDate} mb-0`}>
                          1397/10/11
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              ) : (
                <div className={`${classes.noTicket}`}>
                  <Logo
                    className={`${classes.iconLogo} mb-5`}
                    fill="#bdcadb"
                    width="80px"
                    viewBox="0 0 500 500"
                  />
                  <p className={`${classes.cotentAddTicket}`}>
                    شما تاکنون تیکتی ارسال نکرده اید
                  </p>
                  <button className={`${classes.addBtn}`}>
                    <svg
                      className={`${classes.iconAdd}`}
                      width="12px"
                      fill="#fff"
                      height="12px"
                    >
                      <use
                        xlinkHref={`${Icons}#icon-ticketAdd`}
                        onClick={this.handleAddTicket.bind(this, dispatch)}
                      />
                    </svg>
                    افزودن تیکت
                  </button>
                </div>
              )}
            </React.Fragment>
          );
        }}
      </Consumer>
    );
  }
}
