import React, { Component } from "react";
import TextInputGroup from "../../layout/TextInputGroup";
import axios from "axios";
import classes from "./Signup.module.sass";
import Logo from "../../assets/svg/logo";
import Cookies from "universal-cookie";
import { Consumer } from "../../context";
import { toast } from "react-toastify";
import Loading from "../../layout/Loading";

const cookies = new Cookies();
class Signup extends Component {
  state = {
    first_name: "",
    last_name: "",
    email: "",
    loading: false,
    errors: {}
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = async (dispatch, user, e) => {
    e.preventDefault();

    const { first_name, last_name, email } = this.state;
    //checking code
    if (!email) {
      this.setState({ errors: { email: "فیلد ایمیل اجباری است" } });
      return;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      this.setState({ errors: { email: "ایمیل معتبر نیست" } });
      return;
    }

    if (!first_name) {
      this.setState({ errors: { first_name: "فیلد نام اجباری است" } });
      return;
    }

    if (!last_name) {
      this.setState({ errors: { last_name: "فیلد نام خانوادگی اجباری است" } });
      return;
    }

    let data = new FormData();
    data.set("first_name", first_name);
    data.set("last_name", last_name);
    data.set("email", email);

    try {
      this.setState({ loading: true });
      axios
        .put(`${user["url_update"]}`, data, {
          headers: {
            Authorization: `Aparnik ${cookies.get("token")}`,
            "Content-Type": "application/json"
          }
        })
        .then(res => {
          this.setState({ loading: false });
          if (res.status === 200) {
            console.log(res.data);
            this.props.history.push("/dashboard");
            toast.success("اطلاعات شما با موفقیت بروز شد");
            this.setState({ isRegistered: true });
            dispatch({ type: "SIGNUP", payload: true });
          }
        })
        .catch(error => {
          let errorContent = "";
          this.setState({ loading: false });
          if (error.response.status === 500) {
            toast.error("خطایی در سرور رخ داده است لطفا دوباره امتحان کنید");
            return;
          }
          for (let key in error.response.data) {
            errorContent = errorContent.concat(
              error.response.data[key][0],
              "\n"
            );
          }
          toast.error(errorContent);
        });
    } catch (error) {
      toast.error("خطایی رخ داده است دوباره امتحان کنید");
    }
  };
  render() {
    const { first_name, last_name, email, errors } = this.state;
    return (
      <Consumer>
        {value => {
          const { dispatch, user } = value;
          return (
            <div className={classes.loginContainer}>
              <div className={classes.rightBg} />
              <form
                className={classes.loginForm}
                onSubmit={this.onSubmit.bind(this, dispatch, user)}
              >
                <div className={classes.topBg} />
                <Logo
                  className={`${classes.logo}`}
                  fill="#6bb5ef"
                  viewBox="0 0 500 500"
                />
                <p>ثبت نام</p>
                <TextInputGroup
                  name="first_name"
                  placeholder="نام"
                  value={first_name}
                  type="text"
                  onChange={this.onChange}
                  error={errors.first_name}
                />
                <TextInputGroup
                  name="last_name"
                  placeholder="نام خانوادگی"
                  value={last_name}
                  type="text"
                  onChange={this.onChange}
                  error={errors.last_name}
                />
                <TextInputGroup
                  name="email"
                  placeholder="ایمیل"
                  value={email}
                  type="text"
                  onChange={this.onChange}
                  error={errors.email}
                />
                <div style={{ position: "relative" }}>
                  <input
                    type="submit"
                    value="ثبت نام"
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

export default Signup;
