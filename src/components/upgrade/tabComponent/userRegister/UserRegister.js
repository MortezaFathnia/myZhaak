import React, { Component } from 'react';
// import DatePicker from 'react-datepicker2';
import { DatePicker } from 'react-advance-jalaali-datepicker';
import InputRadioGroup from '../../../../layout/InputRadioGroup';
import DatepickerInput from '../../../../layout/DatepickerInput';
import TextInputGroupForm from '../../../../layout/TextInputGroupForm';
import SelectOption from '../../../../layout/SelectOption';
import Loading from '../../../../layout/Loading';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { Consumer } from '../../../../context';
import { toast } from 'react-toastify';
// import { DatePicker } from "jalali-react-datepicker";
import moment from 'jalali-moment';

import classes from '../../Upgrade.module.sass';

const cookies = new Cookies();
let provinces = '';
class UserRegister extends Component {
  state = {
    address: '',
    errors: {},
    provinces: [],
    provincesLoading: 'لطفا استانی را انتخاب کنید',
    selectedProvince: {},
    cities: [],
    selectedCity: {},
    sex: '',
    birthdate: '',
    postalCode: '',
    value: moment(),
    phone: '',
    loadingGet: false
  };

  change(unix, formatted) {
    let date = new Date(unix * 1000);
    let dd = String(date.getDate()).padStart(2, '0');
    let mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = date.getFullYear();
    date = yyyy + '-' + mm + '-' + dd;
    this.setState({
      birthdate: `${date}T12:00`
    });
  }
  onSubmit = async (dispatch, user, apiUrl, e) => {
    e.preventDefault();
    const {
      address,
      selectedCity,
      sex,
      postalCode,
      birthdate,
      phone
    } = this.state;
    let userData = new FormData();
    userData.set('birthdate', birthdate);
    userData.set('sex', sex);

    let addressData = new FormData();
    addressData.set('address', address);
    addressData.set('city_obj_id', selectedCity.id);
    addressData.set('postalCode', postalCode);
    addressData.set('phone', phone);
    try {
      this.setState({ loading: true });
      Promise.all([
        axios.put(`${user['url_update']}`, userData, {
          headers: {
            Authorization: `Aparnik ${cookies.get('token')}`,
            'Content-Type': 'application/json'
          }
        }),
        axios.post(`${apiUrl['user-addresses-create']}`, addressData, {
          headers: {
            Authorization: `Aparnik ${cookies.get('token')}`,
            'Content-Type': 'application/json'
          }
        })
      ])
        .then(results => {
          this.setState({ loading: false });
          dispatch({ type: 'STEP', payload: 'uploadsDoc' });
        })
        .catch(errors => {
          let errorContent = '';
          this.setState({ loading: false });
          for (let key in errors) {
            if (errors[key].data) {
              for (let error in errors[key].data) {
                if (Array.isArray(errors[key]['data'][error])) {
                  errorContent = errorContent.concat(
                    errors[key]['data'][error][0],
                    '\n'
                  );
                }
              }
            }
          }
          if (!errorContent) {
            errorContent = 'خطایی رخ داده است لطفا دوباره امتحان کنید';
          }
          toast.error(errorContent);
        });
    } catch (error) {
      toast.error('خطایی رخ داده است لطفا دوباره امتحان کنید');
    }
  };
  onChange = e => this.setState({ [e.target.name]: e.target.value });
  async componentDidMount() {
    this.setState({ provincesLoading: 'در حال دریافت لیست شهرها' });
    const resProvinces = await axios.get(
      'https://api.zhaak.com/api/v1/aparnik/provinces/'
    );
    try {
      this.setState({
        provinces: resProvinces.data.results,
        provincesLoading: ''
      });
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    const {
      address,
      errors,
      provinces,
      cities,
      postalCode,
      provincesLoading,
      phone
    } = this.state;
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    today = yyyy + '/' + mm + '/' + dd;
    return (
      <Consumer>
        {value => {
          const { dispatch, user, apiUrl } = value;
          return (
            <form
              onSubmit={this.onSubmit.bind(this, dispatch, user, apiUrl)}
              className={`${
                classes.registerForm
              }  col-12 col-sm-8 mr-auto text-right`}
            >
              <div className={`${classes.steps}`}>
                <span className={`${classes.stepPointer}`} />
                <span className={`${classes.stepPointer}`} />
                <span className={`${classes.stepPointer}`} />
              </div>
              <div className={`form-row`}>
                <div className={`form-group col-12 col-sm-6 col-form-label`}>
                  <div className={`form-group row`}>
                    <p className={`mb-0 col-2`}>جنسیت</p>
                    <div className={`col-10`}>
                      <InputRadioGroup
                        label="آقا"
                        id="man"
                        name="sex"
                        value="M"
                        onChange={e => {
                          this.setState({
                            sex: e.target.value
                          });
                        }}
                      />
                      <InputRadioGroup
                        label="خانم"
                        id="women"
                        name="sex"
                        value="F"
                        onChange={e => {
                          this.setState({
                            sex: e.target.value
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className={`col-sm-5 col-12 form-group`}>
                  {/* <div className={`row no-gutters`}> */}
                  {/*  <div className={`col-4 mt-2`}>
                      <label>تاریخ تولد:</label>
                    </div> */}
                  <DatePicker
                    inputComponent={DatepickerInput}
                    placeholder="تاریخ تولد"
                    format="jYYYY/jMM/jDD"
                    onChange={this.change.bind(this)}
                    id="datePicker"
                    preSelected={moment(today, 'YYYY/MM/DD')
                      .locale('fa')
                      .format('YYYY/MM/DD')}
                    cancelOnBackgroundClick="App"
                  />
                  {/*  <div className={`col-8`}>
                      <DatePicker
                        value={this.state.value}
                        isGregorian={false}
                        onChange={value => {
                          this.setState({ value });
                        }}
                      />
                    </div> */}
                  {/* </div> */}
                </div>
              </div>
              <div className={`row`}>
                <div className={`form-group col-12 col-sm-6`}>
                  <SelectOption
                    onChange={async e => {
                      this.setState({
                        selectedProvince: JSON.parse(e.target.value)
                      });
                      const resProvinces = await axios.get(
                        JSON.parse(e.target.value).url_city
                      );
                      try {
                        this.setState({
                          cities: resProvinces.data.results
                        });
                      } catch (error) {
                        console.log(error);
                      }
                    }}
                    options={provinces}
                    titleKey={'title'}
                    label="انتخاب استان"
                    id="province"
                  />
                </div>
                <div className={`form-group col-12 col-sm-6`}>
                  {cities.length > 0 ? (
                    <SelectOption
                      onChange={e => {
                        this.setState({
                          selectedCity: JSON.parse(e.target.value)
                        });
                      }}
                      options={cities}
                      titleKey={'title'}
                      label="انتخاب شهر"
                      id="city"
                    />
                  ) : (
                    <p>{'لطفا استانی انتخاب کنید'}</p>
                  )}
                </div>
              </div>
              <div className="row">
                <TextInputGroupForm
                  name="postalCode"
                  wrapperClass="form-group col-12 col-sm-6"
                  placeholder="کدپستی"
                  value={postalCode}
                  type="text"
                  onChange={this.onChange}
                  error={errors.postalCode}
                />
                <TextInputGroupForm
                  name="phone"
                  wrapperClass="form-group col-12 col-sm-6"
                  placeholder="شماره تلفن"
                  value={phone}
                  type="text"
                  onChange={this.onChange}
                  error={errors.phone}
                />
              </div>
              <div className={`clearfix`}>
                <TextInputGroupForm
                  name="address"
                  placeholder="آدرس"
                  value={address}
                  type="text"
                  onChange={this.onChange}
                  error={errors.address}
                />
              </div>
              <div className={classes.btnWrapper}>
                <input
                  type="submit"
                  value="گام بعدی"
                  className={`btn ${classes.btnForm}`}
                />
                <Loading class="input" show={this.state.loading} />
              </div>
            </form>
          );
        }}
      </Consumer>
    );
  }
}
export default UserRegister;
