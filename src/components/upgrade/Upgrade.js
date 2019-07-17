import React, { Component } from 'react';
import axios from 'axios';
import classes from './Upgrade.module.sass';
import { Consumer } from '../../context';

import SuccessState from './successState/SuccessState';
import TabComponent from './tabComponent/TabComponent';
import Agreement from './agreement/Agreement';
class Upgrade extends Component {
  state = {
    address: '',
    errors: {},
    provinces: [],
    selectedProvince: {},
    cities: [],
    loadingGet: false
  };
  changeStep(step) {
    this.setState({ steps: step });
  }
  onChange = e => this.setState({ [e.target.name]: e.target.value });
  async componentDidMount() {
    const resProvinces = await axios.get(
      'https://api.zhaak.com/api/v1/aparnik/provinces/'
    );
    try {
      this.setState({ provinces: resProvinces.data.results });
    } catch (error) {
      console.log(error);
    }
  }

  fullPage = step => {
    switch (step) {
      case 'agreement':
        return <Agreement />;
      case 'success':
        return <SuccessState />;
      case 'userRegister':
        return <TabComponent />;
      case 'uploadsDoc':
        return <TabComponent />;
      default:
        return <Agreement />;
    }
  };
  render() {
    return (
      <Consumer>
        {value => {
          const { step } = value;
          return (
            <div className={`${classes.pageCenter}`}>{this.fullPage(step)}</div>
          );
        }}
      </Consumer>
    );
  }
}
export default Upgrade;
