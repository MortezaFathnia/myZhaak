import React, { Component } from 'react';
import Icons from '../../../../assets/svg/icons.svg';
import PriorityLabel from '../../../../layout/PriorityLabel';
import UploadBtn from '../../../../layout/UploadBtn';
import Loading from '../../../../layout/Loading';
import TextAreaGroup from '../../../../layout/TextAreaGroup';

import classes from './TicketsContent.module.sass';

class TicketsContent extends Component {
  state = { loading: false, content: '', errors: {} };
  render() {
    const { loading, content, errors } = this.state;
    return (
      <div className={`${classes.mainContent}`}>
        <div>
          <ul className={`${classes.listTicketContent}`}>
            <li className={`${classes.ticketItem}`}>
              <div className={`${classes.ticketContainer}`}>
                <div className={`${classes.imgWrapper}`}>
                  <svg className={`${classes.iconUser}`}>
                    <use xlinkHref={`${Icons}#icon-user`} />
                  </svg>
                </div>
                <div className={`row`}>
                  <div className={`${classes.ticketTitleWrapper} col-2`}>
                    <div className={`${classes.ticketTitle}`}>
                      <p className={`${classes.ticketUser}`}>ریحانه احمدی</p>
                      <p className={`${classes.ticketId}`}>133206504998</p>
                    </div>
                    <div className={`${classes.ticketDate}`}>
                      <p className={`${classes.ticketTitleDate}`}>بروزرسانی:</p>
                      <p className={`${classes.ticketUpdateDate}`}>
                        1398/02/25
                      </p>
                    </div>
                  </div>
                  <div className={`col-2 mr-auto text-left`}>
                    <p className={`${classes.ticketHour}`}>11:23:25 ب.ظ</p>
                    <p className={`${classes.ticketDay}`}>1398/04/01</p>
                    <PriorityLabel type="normal" />
                  </div>
                </div>
              </div>
              <div className={`${classes.ticketContextWrapper} mt-4`}>
                <h5 className={`${classes.ticketHeader}`}>
                  مشکل در ارسال اطلاعات
                </h5>
                <p className={`${classes.ticketContext}`}>
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                  استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و
                  مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی
                  تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای
                  کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و
                  آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم
                  افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص
                  طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد
                </p>
              </div>
            </li>
            <li className={`${classes.ticketItem}`}>
              <div className={`${classes.ticketContainer}`}>
                <div className={`${classes.imgWrapper}`}>
                  <svg className={`${classes.iconUser}`}>
                    <use xlinkHref={`${Icons}#icon-user`} />
                  </svg>
                </div>
                <div className={`row`}>
                  <div
                    className={`${
                      classes.ticketContextWrapper
                    } col-8 text-right`}
                  >
                    <div className={`${classes.ticketTitle}`}>
                      <p className={`${classes.ticketUser}`}>پشتیبانی</p>
                    </div>
                    <p className={`${classes.ticketContext}`}>
                      مشکل شما رفع شد
                    </p>
                  </div>
                  <div className={`col-2 mr-auto text-left`}>
                    <p className={`${classes.ticketHour}`}>11:23:25 ب.ظ</p>
                    <p className={`${classes.ticketDay}`}>1398/04/01</p>
                    <PriorityLabel type="normal" />
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className={`${classes.replyWrapper}`}>
          <div className={`${classes.replyContainer}`}>
            <TextAreaGroup
              name="reply"
              placeholder="متن"
              value={content}
              type="text"
              onChange={this.onChange}
              error={errors.address}
            />
            <div className={`row`}>
              <div className={`col-3`}>
                <UploadBtn
                  label="انتخاب فایل ضمیمه"
                  size="20px"
                  id="identityFile"
                  icon="attachment"
                  loading={loading}
                  onChange={this.handleChange}
                />
              </div>
              <div className={`${classes.btnWrapper} mr-auto col-2`}>
                <input
                  type="submit"
                  value="ارسال تیکت"
                  className={`btn btnForm ${classes.sendTicket}`}
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
export default TicketsContent;
