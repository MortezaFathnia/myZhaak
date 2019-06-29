import React, { Component } from 'react';
import DownloadLink from '../../../../layout/DownloadLink';
import UploadBtn from '../../../../layout/UploadBtn';
import Loading from '../../../../layout/Loading';
import AvatarSabteDarkhast from '../../../../assets/svg/avatarSabteDarkhast';
import EhrazHoviatAvatar from '../../../../assets/svg/ehrazHoviatAvatar';
import { Consumer } from '../../../../context';
import { toast } from 'react-toastify';
import Cookies from 'universal-cookie';
import axios from 'axios';

import classes from '../../Upgrade.module.sass';

const cookies = new Cookies();
class UploadsDoc extends Component {
  state = {
    identityFile: {},
    nationalFile: {},
    loading: false
  };
  documentCreate = async (dispatch, apiUrl, results, e) => {
    try {
      let documentData = new FormData();
      documentData.set('file_obj_agreement_id', results[0].data.id);
      documentData.set('file_obj_national_card_id', results[1].data.id);
      axios
        .post(`${apiUrl['document-create']}`, documentData, {
          headers: {
            Authorization: `Aparnik ${cookies.get('token')}`,
            'Content-Type': 'application/json'
          }
        })
        .then(results => {
          this.setState({ loading: false });
          dispatch({ type: 'STEP', payload: 'success' });
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
  onSubmit = async (dispatch, apiUrl, e) => {
    e.preventDefault();
    const { identityFile, nationalFile } = this.state;
    let identityData = new FormData();
    identityData.set('file_direct', identityFile);
    identityData.set('title', identityFile.name);
    identityData.set('is_encrypt_needed', 'no');

    let nationalData = new FormData();
    nationalData.set('file_direct', nationalFile);
    nationalData.set('title', nationalFile.name);
    nationalData.set('is_encrypt_needed', 'no');

    try {
      this.setState({ loading: true });
      Promise.all([
        axios.post(`${apiUrl['file-create']}`, identityData, {
          headers: {
            Authorization: `Aparnik ${cookies.get('token')}`
          }
        }),
        axios.post(`${apiUrl['file-create']}`, nationalData, {
          headers: {
            Authorization: `Aparnik ${cookies.get('token')}`
          }
        })
      ])
        .then(results => {
          this.documentCreate(dispatch, apiUrl, results);
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
  handleChange = (fileId, value) => {
    this.setState({ [fileId]: value });
  };

  render() {
    const { loading } = this.state;
    return (
      <Consumer>
        {value => {
          const { dispatch, apiUrl, homeProperties } = value;
          return (
            <form
              onSubmit={this.onSubmit.bind(this, dispatch, apiUrl)}
              className={`${
                classes.formWrapper
              } col-12 col-sm-8 mr-auto text-right`}
            >
              <div className={`${classes.steps}`}>
                <span className={`${classes.stepPointer}`} />
                <span className={`${classes.stepPointer}`} />
                <span className={`${classes.stepPointer}`} />
              </div>
              <div className={`${classes.filePattern}`}>
                <h6 className={`${classes.formHeader} mt-4 mb-4`}>
                  نمونه فایل های مورد قبول
                </h6>
                <div className="row">
                  <div
                    className={`col-12 order-sm-1 order-2  col-sm-7 col-md-7 col-lg-6 col-7`}
                  >
                    <DownloadLink
                      label="فایل توافق نامه"
                      icon="agreement"
                      className="mb-2"
                      size="20px"
                      href={homeProperties.SAMPLE_FILE_PERSON_WITH_AN_AGREEMENT}
                    />
                    <DownloadLink
                      label="نمونه تصویر مورد قبول"
                      icon="camera"
                      size="20px"
                      href={homeProperties.SAMPLE_FILE_AGREEMENT}
                    />
                  </div>
                  <div
                    className={`${
                      classes.athenticationLogo
                    } col-12 order-1 order-sm-2 col-sm-5 col-md-5 col-lg-6 col-5`}
                  >
                    <EhrazHoviatAvatar
                      width="120px"
                      style={{
                        margin: 'auto',
                        display: 'table'
                      }}
                      viewBox="0 0 114 114"
                    />
                  </div>
                </div>
                <div className={`${classes.divider}`} />
              </div>
              <h6 className={`${classes.formHeader} mb-4`}>ارسال مدارک</h6>
              <div className={`row mb-2`}>
                <p className={`${classes.labelUpload} col-12 col-sm-5 ml-2`}>
                  انتخاب فایل تصویر کارت ملی
                </p>
                <div className={`col-12 col-sm-6`}>
                  <UploadBtn
                    label="برای انتخاب فایل کلیک کنید"
                    size="20px"
                    id="nationalFile"
                    icon="attachment"
                    loading={loading}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className={`row mb-2`}>
                <p className={`${classes.labelUpload} col-12 col-sm-5 ml-2`}>
                  انتخاب فایل احراز هویت
                </p>
                <div className={`col-12 col-sm-6`}>
                  <UploadBtn
                    label="برای انتخاب فایل کلیک کنید"
                    size="20px"
                    id="identityFile"
                    icon="attachment"
                    loading={loading}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className={classes.btnWrapper}>
                <input
                  type="submit"
                  value="آپلود مدارک"
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
export default UploadsDoc;
