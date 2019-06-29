import React, { Component } from 'react';
import Icons from '../../../assets/svg/icons.svg';
import AddCard from '../addCard/AddCrad';

import classes from './NoCard.module.sass';
class NoCard extends Component {
  constructor() {
    super();
    this.child = React.createRef();
  }
  handleAddCardModal = e => {
    this.child.current.handleOpenModal();
  };
  render() {
    return (
      <React.Fragment>
        <AddCard show={true} ref={this.child} />
        <div className={`${classes.noCardWrapper}`}>
          <div className={`${classes.createCardTitle} row`}>
            <div className={`${classes.noCardHeaderWrapper} col-5 text-right`}>
              <p className={`${classes.noCardHeader}`}>کارت ها</p>
              <p className={`${classes.noCardTitle}`}>
                تمامی کارت های شما در این صفحه نمایش داده می شود
              </p>
            </div>
            <div className={`col-2 mr-auto`}>
              <button
                type="button"
                onClick={this.handleAddCardModal.bind(this)}
                className={`btn btnForm ${classes.sendTicket}`}
              >
                <svg
                  className={`${classes.iconAdd}`}
                  width="12px"
                  fill="#fff"
                  height="12px"
                >
                  <use xlinkHref={`${Icons}#icon-ticketAdd`} />
                </svg>
                افزودن کارت
              </button>
            </div>
          </div>
          <div className={`${classes.contextCenter}`}>
            <div className={`${classes.noCardContentCenter}`}>
              <svg
                className={`${classes.iconLogo} mb-5`}
                width="80px"
                height="80px"
                fill="#ababab"
              >
                <use xlinkHref={`${Icons}#icon-logo`} />
              </svg>
              <p>موردی برای نمایش وجود ندارد</p>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default NoCard;
