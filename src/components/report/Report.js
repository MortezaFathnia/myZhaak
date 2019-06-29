import React, { Component } from 'react';
import LineChart from '../../layout/LineChart';

import classes from './Report.module.sass';
class Report extends Component {
  state = {
    data: [30, 40, 45, 50, 49, 60, 70, 91, 125],
    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
  };
  render() {
    return (
      <div className={`${classes.chartCantainer}`}>
        <LineChart data={this.state.data} categories={this.state.categories} />
      </div>
    );
  }
}
export default Report;
