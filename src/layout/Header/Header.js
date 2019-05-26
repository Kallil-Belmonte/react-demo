import React from 'react';
import { NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Header.scss';

const Header = (props) => {
  return (
    <header data-component="Header">
      <img src="/assets/img/logo.svg" className="logo" alt="logo" />
      <h1 className="title">React Demo</h1>

      <nav className="main-menu">
        <ul>
          <li>
            <NavLink to="/" exact activeClassName="active">
              <FontAwesomeIcon icon="home" />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/blog" activeClassName="active">
              <FontAwesomeIcon icon="newspaper" />
              Blog
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" activeClassName="active">
              <FontAwesomeIcon icon="envelope" />
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink to="/account" activeClassName="active">
              <FontAwesomeIcon icon="user" />
              Account
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="welcome-box d-flex align-items-center position-absolute">
        <p className="mb-0 mr-3">Hello {props.userFullName}!</p>
        <button className="btn btn-dark" type="button" onClick={props.logOut}>Log out</button>
      </div>
    </header>
  );
};

export default Header;
