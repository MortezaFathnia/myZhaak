import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/svg/logo.svg';

import classes from './Header.module.css';
export default function Header() {
  return (
    <nav
      className={`navbar navbar-expand-sm mb-3 py-0 ${classes.customNavbar}`}
    >
      <div className="container">
        <div>
          <ul className={`${classes.listLink} navbar-nav`}>
            <li className="nav-item">
              <Link
                to="/"
                className={`${classes.link} nav-link ${classes.active} ${
                  classes.homeLink
                }`}
              >
                صفحه اصلی
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/" className={`${classes.link} nav-link`}>
                ویژگی ها
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/" className={`${classes.link} nav-link`}>
                تماس با ما
              </Link>
            </li>
            <li className={`nav-item ${classes.loginItem}`}>
              <Link
                to="/login"
                className={`${classes.link} ${classes.loginLink} nav-link`}
              >
                وورد / عضویت
              </Link>
            </li>
          </ul>
        </div>
        <Link to="/" className={`${classes.link} navbar-brand mr-auto`}>
          <img src={logo} className={`${classes.brand}`} />
        </Link>
      </div>
    </nav>
  );
}
