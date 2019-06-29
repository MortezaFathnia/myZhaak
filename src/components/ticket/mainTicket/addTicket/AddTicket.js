import React, { Component } from 'react';
import SelectOption from '../../../../layout/SelectOption';
import TextAreaGroup from '../../../../layout/TextAreaGroup';
import UploadBtn from '../../../../layout/UploadBtn';
import Loading from '../../../../layout/Loading';
import TextInputGroupForm from '../../../../layout/TextInputGroupForm';

import classes from './AddTicket.module.sass';

class AddTicket extends Component {
  state = {
    title: '',
    errors: {},
    content: '',
    loading: false,
    samples: [{ title: 'a' }, { title: 'b' }, { title: 'c' }]
  };
  componentDidMount() {
    if (window.innerWidth < 576) {
      document.getElementById('rightPanel').classList.add('d-none');
    }
  }
  onChange = () => {};
  render() {
    const { title, errors, samples, content, loading } = this.state;
    return (
      <div className={`${classes.addTicketContainer}`}>
        <div className={`${classes.addTicketTitle}`}>
          <h5 className={`${classes.addTicketHeader}`}>ارسال تیکت</h5>
          <p className={`${classes.addTicketHeaderContent}`}>
            از طریق فرم زیر به ارسال تیکت اقدام نمایید
          </p>
        </div>
        <div className={`${classes.addTicketContainer}`}>
          <div className={`row`}>
            <TextInputGroupForm
              name="title"
              wrapperClass="col-12 col-sm-4"
              placeholder="عنوان"
              value={title}
              type="text"
              onChange={this.onChange}
              error={errors.phone}
            />
            <div className={`col-12 form-group col-sm-4`}>
              <SelectOption
                onChange={e => {
                  this.setState({
                    selectedCity: JSON.parse(e.target.value)
                  });
                }}
                options={samples}
                titleKey={'title'}
                label="اپلیکیشن"
                id="application"
              />
            </div>
            <div className={`col-12 col-sm-4 form-group`}>
              <SelectOption
                onChange={e => {
                  this.setState({
                    selectedCity: JSON.parse(e.target.value)
                  });
                }}
                options={samples}
                titleKey={'title'}
                label="دپارتمان"
                id="department"
              />
            </div>
          </div>
          <TextAreaGroup
            name="content"
            wrapperClass="col-6"
            placeholder="متن"
            rows="10"
            value={content}
            onChange={this.onChange}
            error={errors.phone}
          />
        </div>
        <div className={`row`}>
          <div className={`col-md-3 offset-md-3`}>
            <UploadBtn
              label="انتخاب فایل ضمیمه"
              size="20px"
              id="nationalFile"
              icon="attachment"
              loading={loading}
              onChange={this.handleChange}
            />
          </div>
          <div className={`col-md-6 `}>
            <div className={`row`}>
              <div className={`col-12 col-sm-6 form-group`}>
                <SelectOption
                  onChange={e => {
                    this.setState({
                      selectedCity: JSON.parse(e.target.value)
                    });
                  }}
                  options={samples}
                  titleKey={'title'}
                  label="دپارتمان"
                  id="department"
                />
              </div>
              <div className={`${classes.btnWrapper} col-12 col-sm-6`}>
                <input
                  type="submit"
                  value="آپلود مدارک"
                  className={`btn ${classes.btnForm}`}
                />
                <Loading class="input" show={this.state.loading} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default AddTicket;
