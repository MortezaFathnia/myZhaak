import React, { Component } from 'react';
import ApexCharts from 'apexcharts';
class Chart extends Component {
  constructor(props) {
    super(props);
    switch (props.type) {
      case 'bar':
        this.state = {
          options: {
            chart: {
              type: props.type
            },
            series: [
              {
                name: props.name,
                data: props.data
              }
            ],
            xaxis: {
              categories: props.categories
            }
          }
        };
        break;
      case 'pie':
        this.state = {
          options: {
            chart: {
              type: props.type
            },
            series: props.data,
            labels: props.categories
          }
        };
        break;
    }
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
export default Chart;
