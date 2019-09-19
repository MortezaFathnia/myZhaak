import React, { Component } from "react";
import Icons from "../../../../assets/svg/icons.svg";
import PriorityLabel from "../../../../layout/PriorityLabel";
import UploadBtn from "../../../../layout/UploadBtn";
import Loading from "../../../../layout/Loading";
import { Consumer } from "../../../../context";
import { toast } from "react-toastify";
import TextAreaGroup from "../../../../layout/TextAreaGroup";
import LoadingOverlay from "react-loading-overlay";
import Request from "../../../../api/request";
import moment from "jalali-moment";

import classes from "./TicketsContent.module.sass";

class TicketsContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      contents: [],
      replyContent: "",
      errors: {},
      ticket: props.ticket,
      loadingOverlay: true,
      attachmentFile: {},
      fileTypes: { I: "jpg", p: "pdf", M: "mp4", V: "mp3", l: "Link" }
    };
    this.getConversation();
  }

  handleChange = (fileId, value) => {
    this.setState({ [fileId]: value });
  };
  onChange = e => this.setState({ [e.target.name]: e.target.value });

  componentWillReceiveProps(nextProps) {
    if (this.props.ticket.id !== nextProps.ticket.id) {
      this.setState({ loadingOverlay: true, ticket: nextProps.ticket }, () => {
        this.getConversation();
      });
    }
  }
  getConversation = async () => {
    const { ticket } = this.state;
    Request(ticket["url_conversation"], "get", "", "Authorization")
      .then(resTicketContent => {
        this.setState({
          contents: resTicketContent.data.results,
          loadingOverlay: false
        });
      })
      .catch(err => {
        this.setState({ loadingOverlay: false });
        toast.error(err);
      });
  };
  onSubmit = async (apiUrl, e) => {
    e.preventDefault();
    const { replyContent, ticket, attachmentFile } = this.state;
    let reply = new FormData();
    reply.set("files", attachmentFile.id);
    reply.set("content", replyContent);
    Request(ticket["url_add_conversation"], "post", reply, "Authorization")
      .then(res => {
        toast.success("‍پیام شما با موفقیت ارسال شد");
        this.getConversation();
        this.setState({
          loading: false,
          replyContent: ""
        });
      })
      .catch(err => {
        this.setState({ loading: false });
        toast.error(err);
      });
  };
  render() {
    const {
      contents,
      errors,
      replyContent,
      loadingOverlay,
      fileTypes
    } = this.state;
    return (
      <Consumer>
        {value => {
          const { dispatch, apiUrl } = value;
          return (
            <LoadingOverlay
              active={loadingOverlay}
              spinner
              className={`${classes.overlay}`}
              text="در حال دریافت اطلاعات ..."
            >
              <React.Fragment>
                <div className={`${classes.mainContent}`}>
                  <div className={`${classes.conversationWrapper}`}>
                    <ul className={`${classes.listTicketContent}`}>
                      {contents.map(content => {
                        return (
                          <li
                            className={`${classes.ticketItem}`}
                            key={content.id}
                          >
                            <div className={`${classes.ticketContainer}`}>
                              <div className={`${classes.imgWrapper}`}>
                                {content["user"]["avatar"] ? (
                                  <img
                                    className={`${classes.profileImg}`}
                                    src={content["user"]["avatar"]["file_url"]}
                                  />
                                ) : (
                                  <svg className={`${classes.iconUser}`}>
                                    <use xlinkHref={`${Icons}#icon-user`} />
                                  </svg>
                                )}
                              </div>
                              <div className={`row`}>
                                <div
                                  className={`${classes.ticketTitleWrapper} col-4`}
                                >
                                  <div className={`${classes.ticketTitle}`}>
                                    <p className={`${classes.ticketUser} mt-3`}>
                                      {`${content.user["first_name"]} ${
                                        content.user["last_name"]
                                      }`}
                                    </p>
                                  </div>
                                  {/* <div className={`${classes.ticketDate}`}>
                                    <p className={`${classes.ticketTitleDate}`}>
                                      بروزرسانی:
                                    </p>
                                    <p
                                      className={`${
                                        classes.ticketUpdateDate
                                      } mr-1`}
                                    >
                                      1398/02/25
                                    </p>
                                  </div> */}
                                </div>
                                <div className={`col-2 mr-auto text-left`}>
                                  <p className={`${classes.ticketHour}`}>
                                    {moment(
                                      content["created_at"].split("T")[1],
                                      "HH:mm:ss"
                                    )
                                      .locale("fa")
                                      .format("HH:mm:ss")}
                                  </p>
                                  <p className={`${classes.ticketDay}`}>
                                    {moment(
                                      content["created_at"].split("T")[0],
                                      "YYYY/MM/DD"
                                    )
                                      .locale("fa")
                                      .format("YYYY/MM/DD")}
                                  </p>
                                  <PriorityLabel type="normal" />
                                </div>
                              </div>
                            </div>
                            <div
                              className={`${classes.ticketContextWrapper} mt-1`}
                            >
                              {/* <h5 className={`${classes.ticketHeader}`}>
                                مشکل در ارسال اطلاعات
                              </h5> */}
                              <p className={`${classes.ticketContext}`}>
                                {content["content"]}
                              </p>
                              {content["files"].map(file => {
                                return (
                                  <div key={file.id} className="row">
                                    <div className="col-3 mr-auto text-left mt-1">
                                      <div className={`${classes.fileTitle}`}>
                                        <a
                                          href={file["file_url"]}
                                          className={`${classes.fileName}`}
                                          target="blank"
                                        >
                                          {file.title.length > 15
                                            ? file.title
                                                .split(".")[0]
                                                .substr(0, 15) + "..."
                                            : file.title.split(".")[0]}
                                        </a>
                                        <bdi className={`${classes.fileSize}`}>
                                          {file["file_size_readable"]}
                                        </bdi>
                                      </div>
                                      <span className={`${classes.fileType}`}>
                                        {fileTypes[file.type]}
                                      </span>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </li>
                        );
                      })}
                      {/* <li className={`${classes.ticketItem}`}>
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
                                      <p className={`${classes.ticketUser}`}>
                                        پشتیبانی
                                      </p>
                                    </div>
                                    <p className={`${classes.ticketContext}`}>
                                      مشکل شما رفع شد
                                    </p>
                                  </div>
                                  <div className={`col-2 mr-auto text-left`}>
                                    <p className={`${classes.ticketHour}`}>
                                      11:23:25 ب.ظ
                                    </p>
                                    <p className={`${classes.ticketDay}`}>
                                      1398/04/01
                                    </p>
                                    <PriorityLabel type="normal" />
                                  </div>
                                </div>
                              </div>
                            </li> */}
                    </ul>
                  </div>
                  <div className={`${classes.replyWrapper}`}>
                    <form
                      onSubmit={this.onSubmit.bind(this, apiUrl)}
                      className={`${classes.replyContainer}`}
                    >
                      <TextAreaGroup
                        name="replyContent"
                        placeholder="متن"
                        value={replyContent}
                        type="text"
                        onChange={this.onChange}
                        error={errors.context}
                      />
                      <div className={`row`}>
                        <div className={`col-4`}>
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
                        <div className={`${classes.btnWrapper} mr-auto col-2`}>
                          <input
                            type="submit"
                            value="ارسال تیکت"
                            className={`btn btnForm ${classes.sendTicket}`}
                          />
                          <Loading class="input" show={this.state.loading} />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </React.Fragment>
            </LoadingOverlay>
          );
        }}
      </Consumer>
    );
  }
}
export default TicketsContent;
