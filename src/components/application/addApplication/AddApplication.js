import React, { Component } from 'react';
import TextInputGroupForm from '../../../layout/TextInputGroupForm';
import TextAreaGroup from '../../../layout/TextAreaGroup';
import UploadBtn from '../../../layout/UploadBtn';
import SelectOption from '../../../layout/SelectOption';
import CustomColorPicker from '../../../layout/CustomColorPicker';
import Loading from '../../../layout/Loading';
import ApplicationPreview from './applicationPreview/ApplicationPreview';
import SplashPreview from './splashPreview/SplashPreview';
import PlaceholderItem from './placeholderItem/PlaceholderItem';
import PlaceholderPreview from './placeholderPreview/PlaceholderPreview';
import Logo from '../../../assets/svg/logo';

import classes from './AddApplication.module.sass';

class AddApplication extends Component {
  state = {
    appName: '',
    errors: {},
    loading: false,
    types: [{ type: 'a' }, { type: 'b' }, { type: 'c' }],
    discribtion: '',
    orgColor: '',
    secondColor: '',
    iconColor: '',
    website: ''
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });
  render() {
    const {
      appName,
      errors,
      types,
      loading,
      orgColor,
      secondColor,
      iconColor,
      discribtion,
      website
    } = this.state;
    return (
      <div>
        <form className={`${classes.applicationFormWrapper} text-right`}>
          <div className={`${classes.topHeaderAddApplication}`}>
            <h5 className={`${classes.topHeaderElem}`}>ایجاد اپلیکیشن</h5>
            <p className={`${classes.topHeaderContent}`}>
              برای ایجاد اپلیکیشن نیاز به دریافت اطلاعات زیر است. لطفا صبورانه
              اطلاعات درخواست شده را وارد نمایید
            </p>
          </div>
          <div className={`${classes.applicationSetup}`}>
            <div className={`${classes.bgTop}`} />
            <div className={`${classes.formSection}`}>
              <h6 className={`${classes.headerFormElem}`}>
                ورود اطلاعات اولیه اپلیکیشن
              </h6>
              <TextInputGroupForm
                name="appName"
                placeholder="نام فارسی اپلیکیشن"
                value={appName}
                label="انتخاب نام در موقعیت برند یک عامل بسیار مهم است"
                type="text"
                icon="mobile"
                onChange={this.onChange}
                error={errors.appName}
              />
              <div className={`form-group`}>
                <label>اپلیکیشن شما در چه موضوعی دسته بندی می شود؟</label>
                <SelectOption
                  onChange={async e => {
                    this.setState({
                      selectedProvince: JSON.parse(e.target.value)
                    });
                  }}
                  options={types}
                  titleKey={'type'}
                  id="province"
                />
              </div>
              <div>
                <p>
                  نوشتار انگلیسی به عنوان نام دامنه انتخاب می شود لطفا در نوشتن
                  آن دقت بفرمایید
                </p>
                <div className={`row no-gutters`}>
                  <p className={`col-2 ${classes.exampleDomain}`}>.zhaak.com</p>
                  <TextInputGroupForm
                    name="appName"
                    wrapperClass={`col-8`}
                    placeholder="مثال:aparnik"
                    value={appName}
                    type="text"
                    onChange={this.onChange}
                    error={errors.appName}
                  />
                  <p className={`col-2 text-left ${classes.exampleDomain}`}>
                    https://
                  </p>
                </div>
                <div>
                  <TextAreaGroup
                    name="discribtion"
                    placeholder="توضیحات مربوط به فعالیت شما و اپلیکیشن"
                    value={discribtion}
                    label="توضیحات مربوط به فعالیت شما واپلیکیشن برای ما و خریداران شما بسیار مهم است.هر چه این توضیحات کامل تر و روان تر باشد در بازاریابی شما به همان اندازه موثرتر خواهد بود"
                    type="text"
                    rows="8"
                    icon="file"
                    onChange={this.onChange}
                    error={errors.discribtion}
                  />
                </div>
                <div>
                  <TextInputGroupForm
                    name="website"
                    placeholder="مثال:https://www.zhaak.com"
                    value={website}
                    label="اگر شما برای کسب و کار خود سایت دارید، لطفاآن را در فیلد زیر وارد کنید تا کاربران بهتر با شما و کسب و کار شما آشنا شوند"
                    icon="internet"
                    onChange={this.onChange}
                    error={errors.website}
                  />
                </div>
              </div>
              <div>
                <h6 className={`${classes.headerFormElem}`}>
                  شماره تلفن پشتیبان
                </h6>
                <TextInputGroupForm
                  name="appName"
                  placeholder="مثال:0219999999"
                  value={appName}
                  label="پشتیبانی اپلیکیشن اعتبار اپلیکیشن است داشتن یک تیم قوی در پشتیبانی و پاسخگوی کاربران بودن به خرید خوب منجر می شود  "
                  type="text"
                  icon="phone"
                  onChange={this.onChange}
                  error={errors.appName}
                />
              </div>
            </div>
            <div>
              <div className={`${classes.formSection}`}>
                <h6 className={`${classes.headerFormElem}`}>
                  آپلود لوگو اپلیکیشن
                </h6>
                <label className={`${classes.labelInputItem}`}>
                  لوگوی خود را با اندازه های خواسته شده آپلود کنید تا بهترین
                  نتیجه شکل بگیرد لوگوی درخواست شده باید واضح، بدون پس زمینه(
                  لوگوی آیکون اپلیکیشن می تواند شامل پس زمینه باشد) آپلود شود
                </label>
                <div className={`row justify-content-center`}>
                  <div className={`col-7 `}>
                    <UploadBtn
                      label="برای انتخاب فایل کلیک کنید"
                      size="20px"
                      id="identityFile"
                      icon="attachment"
                      loading={loading}
                      onChange={this.handleChange}
                    />
                    <p className={`${classes.inputDescribtion}`}>
                      سایز 700*148 پیکسل
                    </p>
                  </div>
                </div>
                <div>
                  <h6 className={`${classes.headerFormElem}`}>
                    پیش نمایش لوگو اپلیکیشن
                  </h6>
                  <div
                    className={`row justify-content-center`}
                    style={{ height: '350px' }}
                  >
                    <div className={`col-5`}>
                      <SplashPreview />
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`row ${classes.formSection} justify-content-center`}
              >
                <div className={`col-8 text-center ${classes.doZhaak}`}>
                  <input
                    className={`mr-1`}
                    type="checkbox"
                    id="aggreement"
                    name="aggreement"
                    checked={this.state.checked}
                    onChange={this.handleCheckboxChange}
                  />
                  <label className={`mr-2`} htmlFor="aggreement">
                    می خواهم باقی مراحل را تیم ژاک انجام دهد
                  </label>
                </div>
              </div>
            </div>
            <div>
              <label className={`${classes.labelInputItem} text-right`}>
                لوگوی صفحه اصلی (این لوگو در نوار عنوان صفحه اصلی نمایش داده می
                شود)
              </label>
              <div className={`row justify-content-center`}>
                <div className={`col-7`}>
                  <UploadBtn
                    label="برای انتخاب فایل کلیک کنید"
                    size="20px"
                    id="identityFile"
                    icon="attachment"
                    loading={loading}
                    onChange={this.handleChange}
                  />
                  <p className={`${classes.inputDescribtion}`}>
                    سایز 500*500 پیکسل
                  </p>
                </div>
              </div>
              <div className={`${classes.applicationPreviewWrapper}`}>
                <h6 className={`${classes.headerFormElem}`}>
                  پیش نمایش لوگو صفحه اصلی
                </h6>
                <div className={`row justify-content-center`}>
                  <div className={`col-6`}>
                    <ApplicationPreview />
                  </div>
                </div>
              </div>
              <div>
                <label className={`mt-5 mb-5`}>
                  لوگوی آیکن نرم افزار را می توانید با رنگ پس زمینه آپلود کنید و
                  دقت کنید که این آیکن اولین چیزی است که از اپلیکیشن شما نمایش
                  داده می شود
                </label>
                <div className={`row justify-content-center`}>
                  <div className={`col-7`}>
                    <UploadBtn
                      label="برای انتخاب فایل کلیک کنید"
                      size="20px"
                      id="identityFile"
                      icon="attachment"
                      loading={loading}
                      onChange={this.handleChange}
                    />
                    <p className={`${classes.inputDescribtion}`}>
                      سایز 500*500 پیکسل
                    </p>
                  </div>
                </div>
                <div>
                  <div className={`${classes.softIconPreview}`} />
                  <p className={`${classes.softIconPreviewDescribtion}`}>
                    پیش نمایش
                  </p>
                </div>
              </div>
              <div>
                <h6 className={`${classes.headerFormElem}`}>
                  رنگ بندی اپلیکیشن
                </h6>
              </div>
              <div>
                <label className={`${classes.labelInputItem}`}>
                  رنگ سازمانی اپلیکیشن را در این قسمت بصورت کد هگز
                  (مانند:#627278) وارد کنید و مطمئن شوید با لوگو و پس زمینه ی آن
                  همخوانی داشته باشد
                </label>
                <div>
                  <CustomColorPicker
                    onSelected={(color, e) => {
                      this.setState({ orgColor: color });
                    }}
                  />
                </div>
              </div>
              <div>
                <h6 className={`${classes.headerFormElem}`}>
                  پیش نمایش رنگ سازمانی
                </h6>
                <div className={`row mb-5`}>
                  <div className={`col-6`}>
                    <ApplicationPreview color={orgColor} />
                  </div>
                  <div className={`col-6`}>
                    <SplashPreview color={orgColor} />
                  </div>
                </div>
              </div>
              <div>
                <label className={`${classes.labelInputItem}`}>
                  رنگ دوم مکمل رنگ اصلی سازمانی است مطمئن شوید این رنگ با رنگ
                  اصلی سازمانی، لوگو و پس زمینه آن همخوانی داشته باشد
                </label>
                <div>
                  <CustomColorPicker
                    onSelected={(color, e) => {
                      this.setState({ secondColor: color });
                    }}
                  />
                </div>
              </div>
              <div>
                <h6 className={`${classes.headerFormElem}`}>
                  پیش نمایش رنگ دوم
                </h6>
                <div className={`row justify-content-center`}>
                  <div className={`col-6`}>
                    <ApplicationPreview secondColor={secondColor} />
                  </div>
                </div>
              </div>
              <div>
                <label className={`${classes.labelInputItem}`}>
                  رنگ آیکن را براساس همخوانی با رنگ سازمانی، زیبا شناسی و قابل
                  رویت انتخاب کنید زیبا شناسی و قابل رویت انتخاب کنید. تمام این
                  رنگ ها هویت و زیبا شناسی اپلیکیشن شما رو می سازند
                </label>
                <div>
                  <CustomColorPicker
                    onSelected={(color, e) => {
                      this.setState({ iconColor: color });
                    }}
                  />
                </div>
              </div>
              <div>
                <h6 className={`${classes.headerFormElem}`}>
                  پیش نمایش رنگ آیکن ها
                </h6>
                <div className={`row justify-content-center mb-5`}>
                  <div className={`col-6`}>
                    <ApplicationPreview iconColor={iconColor} />
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <h6 className={`${classes.headerFormElem}`}>
                    تصویر جانشین (Place Holder)
                  </h6>
                </div>
                <div>
                  <label className={`${classes.labelInputItem}`}>
                    تصویر جانشین (Place Holder) تصویری است که زمان بارگذاری
                    تصویر دوره و با زمانی که برای دوره تصویری تعریف نشده با دو
                    نسبت 1:1 و 2:1 نمایش داده می شود. تصاویر جایگزین اپلیکیشن
                    شما باید بصورت تک رنگ و بدون پس زمیته باشد تصویر زیر نمونه
                    یک پلیس هولدر استاندارد است.
                  </label>
                  <div className={`row ${classes.placeholderWrapper} mb-5`}>
                    <div className={`col-5`}>
                      <PlaceholderItem widthLogo="80px" heightLogo="80px" />
                    </div>
                    <div className={`col-7`}>
                      <PlaceholderItem widthLogo="80px" heightLogo="80px" />
                    </div>
                  </div>
                  <div className={`row justify-content-center`}>
                    <div className={`col-7`}>
                      <UploadBtn
                        label="برای انتخاب فایل کلیک کنید"
                        size="20px"
                        id="identityFile"
                        icon="attachment"
                        loading={loading}
                        onChange={this.handleChange}
                      />
                      <p className={`${classes.inputDescribtion}`}>
                        سایز 500*500 پیکسل
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <h6 className={`${classes.headerFormElem}`}>
                    پیش نمایش تصویر جایگزین با نسبت 1:1
                  </h6>
                  <div className={`row justify-content-center mb-5 clearfix`}>
                    {/* todo:then Complete */}
                    <div className={`col-6`}>
                      <PlaceholderPreview secondColor={secondColor} />
                    </div>
                  </div>
                </div>
                <div>
                  <label className={`${classes.labelInputItem}`}>
                    تصویر جانشین با نسبت 2:1(نمایش در فیلد تصویر بزرگ دوره)
                  </label>
                  <div className={`row justify-content-center`}>
                    <div className={`col-7`}>
                      <UploadBtn
                        label="برای انتخاب فایل کلیک کنید"
                        size="20px"
                        id="identityFile"
                        icon="attachment"
                        loading={loading}
                        onChange={this.handleChange}
                      />
                      <p className={`${classes.inputDescribtion}`}>
                        سایز 500*500 پیکسل
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <h6 className={`${classes.headerFormElem}`}>
                    پیش نمایش تصویر جایگزین با نسبت 2:1
                  </h6>
                  <div className={`row justify-content-center mb-5 clearfix`}>
                    {/* todo:then Complete */}
                    <div className={`col-6`}>
                      <PlaceholderPreview secondColor={secondColor} />
                    </div>
                    <div className={`col-6`}>
                      <PlaceholderPreview
                        secondColor={secondColor}
                        type="horizental"
                      />
                    </div>
                  </div>
                </div>
                <div className={`${classes.btnSubmitWrapper}`}>
                  <Logo
                    className={`${classes.iconLogo}`}
                    style={{
                      width: '100px',
                      height: '100px'
                    }}
                    fill="#6bb5ef"
                    viewBox="0 0 500 500"
                  />
                  <p>آغاز تجریه ای عالی با ژاک</p>

                  <div className={classes.btnWrapper}>
                    <input
                      type="submit"
                      value="ساخت اپلیکیشن"
                      className={`btn ${classes.createApp}`}
                    />
                    <Loading class="input" show={this.state.loading} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
export default AddApplication;
