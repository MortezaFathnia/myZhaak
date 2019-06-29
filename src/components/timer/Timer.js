import React, { Component } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Consumer } from '../../context';

class Timer extends Component {
  constructor() {
    super();
    this.state = { time: {}, seconds: 180 };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  onSubmit = async (dispatch, number, Apis, e) => {
    e.preventDefault();

    let data = new FormData();
    data.set('username', number);
    data.set('version_number', '1.3');
    data.set('device_id', '1.3');
    data.set('device_id', 'asdasdfasdfasdf');
    data.set('os_version', '10.4');
    data.set('device_model', 'iphone 6plus');
    data.set('device_type', 'a');
    try {
      axios
        .post(Apis['login'], data)
        .then(res => {})
        .catch(error => {});
    } catch (error) {
      toast.error('خطایی رخ داده است دوبازه امتحان کنید');
    }
    this.startTimer();
  };
  secondsToTime(secs) {
    let hours = Math.floor(secs / (60 * 60)).toString();

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);
    minutes = minutes.toString().length === 2 ? `${minutes}` : `0${minutes}`;
    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);
    seconds = seconds.toString().length === 2 ? `${seconds}` : `0${seconds}`;
    let obj = {
      h: hours + '',
      m: minutes + '',
      s: seconds + ''
    };
    return obj;
  }

  componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
    this.startTimer();
  }

  startTimer() {
    if (this.timer == 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }
  countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds
    });

    // Check if we're at zero.
    if (seconds == 0) {
      clearInterval(this.timer);
    }
  }

  render() {
    return (
      <Consumer>
        {value => {
          const { dispatch, number, apiUrl } = value;
          return this.state.time.s === '00' && this.state.time.s === '00' ? (
            <p
              className="float-left"
              style={{ color: '#6bb5ef', cursor: 'pointer' }}
              onClick={this.onSubmit.bind(this, dispatch, number, apiUrl)}
            >
              ارسال مجدد
            </p>
          ) : (
            <p className="float-left">
              {this.state.time.s} : {this.state.time.m}
            </p>
          );
        }}
      </Consumer>
    );
  }
}
export default Timer;
