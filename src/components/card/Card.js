import React, { Component } from 'react';

import NoCard from './noCard/NoCard';
import AddCard from './addCard/AddCrad';

import classes from './Card.module.sass';

class Card extends Component {
  changeComponent = compnent => {
    switch (compnent) {
      case 'noCard':
        return <NoCard />;
      case 'addCard':
        return <AddCard />;
      default:
        return <NoCard />;
    }
  };
  render() {
    return (
      <div className={`${classes.applicationWrapper}`}>
        <NoCard />
      </div>
    );
  }
}
export default Card;
