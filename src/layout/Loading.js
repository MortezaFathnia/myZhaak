import React, { Component } from 'react';
import classes from './Loading.module.css';
class Loading extends Component {
  state = { loading: 'none' };
  render() {
    const show = this.props.show;
    return this.props.show ? (
      <div
        className={`${classes[this.props.class]} spinner-grow`}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    ) : (
      ''
    );
  }
}
export default Loading;
