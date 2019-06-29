import React from 'react';
import ColorPicker from 'rc-color-picker';

import classes from './CustomColorPicker.module.css';

class CustomColorPicker extends React.Component {
  state = {
    hexColor: '#477898'
  };
  changeHandler = colors => {
    // console.log(colors);
  };

  closeHandler = colors => {
    this.setState({ hexColor: colors.color });
    this.props.onSelected(colors.color);
  };

  render() {
    const { hexColor } = this.state;
    const styleSample = {
      background: hexColor,
      height: '23px',
      width: '23px',
      float: 'left',
      borderRadius: '50%',
      display: 'inline-blok'
    };
    return (
      <ColorPicker
        color={'#477898'}
        alpha={30}
        onChange={this.changeHandler}
        onClose={this.closeHandler}
        placement="bottomLeft"
        animation="slide-up"
        className={`${classes.containerColorPicker}`}
      >
        <div className={`${classes.colorPickerElem} rc-color-picker-trigger`}>
          {hexColor}
          <span style={styleSample} />
        </div>
      </ColorPicker>
    );
  }
}

export default CustomColorPicker;
