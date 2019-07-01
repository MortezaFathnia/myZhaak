import React, { Component } from 'react';
import ApexCharts from 'apexcharts';
class Chart extends Component {
  constructor(props) {
    super(props);
    this.intialConfig(props);
    this.chart = '';
  }
  intialConfig = props => {
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
  };
  chartRender = () => {
    this.intialConfig(this.props);
    if (this.chart) {
      this.chart.destroy();
    }
    this.chart = new ApexCharts(
      document.querySelector('#chart'),
      this.state.options
    );

    this.chart.render();
    // this.state.exictedChart = true;
  };
  // componentWillReceiveProps(nextProps) {
  //   console.log('componentWillReceiveProps', nextProps);
  // }
  componentDidMount() {
    this.chartRender(this);
  }
  // componentWillUpdate(nextProps, nextState) {
  //   console.log(nextProps, nextState);
  //   this.intialConfig(nextProps);
  //   this.chartRender.bind(this);
  // }
  render() {
    return <div id="chart" />;
  }
}
export default Chart;
