import React, { Component } from 'react';
import ApexCharts from 'apexcharts';
class LineChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        chart: {
          type: 'bar'
        },
        series: [
          {
            name: 'sales',
            data: props.data
          }
        ],
        xaxis: {
          categories: props.categories
        }
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
export default LineChart;
