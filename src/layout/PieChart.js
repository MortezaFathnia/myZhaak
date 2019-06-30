import React, { Component } from 'react';
import ApexCharts from 'apexcharts';
class PieChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        chart: {
          type: 'pie'
        },
        series: props.data,
        labels: props.categories
      }
    };
  }
  componentDidMount() {
    let chart = new ApexCharts(
      document.querySelector('#chart'),
      this.state.options
    );
    chart.render();
  }
  render() {
    return <div id="chart" />;
  }
}
export default PieChart;
