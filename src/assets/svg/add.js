import React from "react";

const SVG = ({
  style = {},
  fill = "#000",
  width = "100%",
  className = "",
  viewBox = "0 0 27.036 8.547"
}) => (
  <svg
    width={width}
    style={style}
    height={width}
    fill={fill}
    viewBox={viewBox}
    xmlns="http://www.w3.org/2000/svg"
    className={`svg-icon ${className || ""}`}
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <g id="Page-1" stroke="none" stroke-width="2" fill-rule="evenodd">
      <g
        id="A0"
        transform="translate(-937.000000, -5312.000000)"
        fill-rule="nonzero"
      >
        <g id="Group" transform="translate(815.000000, 5302.000000)">
          <g id="plus-symbol" transform="translate(122.000000, 10.000000)">
            <path
              d="M0.419625,6.315375 C0.1875,6.315375 0.003,6.124875 0.003,5.89275 C0.003,5.660625 0.1875,5.476125 0.419625,5.476125 L5.47275,5.476125 L5.47275,0.422625 C5.473125,0.1905 5.663625,0 5.89575,0 C6.127875,0 6.312375,0.1905 6.312375,0.422625 L6.312375,5.476125 L11.3655,5.476125 C11.597625,5.476125 11.788125,5.660625 11.788125,5.89275 C11.788125,6.124875 11.597625,6.315375 11.3655,6.315375 L6.312375,6.315375 L6.312375,11.368875 C6.312375,11.601 6.127875,11.7915 5.89575,11.7915 C5.663625,11.7915 5.473125,11.601 5.473125,11.368875 L5.473125,6.315375 L0.419625,6.315375 Z"
              id="Path"
            />
          </g>
        </g>
      </g>
    </g>
  </svg>
);

export default SVG;
