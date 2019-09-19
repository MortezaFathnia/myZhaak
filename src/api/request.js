import React from "react";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import axios from "axios";

const cookies = new Cookies();
const Request = (apiUrl, type, data, Authorization) => {
  return new Promise((resolve, reject) => {
    let header = Authorization
      ? {
          Authorization: `Aparnik ${cookies.get("token")}`,
          "Content-Type": "application/json"
        }
      : "";
    if (type === "post" || type === "put") {
      try {
        axios[type](apiUrl, data, { headers: header })
          .then(res => {
            if (res.status === 200 || res.status === 201) {
              resolve(res);
            }
          })
          .catch(error => {
            let errorContent = "";
            if (error.response.status === 500) {
              reject("خطایی در سرور رخ داده است لطفا دوباره امتحان کنید");
            }
            for (let key in error.response.data) {
              if (Object.keys(error.response.data).length > 1) {
                errorContent = errorContent.concat(
                  error.response.data[key][0],
                  "\n"
                );
              } else {
                errorContent = error.response.data[key];
              }
            }
            reject(errorContent);
          });
      } catch (error) {
        console.log(error);
        reject("خطایی رخ داده است دوباره امتحان کنید");
      }
    } else if (type === "get") {
      try {
        axios[type](apiUrl, { headers: header })
          .then(res => {
            if (res.status === 200 || res.status === 201) {
              resolve(res);
            }
          })
          .catch(error => {
            let errorContent = "";
            if (error.response.status === 500) {
              reject("خطایی در سرور رخ داده است لطفا دوباره امتحان کنید");
            }
            for (let key in error.response.data) {
              if (Object.keys(error.response.data).length > 1) {
                errorContent = errorContent.concat(
                  error.response.data[key][0],
                  "\n"
                );
              } else {
                errorContent = error.response.data[key];
              }
            }
            reject(errorContent);
          });
      } catch (error) {
        console.log(error);
        reject("خطایی رخ داده است دوباره امتحان کنید");
      }
    }
  });
};
export default Request;
