import React, { Component } from 'react';
import UploadsDoc from './uploadsDoc/UploadsDoc';
import RightContentUploadsDoc from './uploadsDoc/RightContentUploadsDoc';
import UserRegister from './userRegister/UserRegister';
import RightContentRegister from './userRegister/RightContentRegister';
import { Consumer } from '../../../context';

import classes from '../Upgrade.module.sass';

class TabComponent extends Component {
  steps = step => {
    switch (step) {
      case 'userRegister':
        return <UserRegister />;
      case 'uploadsDoc':
        return <UploadsDoc />;
      case 'success':
        return '';
      case 'agreement':
        return '';
      default:
        return <UserRegister />;
    }
  };
  rightContent = step => {
    switch (step) {
      case 'userRegister':
        return <RightContentRegister />;
      case 'uploadsDoc':
        return <RightContentUploadsDoc />;
      case 'success':
        return '';
      case 'agreement':
        return '';
      default:
        return <RightContentRegister />;
    }
  };
  render() {
    return (
      <Consumer>
        {value => {
          const { step } = value;
          return (
            <div className={`${classes.registerForm}`}>
              <div className={`row`}>
                <div
                  className={`${classes.rightContent} d-none d-sm-block col-4 `}
                >
                  {this.rightContent(step)}
                </div>
                {this.steps(step)}
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default TabComponent;
