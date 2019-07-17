import React, { Component } from 'react';

import Icons from '../assets/svg/icons.svg';
import classes from './UploadBtn.module.css';

class UploadBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null
    };
  }
  onChangeHandler = event => {
    console.log(event.target.files[0]);
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0
    });
    this.props.onChange(this.props.id, event.target.files[0]);
  };
  removeFile = () => {
    this.setState({ selectedFile: '' });
  };

  bytesToSize = bytes => {
    var sizes = ['بایت', 'کیلوبایت', 'مگابایت', 'گیگابایت', 'ترابایت'];
    if (bytes === 0) return '0 بایت';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return sizes[i] + ' ' + Math.round(bytes / Math.pow(1024, i), 2);
  };
  render() {
    const { label, icon, size, id, loading } = this.props;
    const { selectedFile } = this.state;
    return (
      <React.Fragment>
        {selectedFile ? (
          <div>
            {/* {loading ? (
              <div
                className={`${classes.spinner} spinner-border text-primary`}
                role="status"
              >
                <span class="sr-only">Loading...</span>
              </div>
            ) : (
              ''
            )} */}
            <div className={`${classes.fileTitle}`}>
              <p className={`${classes.fileName}`}>
                {selectedFile.name.length > 25
                  ? selectedFile.name.substr(0, 25) + '...'
                  : selectedFile.name}
              </p>
              <bdi className={`${classes.fileSize}`}>
                {this.bytesToSize(selectedFile.size)}
              </bdi>
            </div>
            <span className={`${classes.fileType}`}>
              {selectedFile.name
                .split('.')[1]
                .substr(0, 3)
                .toUpperCase()}
            </span>
            <button
              className={`${classes.deleteBtn} btn`}
              onClick={this.removeFile}
            >
              X
            </button>
          </div>
        ) : (
          <React.Fragment>
            <label
              className={`${classes.labelUpload}`}
              htmlFor={`upload-${id}`}
            >
              <svg
                className={`${classes.iconUpload} icon-${icon}`}
                fill={'#6bb5ef'}
                width={size}
                height={size}
              >
                <use xlinkHref={`${Icons}#icon-${icon}`} />
              </svg>
              {label}
            </label>
            <input
              type="file"
              id={`upload-${id}`}
              className={`${classes.inputFile}`}
              onChange={this.onChangeHandler.bind(this)}
            />
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default UploadBtn;
