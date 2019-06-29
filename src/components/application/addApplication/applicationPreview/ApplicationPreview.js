import React from 'react';
import Icons from '../../../../assets/svg/icons.svg';
import Notification from '../../../../assets/svg/notification';
import Search from '../../../../assets/svg/search';
import Settings from '../../../../assets/svg/settings';
import Download from '../../../../assets/svg/download';
import Folder from '../../../../assets/svg/folder';
import Analysis from '../../../../assets/svg/analysis';
import Diagram from '../../../../assets/svg/diagram';
import Computter from '../../../../assets/svg/computer';
import LineChart from '../../../../assets/svg/lineChart';
import CloseEnvelop from '../../../../assets/svg/closeEnvelop';

import classes from './applicationPreview.module.sass';

const ApplicationPreview = ({ color, secondColor, iconColor }) => {
  let style = {};
  let complementaryStyle = {};
  let iconStyle = {};
  if (color) {
    style = {
      background: color
    };
  }
  if (secondColor) {
    complementaryStyle = {
      background: secondColor
    };
  }
  if (iconColor) {
    iconStyle = {
      background: iconColor
    };
  }
  return (
    <div className={`${classes.mobilePreview} clearfix`}>
      <div className={`${classes.windowMobilePreview}`} style={style}>
        <div className={`${classes.headerMobilePreview}`}>
          {/* todo change upload pic */}
          <Search
            style={{
              width: '20px',
              height: '20px',
              marginRight: '4px',
              marginTop: '4px'
            }}
            viewBox="0 0 52.966 52.966"
          />
          <div className={`${classes.logoWrapper}`}>
            <p>لوگوی صفحه اصلی</p>
          </div>
          <Notification
            style={{
              width: '20px',
              height: '20px',
              marginLeft: '4px',
              marginTop: '4px'
            }}
            viewBox="0 0 512 512"
          />
        </div>
        <div className={`${classes.previewProfileImage}`}>
          <svg className={`${classes.iconUser}`}>
            <use xlinkHref={`${Icons}#icon-user`} />
          </svg>
          <Settings
            className={`${classes.iconSettings}`}
            style={{
              width: '20px',
              height: '20px',
              marginLeft: '4px',
              marginTop: '4px'
            }}
            viewBox="0 0 478.703 478.703"
          />
        </div>
      </div>
      <div
        className={`${classes.tabsWrapper} clearfix`}
        style={complementaryStyle}
      >
        <div className={`${classes.tab}`} style={style} />
      </div>
      <ul className={`${classes.listIconsItems} clearfix`}>
        <li>
          <Download
            className={`${classes.iconDownload}`}
            style={{
              width: '20px',
              height: '20px',
              marginLeft: '4px',
              marginTop: '4px'
            }}
            fill={iconColor}
            viewBox="0 0 512 512"
          />
          <div style={iconStyle} />
        </li>
        <li>
          <Folder
            className={`${classes.iconDownload}`}
            style={{
              width: '20px',
              height: '20px',
              marginLeft: '4px',
              marginTop: '4px'
            }}
            fill={iconColor}
            viewBox="0 0 60 60"
          />
          <div style={iconStyle} />
        </li>
        <li>
          <Analysis
            className={`${classes.iconDownload}`}
            style={{
              width: '20px',
              height: '20px',
              marginLeft: '4px',
              marginTop: '4px'
            }}
            fill={iconColor}
            viewBox="0 0 512 512"
          />
          <div style={iconStyle} />
        </li>
        <li>
          <Diagram
            className={`${classes.iconDownload}`}
            style={{
              width: '20px',
              height: '20px',
              marginLeft: '4px',
              marginTop: '4px'
            }}
            fill={iconColor}
            viewBox="0 0 480.006 480.006"
          />
          <div style={iconStyle} />
        </li>
        <li>
          <Computter
            className={`${classes.iconDownload}`}
            style={{
              width: '20px',
              height: '20px',
              marginLeft: '4px',
              marginTop: '4px'
            }}
            fill={iconColor}
            viewBox="0 0 372 372"
          />
          <div style={iconStyle} />
        </li>
        <li>
          <LineChart
            className={`${classes.iconDownload}`}
            style={{
              width: '20px',
              height: '20px',
              marginLeft: '4px',
              marginTop: '4px'
            }}
            fill={iconColor}
            viewBox="0 0 486.742 486.742"
          />
          <div style={iconStyle} />
        </li>
        <li>
          <CloseEnvelop
            className={`${classes.iconDownload}`}
            style={{
              width: '20px',
              height: '20px',
              marginLeft: '4px',
              marginTop: '4px'
            }}
            fill={iconColor}
            viewBox="0 0 14 14"
          />
          <div style={iconStyle} />
        </li>
        <li>
          <Settings
            className={`${classes.iconDownload}`}
            style={{
              width: '20px',
              height: '20px',
              marginLeft: '4px',
              marginTop: '4px'
            }}
            fill={iconColor}
            viewBox="0 0 478.703 478.703"
          />
          <div style={iconStyle} />
        </li>
      </ul>
    </div>
  );
};

export default ApplicationPreview;
