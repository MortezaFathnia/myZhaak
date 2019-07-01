import React, { Component } from 'react';
import Chart from 'react-apexcharts';
class ZhaakChart extends Component {
  constructor(props) {
    super(props);
    switch (props.type) {
      case 'bar':
        this.state = {
          series: [
            {
              name: props.name,
              data: props.data
            }
          ],
          options: {
            xaxis: {
              categories: props.categories
            }
          }
        };
        break;
      case 'pie':
        this.state = {
          series: props.data,
          labels: props.categories,
          options: {
            tooltip: { style: { fontFamily: 'iran', fontSize: '11px' } }
          }
        };
        break;
    }
    this.state.chartType = props.type;
  }
  chartUpdate = () => {
    // this.componentWillUpdate();
  };
  componentWillUpdate(nextProps, nextState) {
    console.log(nextProps, nextState);
  }
  componentDidUpdate() {
    console.log(this.sate);
    // let chart = new ApexCharts(
    //   document.querySelector('#chart'),
    //   this.state.options
    // );
    // chart.render();
  }
  render() {
    const { chartType } = this.state;
    return (
      <Chart
        options={this.state.options}
        series={this.state.series}
        type={chartType}
      />
    );
  }
}
export default ZhaakChart;
