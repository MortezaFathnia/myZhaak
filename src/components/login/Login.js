import React, { Component } from 'react';
import TextInputGroup from '../../layout/TextInputGroup';
import axios from 'axios';
import { toast } from 'react-toastify';
import classes from './Login.module.sass';
import { Consumer } from '../../context';
import Loading from '../../layout/Loading';
import Cookies from 'universal-cookie';
import Timer from '../timer/Timer';
import Logo from '../../assets/svg/logo';

const cookies = new Cookies();
class Login extends Component {
  state = { mobile: '', loading: false, code: '', errors: {}, isActive: true };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  getAdminUrl = async (dispatch, token, domain) => {
    await axios
      .get(domain, {
        headers: {
          Authorization: `Aparnik ${token}`,
          'Content-Type': 'application/json'
        }
      })
      .then(resApi => {
        dispatch({ type: 'ADMINAPIS', payload: resApi.data['url_admin'] });
      })
      .catch(error => {
        toast.error('خطایی رخ داده است دوبازه امتحان کنید');
      });
  };
  onSubmit = async (dispatch, Apis, device_id, os_version, device_model, e) => {
    e.preventDefault();
    const { mobile } = this.state;
    if (!mobile) {
      this.setState({ errors: { mobile: 'فیلد موبایل اجباری است' } });
      return;
    }
    if (!/^[0]+[9]\d{9}$/i.test(mobile)) {
      this.setState({ errors: { mobile: 'شماره موبایل معتبر نیست' } });
      return;
    }

    let data = new FormData();
    data.set('username', mobile);
    data.set('version_number', '1.3');
    data.set('device_id', device_id);
    data.set('os_version', os_version);
    data.set('device_model', device_model);
    data.set('device_type', 'w');
    try {
      this.setState({ loading: true });
      axios
        .post(Apis['login'], data)
        .then(res => {
          this.setState({ loading: false });
          if (res.status === 200) {
            dispatch({ type: 'LOGIN', payload: mobile });
            cookies.set('mobile', mobile, { path: '/' });
          }
        })
        .catch(error => {
          this.setState({ loading: false });
          console.log(error.data);
          // toast.error(error.data.login[0]);
        });
    } catch (error) {
      toast.error('خطایی رخ داده است دوبازه امتحان کنید');
    }
    //clear state
    this.setState({
      mobile: '',
      errors: {}
    });
  };
  onConfirm = async (
    dispatch,
    number,
    Apis,
    device_id,
    os_version,
    device_model,
    domain,
    e
  ) => {
    e.preventDefault();

    const { code } = this.state;
    if (!code) {
      this.setState({ errors: { code: 'فیلد کد اجباری است' } });
      return;
    } else if (!/^\d{4}$/i.test(code)) {
      this.setState({ errors: { code: 'کد تنها 4 رقم است!' } });
      return;
    }
    let data = new FormData();
    data.set('username', number);
    data.set('password', code);
    data.set('version_number', '1.3');
    data.set('device_id', device_id);
    data.set('os_version', os_version);
    data.set('device_model', device_model);
    data.set('device_type', 'w');

    try {
      this.setState({ loading: true });
      axios
        .post(Apis['token'], data)
        .then(res => {
          this.setState({ loading: false });
          if (res.status === 200) {
            dispatch({ type: 'CONFIRM', payload: res.data.user }, () => {});
            if (res.data.user['is_new_registered']) {
              console.log(res.data.user['is_new_registered']);
              this.props.history.push('/signup');
            } else {
              this.getAdminUrl(dispatch, res.data.token, domain);
              this.props.history.push('/dashboard');
            }
            cookies.set('token', res.data.token, { path: '/' });
          }
        })
        .catch(error => {
          let errorContent = '';
          this.setState({ loading: false });
          for (let key in error.response.data) {
            errorContent = errorContent.concat(
              error.response.data[key][0],
              '\n'
            );
          }
          toast.error(errorContent);
        });
    } catch (error) {
      toast.error('خطایی رخ داده است دوباره امتحان کنید');
    }
  };
  render() {
    const { mobile, errors, code } = this.state;
    return (
      <Consumer>
        {value => {
          const {
            dispatch,
            apiUrl,
            number,
            device_id,
            os_version,
            domain,
            device_model
          } = value;
          return (
            <div>
              {!number ? (
                <div className={`${classes.loginContainer}`}>
                  <div className={classes.rightBg} />
                  <form
                    className={classes.loginForm}
                    onSubmit={this.onSubmit.bind(
                      this,
                      dispatch,
                      apiUrl,
                      device_id,
                      os_version,
                      device_model,
                      domain
                    )}
                  >
                    <div className={classes.topBg} />
                    <Logo
                      className={`${classes.logo}`}
                      fill="#6bb5ef"
                      viewBox="0 0 500 500"
                    />
                    <TextInputGroup
                      label="ورود به حساب کاربری"
                      name="mobile"
                      placeholder="09*********"
                      value={mobile}
                      type="text"
                      onChange={this.onChange}
                      error={errors.mobile}
                    />
                    <div style={{ position: 'relative' }}>
                      <input
                        type="submit"
                        value="ورود"
                        className="btn btn-block"
                      />
                      <Loading class="input" show={this.state.loading} />
                    </div>
                    <div className={classes.bottomBg} />
                  </form>
                  <div className={classes.leftBg} />
                </div>
              ) : (
                <div className={classes.loginContainer}>
                  <div className={classes.rightBg} />
                  <form
                    className={classes.loginForm}
                    onSubmit={this.onConfirm.bind(
                      this,
                      dispatch,
                      number,
                      apiUrl,
                      device_id,
                      os_version,
                      device_model
                    )}
                  >
                    <div className={classes.topBg} />
                    <Logo
                      className={`${classes.logo}`}
                      fill="#6bb5ef"
                      viewBox="0 0 500 500"
                    />
                    <div>
                      <p className={`float-right`}>دریافت کد تایید</p>
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
              )}
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default Login;
