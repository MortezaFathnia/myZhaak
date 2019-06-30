import React, { Component } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'universal-cookie';
import Chart from '../../../layout/Chart';
import SelectOption from '../../../layout/SelectOption';
import Settings from '../../../assets/svg/settings';

import classes from './ChartReport.module.sass';
import { throwStatement } from '@babel/types';
const cookies = new Cookies();
class ChartReport extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      label: props.label,
      value: props.value,
      data: [44, 55, 13, 33],
      categories: ['Apple', 'Mango', 'Orange', 'Watermelon'],
      courseFilters: [],
      chartTypes: [
        { label: 'ستونی', value: 'bar', id: 0 },
        { label: 'دایره ای', value: 'pie', id: 1 },
        { label: 'دونات', value: 'donut', id: 2 }
      ],
      sortTypes: [
        { label: 'صعودی', value: '', id: 0 },
        { label: 'نزولی', value: '-', id: 1 }
      ],
      sortType: '',
      chartType: ''
    };
  }
  async componentDidMount() {
    const { value } = this.state;
    const resCourseFilterType = await axios.get(
      `https://khanesarmaye.aparnik.com/api/v1/aparnik/educations/${value}/admin/sort/`,
      {
        headers: {
          Authorization: `Aparnik ${cookies.get('token')}`,
          'Content-Type': 'application/json'
        }
      }
    );
    try {
      this.setState({
        courseFilters: resCourseFilterType.data
      });
    } catch (error) {
      toast.error('خطایی رخ داده است دوباره امتحان کنید');
    }
  }
  submitFilter = async event => {
    console.log(123);
    event.preventDefault();
    const { value, courseFilter, sortType } = this.state;
    const resCourseFilterData = await axios.get(
      `https://khanesarmaye.aparnik.com/api/v1/aparnik/educations/${value}/admin/?ordering=${sortType}${courseFilter}`,
      {
        headers: {
          Authorization: `Aparnik ${cookies.get('token')}`,
          'Content-Type': 'application/json'
        }
      }
    );
    try {
      console.log(resCourseFilterData);
      // this.setState({
      //   courseFilters: resCourseFilterType.data
      // });
    } catch (error) {
      toast.error('خطایی رخ داده است دوباره امتحان کنید');
    }
  };
  render() {
    const { label, courseFilters, value, sortTypes, chartTypes } = this.state;
    return (
      <div className={`col-6 mx-auto mt-5`}>
        <fieldset className="zhaak_fieldset clearfix">
          <legend className="zhaak_legend">{label}</legend>
          <form>
            <div className={`form-row form-group text-right`}>
              <div className={`col-12`}>
                <label>فیلد مورد نظر را انتخاب کنید:</label>
                <SelectOption
                  label="یک مورد را انتخاب کنید"
                  onChange={event =>
                    this.setState({
                      courseFilter: JSON.parse(event.target.value)
                    })
                  }
                  options={courseFilters}
                  titleKey={'label'}
                  id="application"
                />
              </div>
            </div>
            <div className={`form-row form-group text-right`}>
              <div className={`col-6`}>
                <label>نوع نمودار:</label>
                <SelectOption
                  label="یک مورد را انتخاب کنید"
                  onChange={e =>
                    this.setState({
                      chartType: JSON.parse(e.target.value)
                    })
                  }
                  options={chartTypes}
                  titleKey={'label'}
                  id="application"
                />
              </div>
              <div className={`col-6`}>
                <label>مرتب سازی:</label>
                <SelectOption
                  label="یک مورد را انتخاب کنید"
                  onChange={e =>
                    this.setState({
                      sortType: JSON.parse(e.target.value)
                    })
                  }
                  options={sortTypes}
                  titleKey={'label'}
                  id="application"
                />
              </div>
            </div>
            <div className={`${classes.btn_filter_wrapper} clearfix`}>
              <button
                type="submit"
                onSubmit={this.submitFilter.bind(this)}
                className={`btn btnForm `}
              >
                <Settings
                  className={`${classes.iconSettings}`}
                  style={{
                    width: '12px',
                    height: '12px',
                    marginLeft: '4px'
                  }}
                  fill="#fff"
                  viewBox="0 0 478.703 478.703"
                />
                اعمال فیلتر
              </button>
            </div>
          </form>
          {/* <div className={`${classes.chartCantainer} clearfix`}>
            <Chart
              type="pie"
              data={this.state.data}
              categories={this.state.categories}
            />
          </div> */}
        </fieldset>
      </div>
    );
  }
}
export default ChartReport;
