import React, { Component } from "react";
import TextAreaGroup from "../../../../layout/TextAreaGroup";
import UploadBtn from "../../../../layout/UploadBtn";
import Loading from "../../../../layout/Loading";
import { Consumer } from "../../../../context";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import Select from "react-select";
import Request from "../../../../api/request";
import TextInputGroupForm from "../../../../layout/TextInputGroupForm";

import classes from "./AddTicket.module.sass";

const cookies = new Cookies();
class AddTicket extends Component {
  state = {
    title: "",
    application: "",
    errors: {},
    content: "",
    loading: false,
    applications: [
      { label: "خانه سرمایه", value: "0" },
      { label: "امیدواری", value: "1" }
    ],
    departments: [{ label: "فنی", value: "0" }, { label: "فروش", value: "1" }],
    department: "",
    priorities: [
      { label: "باز", value: "0" },
      { label: "در انتطار بازنگری", value: "1" },
      { label: "بازنگری شده", value: "2" }
    ],
    priority: "",
    attachmentFile: {}
  };
  componentDidMount() {
    if (window.innerWidth < 576) {
      document.getElementById("rightPanel").classList.add("d-none");
    }
  }
  addConversation = apiUrl => {
    const { content, attachmentFile } = this.state;
    let data = new FormData();
    data.set("content", content);
    attachmentFile.id && data.set("files", attachmentFile.id);
    Request(apiUrl, "post", data, "Authorization")
      .then(res => {
        this.setState({ loading: false });
        if (res.status === 201) {
          // toast.success(
          //   "تیکت شما با موفقیت ثبت شد توسط تیم مربوطه بررسی می شود"
          // );
          this.props.ticketAdded();
        }
      })
      .catch(err => {
        this.setState({ loading: false });
        toast.error(err);
      });
  };
  handleSubmit = (Apis, e) => {
    e.preventDefault();
    const { title, department, priority } = this.state;
    let data = new FormData();
    data.set("title", title);
    data.set("priority", priority.value);
    data.set("departmennt", department.value);
    this.setState({ loading: true });
    Request(
      "https://api.zhaak.com/api/v1/aparnik/tickets/create/",
      "post",
      data,
      "Authorization"
    )
      .then(res => {
        if (res.status === 201) {
          this.addConversation(res.data["url_add_conversation"]);
        }
      })
      .catch(err => {
        this.setState({ loading: false });
        toast.error(err);
      });
  };
  onChange = e => this.setState({ [e.target.name]: e.target.value });
  render() {
    const {
      title,
      errors,
      content,
      application,
      applications,
      departments,
      department,
      priorities,
      priority
    } = this.state;
    return (
      <Consumer>
        {value => {
          const { apiUrl } = value;
          return (
            <form
              onSubmit={this.handleSubmit.bind(this, apiUrl)}
              className={`${classes.addTicketContainer}`}
            >
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
                    <Select
                      value={application}
                      onChange={application =>
                        this.setState({
                          application
                        })
                      }
                      options={applications}
                      rtl={true}
                      classNamePrefix="aparnik"
                      className={`aparnik_multiSelect`}
                      placeholder="اپلیکیشن"
                      id="application"
                    />
                  </div>
                  <div className={`col-12 col-sm-4 form-group`}>
                    <Select
                      value={department}
                      onChange={department =>
                        this.setState({
                          department
                        })
                      }
                      options={departments}
                      rtl={true}
                      classNamePrefix="aparnik"
                      className={`aparnik_multiSelect`}
                      placeholder="دپارتمان"
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
                    id="attachmentFile"
                    icon="attachment"
                    uploaded={(id, file) => {
                      this.setState({ [id]: file });
                    }}
                  />
                </div>
                <div className={`col-md-6 `}>
                  <div className={`row`}>
                    <div className={`col-12 col-sm-6 form-group`}>
                      <Select
                        value={priority}
                        onChange={priority =>
                          this.setState({
                            priority
                          })
                        }
                        options={priorities}
                        rtl={true}
                        classNamePrefix="aparnik"
                        className={`aparnik_multiSelect`}
                        placeholder="اولویت"
                        menuPlacement="top"
                        id="priority"
                      />
                    </div>
                    <div className={`${classes.btnWrapper} col-12 col-sm-6`}>
                      <input
                        type="submit"
                        value="ارسال تیکت"
                        className={`btn ${classes.btnForm}`}
                      />
                      <Loading class="input" show={this.state.loading} />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          );
        }}
      </Consumer>
    );
  }
}
export default AddTicket;
