import React, { Component } from "react";
import axios from "axios";
import Request from "../../../api/request";
import { toast } from "react-toastify";
import LoadingOverlay from "react-loading-overlay";
import Cookies from "universal-cookie";
import Chart from "../../../layout/Chart";
import SelectOption from "../../../layout/SelectOption";
import Settings from "../../../assets/svg/settings";
import { Consumer } from "../../../context";
import Select from "react-select";
import Logo from "../../../assets/svg/logo";

import classes from "./ChartReport.module.sass";
const cookies = new Cookies();
class ChartReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: props.label,
      value: props.value,
      adminUrl: props.url,
      data: [],
      categories: [],
      courseFilters: [],
      courseFilterType: "",
      impossibleChart: false,
      chartTypes: [
        { label: "ستونی", value: "bar" },
        { label: "دایره ای", value: "pie" },
        { label: "دونات", value: "donut" }
      ],
      sortTypes: [
        { label: "صعودی", value: "" },
        { label: "نزولی", value: "-" }
      ],
      dataLabels: {
        courses: "title",
        teachers: "user",
        products: "title",
        coupons: "code",
        audits: "id",
        users: "username_mention"
      },
      keyDataLabels: {
        courses: "",
        teachers: "last_name",
        products: "title",
        coupons: "",
        audits: "",
        users: ""
      },
      sortType: { value: "-" },
      chartType: "",
      existedChart: false,
      Loading: true,
      LoadingChartData: false,
      errors: {}
    };
    this.child = React.createRef();
  }
  async componentDidMount() {
    const { value, adminUrl } = this.state;
    const resCourseFilterType = await axios.get(adminUrl[`${value}-sort`], {
      headers: {
        Authorization: `Aparnik ${cookies.get("token")}`,
        "Content-Type": "application/json"
      }
    });
    try {
      let tempArray = [];
      tempArray = resCourseFilterType.data.map(item => {
        return { label: item.label, value: item.key };
      });
      this.setState({
        courseFilters: tempArray,
        Loading: false
      });
    } catch (error) {
      console.log(error);
      toast.error("خطایی رخ داده است دوباره امتحان کنید");
    }
  }
  submitFilter = async (adminUrl, event) => {
    event.preventDefault();
    let dataTemp = [];
    let categoriesTemp = [];
    let nonZeroItems = [];
    const {
      value,
      courseFilterType,
      sortType,
      existedChart,
      dataLabels,
      keyDataLabels
    } = this.state;
    if (!value) {
      this.setState({ errors: { value: "فیلد نوع نمودار اجباری است" } });
      return;
    }
    // if (!sortType) {
    //   this.setState({ errors: { sortType: "فیلد مرتب سازی اجباری است" } });
    //   return;
    // }

    if (!courseFilterType) {
      this.setState({
        errors: { courseFilterType: "فیلد نوع فیلتر اجباری است" }
      });
      return;
    }
    this.setState({ LoadingChartData: true });
    const resCourseFilterData = await axios.get(
      `${adminUrl[`${value}-list`]}?ordering=${sortType.value}${
        courseFilterType.value
      }`,
      {
        headers: {
          Authorization: `Aparnik ${cookies.get("token")}`,
          "Content-Type": "application/json"
        }
      }
    );
    try {
      this.setState({ LoadingChartData: false });
      if (resCourseFilterData.data.results.length === 0) {
        toast.error("داده ای برای نمایش وجود ندارد");
        return;
      }
      nonZeroItems = resCourseFilterData.data.results.filter(
        item => item.sort_count !== 0
      );
      if (nonZeroItems.length === 0) {
        toast.error("تمامی مقادیر داده ها صفر هستند");
        return;
      }
      resCourseFilterData.data.results.map(dataInput => {
        dataTemp.push(dataInput.sort_count);
        let item = keyDataLabels[value]
          ? dataInput[`${dataLabels[value]}`][`${keyDataLabels[value]}`]
          : dataInput[`${dataLabels[value]}`];
        categoriesTemp.push(item);
      });
      this.setState({
        data: dataTemp,
        existedChart: true,
        categories: categoriesTemp
      });
      if (existedChart) {
        this.child.current.chartRender();
      }
    } catch (error) {
      toast.error("خطایی رخ داده است دوباره امتحان کنید");
    }
  };
  render() {
    const {
      label,
      courseFilters,
      courseFilterType,
      data,
      categories,
      sortTypes,
      chartTypes,
      chartType,
      existedChart,
      LoadingChartData,
      Loading
    } = this.state;
    const { id } = this.props;
    return (
      <Consumer>
        {value => {
          const { adminUrl } = value;
          return (
            <div id={id} style={{ direction: "rtl" }}>
              <LoadingOverlay
                active={Loading}
                spinner
                text="در حال دریافت اطلاعات ..."
              >
                <fieldset className="zhaak_fieldset clearfix">
                  <legend className="zhaak_legend">{label}</legend>

                  <form onSubmit={this.submitFilter.bind(this, adminUrl)}>
                    <div className={`form-row form-group text-right`}>
                      <div className={`col-12`}>
                        <label>فیلد مورد نظر را انتخاب کنید:</label>
                        <Select
                          value={courseFilterType}
                          onChange={courseFilterType =>
                            this.setState({
                              courseFilterType
                            })
                          }
                          options={courseFilters}
                          rtl={true}
                          classNamePrefix="aparnik"
                          className={`aparnik_multiSelect`}
                          placeholder="یک مورد را انتخاب کنید"
                          id="couresFilterType"
                        />
                      </div>
                    </div>
                    <div className={`form-row form-group text-right`}>
                      <div className={`col-12`}>
                        <label>نوع نمودار:</label>
                        <Select
                          value={chartType}
                          onChange={chartType =>
                            this.setState({
                              chartType
                            })
                          }
                          options={chartTypes}
                          rtl={true}
                          classNamePrefix="aparnik"
                          className={`aparnik_multiSelect`}
                          placeholder="یک مورد را انتخاب کنید"
                          id="chartType"
                        />
                      </div>
                      {/* <div className={`col-6`}>
                        <label>مرتب سازی:</label>
                        <SelectOption
                          label="یک مورد را انتخاب کنید"
                          onChange={e =>
                            this.setState({
                              sortType: JSON.parse(e.target.value)
                            })
                          }
                          options={sortTypes}
                          titleKey={"label"}
                          id="sortType"
                        />
                      </div> */}
                    </div>
                    <div className={`${classes.btn_filter_wrapper} clearfix`}>
                      <button type="submit" className={`btn btnForm `}>
                        <Settings
                          className={`${classes.iconSettings}`}
                          style={{
                            width: "12px",
                            height: "12px",
                            marginLeft: "4px"
                          }}
                          fill="#fff"
                          viewBox="0 0 478.703 478.703"
                        />
                        اعمال فیلتر
                      </button>
                    </div>
                  </form>
                  <div className={`${classes.chartCantainer} clearfix`}>
                    {data.length > 0 && categories.length > 0 ? (
                      <Chart
                        ref={this.child}
                        type={chartType.value}
                        name={courseFilterType.label}
                        data={data}
                        categories={categories}
                        existedChart={existedChart}
                      />
                    ) : (
                      <LoadingOverlay
                        active={LoadingChartData}
                        spinner
                        text="در حال دریافت اطلاعات ..."
                      >
                        <div className={`${classes.noChartWrapper}`}>
                          <Logo
                            className={`${classes.logo} mb-1`}
                            fill="#737381"
                            width="40px"
                            viewBox="0 0 500 500"
                          />
                          <p style={{ color: "#737381" }}>
                            موردی برای نمایش وجود ندارد
                          </p>
                        </div>
                      </LoadingOverlay>
                    )}
                  </div>
                </fieldset>
              </LoadingOverlay>
            </div>
          );
        }}
      </Consumer>
    );
  }
}
export default ChartReport;
