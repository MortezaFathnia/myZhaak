import React from "react";
import PropTypes from "prop-types";
import Add from "../assets/svg/add";

import style from "./AddButton.module.css";
const Button = ({ label, onClick, type }) => {
  return (
    <button
      type="button"
      className={`btn btnForm ${style.sendTicket}`}
      onClick={onClick}
    >
      <Add
        style={{
          width: "10px",
          height: "10px",
          marginLeft: "5px",
          fill: "#ffff"
        }}
        viewBox="0 0 12 12"
      />
      {label}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

export default Button;
