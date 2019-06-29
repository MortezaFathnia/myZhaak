import React, { Component } from 'react';
import TextInputGroup from '../../layout/TextInputGroup';
import axios from 'axios';
import classes from './Confirm.module.sass';
import { Consumer } from '../../context';
import logo from '../../assets/svg/logo.svg';
import Cookies from 'universal-cookie';
import { toast } from 'react-toastify';
import Loading from '../../layout/Loading';
import Timer from '../timer/Timer';

let guid = function() {
  var nav = window.navigator;
  var screen = window.screen;
  var guid = nav.mimeTypes.length;
  guid += nav.userAgent.replace(/\D+/g, '');
  guid += nav.plugins.length;
  guid += screen.height || '';
  guid += screen.width || '';
  guid += screen.pixelDepth || '';

  return guid;
};
const cookies = new Cookies();
// Random component
const Completionist = () => (
  <p style={{}} className="float-left">
    دریافت مجدد
  </p>
);

// Renderer callback with condition
const renderer = ({ minutes, seconds, completed }) => {
  if (completed) {
    // Render a complete state
    return <Completionist />;
  } else {
    // Render a countdown
    return (
      <p className="float-left">
        {minutes.toString().length === 2 ? `${minutes}` : `0${minutes}`}:
        {seconds.toString().length === 2 ? `${seconds}` : `0${seconds}`}
      </p>
    );
  }
};
class Confirm extends Component {
  state = { code: '', loading: false, errors: {} };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = async (dispatch, number, Apis, e) => {
    e.preventDefault();

    const { code } = this.state;
    if (!code) {
      this.setState({ erros: { code: 'فیلد کد اجباری است' } });
      return;
    } else if (!/^\d{4}$/i.test(code)) {
      this.setState({ errors: { code: 'کد تنها 4 رقم است!' } });
      return;
    }
    let data = new FormData();
    data.set('username', number);
    data.set('password', code);
    data.set('version_number', '1.3');
    data.set('device_id', 'asdasdfasdfasdf');
    data.set('os_version', '10.4');
    data.set('device_model', 'iphone 6plus');
    data.set('device_type', 'a');

    try {
      this.setState({ loading: true });
      axios
        .post(Apis['token'], data)
        .then(res => {
          this.setState({ loading: false });
          if (res.status === 200) {
            cookies.set('token', res.data.token, { path: '/' });
            if (res.data.user['is_new_registered']) {
              this.props.history.push('/signup');
            } else {
              this.props.history.push('/dashboard');
            }
            dispatch({ type: 'CONFIRM', payload: true });
          }
        })
        .catch(error => {
          this.setState({ loading: false });
          toast.error(error.response.data.non_field_errors[0]);
        });
    } catch (error) {
      toast.error('خطایی رخ داده است دوبازه امتحان کنید');
    }
  };

  render() {
    const { code, errors } = this.state;
    return (
      <Consumer>
        {value => {
          const { dispatch, number, apiUrl } = value;
          return (
            <div className={classes.loginContainer}>
              <div className={classes.rightBg} />
              <form
                className={classes.loginForm}
                onSubmit={this.onSubmit.bind(this, dispatch, number, apiUrl)}
              >
                <div className={classes.topBg} />
                <img src={logo} className={`${classes.logo}`} />
                <div>
                  <p className="float-right">دریافت کد تایید</p>
                  <Timer />
                </div>
                <TextInputGroup
                  name="code"
                  placeholder="*****"
                  value={code}
                  type="text"
                  onChange={this.onChange}
                  error={errors.code}
                />
                <div style={{ position: 'relative' }}>
                  <input
                    type="submit"
                    value="ثبت کد"
                    className="btn btn-block"
                  />
                  <Loading class="input" show={this.state.loading} />
                </div>
                <div className={classes.bottomBg} />
              </form>
              <div className={classes.leftBg} />
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default Confirm;
