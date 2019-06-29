import React, { Component } from 'react';

import NoApplication from './noApplication/NoApplication';
import AddApplication from './addApplication/AddApplication';

import classes from './Application.module.sass';

class Application extends Component {
  changeComponent = compnent => {
    switch (compnent) {
      case 'noApplication':
        return <NoApplication />;
      case 'addApplication':
        return <AddApplication />;
    }
  };
  render() {
    return (
      <div className={`${classes.applicationWrapper}`}>
        {this.changeComponent('noApplication')}
      </div>
    );
  }
}
export default Application;
