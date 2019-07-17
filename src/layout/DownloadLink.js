import React from 'react';
import Icons from '../assets/svg/icons.svg';
import classes from './DownloadLink.module.css';

const DownloadLink = ({ label, icon, href, size, className }) => {
  return (
    <React.Fragment>
      <a
        href={href}
        className={`${classes.downloadLink} ${className}`}
        target="_blank"
      >
        <svg
          className={`${classes.iconDownload} icon-${icon}`}
          fill={'#737381'}
          width={size}
          height={size}
        >
          <use xlinkHref={`${Icons}#icon-${icon}`} />
        </svg>
        {label}
      </a>
    </React.Fragment>
  );
};

export default DownloadLink;
