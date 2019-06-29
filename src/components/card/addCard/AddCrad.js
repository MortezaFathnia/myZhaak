import React, { Component } from 'react';
import Popover from 'react-tiny-popover';
import TextInputGroupForm from '../../../layout/TextInputGroupForm';
import Loading from '../../../layout/Loading';
import classes from './AddCard.module.sass';
class AddCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPopoverOpen: false,
      shebaNumber: '',
      cardNumber: '',
      expirationMounth: '',
      expirationyYear: '',
      errors: {}
    };
  }
  onChange = e => this.setState({ [e.target.name]: e.target.value });

  handleOpenModal = () => {
    const { isPopoverOpen } = this.state;
    this.setState({ isPopoverOpen: true });
  };

  render() {
    const {
      isPopoverOpen,
      shebaNumber,
      cardNumber,
      expirationMounth,
      expirationyYear,
      errors
    } = this.state;
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
                <h5 className={`${classes.headerContent}`}>افزودن کارت جدید</h5>
                <button
                  className={`btn float-left ${classes.closeBtn}`}
                  onClick={() => this.setState({ isPopoverOpen: false })}
                >
                  x
                </button>
              </div>
              <div>
                <div className="row">
                  <TextInputGroupForm
                    name="ُshebaNumber"
                    wrapperClass="col-12"
                    placeholder="شماره شبا"
                    value={shebaNumber}
                    type="text"
                    onChange={this.onChange}
                    error={errors.shebaNumber}
                  />
                </div>
                <div className="row">
                  <TextInputGroupForm
                    name="cardNumber"
                    wrapperClass="col-12"
                    placeholder="شماره کارت"
                    value={cardNumber}
                    type="text"
                    onChange={this.onChange}
                    error={errors.cardNumber}
                  />
                </div>
                <div className="form-row">
                  <div className={`col-12 text-right`}>
                    <label>تاریخ انقضا</label>
                  </div>
                  <div className={`form-row`}>
                    <TextInputGroupForm
                      name="expirationMounth"
                      wrapperClass="col-6"
                      placeholder="ماه"
                      value={expirationMounth}
                      type="text"
                      onChange={this.onChange}
                      error={errors.expirationMounth}
                    />
                    <TextInputGroupForm
                      name="expirationyYear"
                      wrapperClass="col-6"
                      placeholder="سال"
                      value={expirationyYear}
                      type="text"
                      onChange={this.onChange}
                      error={errors.expirationyYear}
                    />
                  </div>
                </div>
                <div className={`${classes.btnWrapper}`}>
                  <input
                    type="submit"
                    value="افزودن کارت"
                    className={`btn ${classes.createApp}`}
                  />
                  <Loading class="input" show={this.state.loading} />
                </div>
              </div>

              <form />
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

export default AddCard;
