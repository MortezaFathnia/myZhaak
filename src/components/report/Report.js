import React, { Component } from 'react';
import { Consumer } from '../../context';
import ChartReport from './chartReport/ChartReport';
import Select from 'react-select';

import Icons from '../../assets/svg/icons.svg';
import classes from './Report.module.sass';

class Report extends Component {
  state = {
    filters: [
      { value: 'courses', label: 'درس', id: 0 },
      { value: 'users', label: 'کاربر', id: 1 },
      { value: 'teachers', label: 'مربی', id: 2 },
      { value: 'coupons', label: 'کوپن', id: 3 },
      { value: 'audits', label: 'بازرسی سیستم', id: 4 }
    ],
    courseFilters: [],
    courseFilter: '',
    selectedOption: []
  };

  handleChange = selectedOption => {
    this.setState({ selectedOption });
  };
  render() {
    const { selectedOption, filters } = this.state;

    return (
      <Consumer>
        {value => (
          <div className={`${classes.reportContainer}`}>
            <div className={`row`}>
              <p className={`${classes.noCardHeader} col-12 text-right`}>
                گزارش ها
              </p>
            </div>
            <div className={`${classes.createCardTitle} row`}>
              <div
                className={`${classes.noCardHeaderWrapper} col-5 text-right`}
              >
                <p className={`${classes.noCardTitle} mb-0 mt-3`}>
                  فیلد گزارش گیری خود را انتخاب کنید:
                </p>
              </div>
              <div className={`col-4 mr-auto`}>
                <div className={`row no-gutters`}>
                  <div className={`col-8`}>
                    <Select
                      value={selectedOption}
                      onChange={this.handleChange}
                      options={filters}
                      isMulti={true}
                      rtl={true}
                      classNamePrefix="aparnik"
                      className={`aparnik_multiSelect`}
                      placeholder="نوع فیلتر را انتخاب کنید"
                    />
                  </div>
                  <div className={`col-4`}>
                    <button
                      type="button"
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
                      افزودن نمودار
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {selectedOption.map(report => (
              <ChartReport label={report.label} value={report.value} />
            ))}
          </div>
        )}
      </Consumer>
    );
  }
}
export default Report;
