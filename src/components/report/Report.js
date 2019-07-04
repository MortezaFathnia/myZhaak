import React, { Component } from 'react';
import { Consumer } from '../../context';
import ChartReport from './chartReport/ChartReport';
import SelectTypeReport from './selectTypeReport/SelectTypeReport';
import uuid from 'uuid';

import Icons from '../../assets/svg/icons.svg';
import classes from './Report.module.sass';

class Report extends Component {
  constructor() {
    super();
    this.child = React.createRef();
  }

  handleSelectTypeReportModal = e => {
    this.child.current.handleOpenModal();
  };
  render() {
    return (
      <Consumer>
        {value => {
          const { dispatch, typeReports } = value;
          return (
            <React.Fragment>
              <SelectTypeReport show={true} ref={this.child} />
              <div className={`${classes.reportContainer}`}>
                <div className={`row`}>
                  <p className={`${classes.noCardHeader} col-12 text-right`}>
                    گزارش ها
                  </p>
                </div>
                <div className={`${classes.createCardTitle} row`}>
                  <div
                    className={`${
                      classes.noCardHeaderWrapper
                    } col-5 text-right`}
                  >
                    <p className={`${classes.reportTitle} mb-0 mt-3`}>
                      از این قسمت می توانید گزارش های مربوط به سیستم را مشاهده
                      کنید:
                    </p>
                  </div>
                  <div className={`col-4 mr-auto`}>
                    <button
                      type="button"
                      className={`btn btnForm ${classes.sendTicket}`}
                      onClick={this.handleSelectTypeReportModal}
                    >
                      <svg
                        className={`${classes.iconAdd}`}
                        width="12px"
                        fill="#fff"
                        height="12px"
                      >
                        <use xlinkHref={`${Icons}#icon-ticketAdd`} />
                      </svg>
                      افزودن نمودار
                    </button>
                  </div>
                </div>
                <div className={`row`}>
                  {typeReports
                    ? typeReports.map(report => (
                        <ChartReport
                          label={report.label}
                          value={report.value}
                          id={uuid()}
                        />
                      ))
                    : ''}
                </div>
              </div>
            </React.Fragment>
          );
        }}
      </Consumer>
    );
  }
}
export default Report;
