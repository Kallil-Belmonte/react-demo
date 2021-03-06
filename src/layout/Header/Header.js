import React from 'react';

import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Logo from 'shared/images/logo.svg';
import { PROJECT_TITLE } from 'shared/files/consts';

import './Header.scss';

const Header = ({ userFullName, onLogOut }) => {
  return (
    <header data-component="Header">
      <img src={Logo} className="logo" alt="logo" />
      <h1 className="title">{PROJECT_TITLE}</h1>

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
        <p className="mb-0 mr-3">Hello {userFullName}!</p>
        <Button variant="dark" onClick={onLogOut}>
          Log out
        </Button>
      </div>
    </header>
  );
};

export default Header;
