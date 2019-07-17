import React, { Component } from 'react';
import Popover from 'react-tiny-popover';

import classes from './ModalAccess.module.css';
class ModalAccess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPopoverOpen: false
    };
  }
  handleOpenModal = () => {
    this.setState({ isPopoverOpen: true });
  };
  render() {
    const { isPopoverOpen } = this.state;
    return (
      <Popover
        isOpen={isPopoverOpen}
        position={'center'} // preferred position
        content={
          <div
            className={`${classes.overlay}`}
            onClick={() => this.setState({ isPopoverOpen: false })}
          >
            <div className={`${classes.modal}`}>
              <div className={`${classes.header}`}>
                <h5 className={`${classes.headerContent}`}>
                  محدودیت سطح دسترسی
                </h5>
                <button
                  className={`btn float-left ${classes.closeBtn}`}
                  onClick={() => this.setState({ isPopoverOpen: false })}
                >
                  x
                </button>
              </div>
              <p className={`${classes.contentModal}`}>
                برای استفاده از خدمات کامل ژاک لطفا سطح عضویت خود را بصورت کاملا
                رایگان ارتقا دهید
              </p>
            </div>
          </div>
        }
      >
        <div onClick={() => this.setState({ isPopoverOpen: false })} />
      </Popover>
    );
  }
}

const props = {};

export default ModalAccess;
