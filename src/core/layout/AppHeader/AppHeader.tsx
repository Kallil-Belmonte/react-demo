import React, { useEffect } from 'react';

import { NavLink, useHistory } from 'react-router-dom';

import Logo from '@/assets/icons/brand/logo.svg';
import { PROJECT_TITLE } from '@/shared/files/consts';
import { clearStorageData } from '@/shared/helpers';
import { useSelector, useDispatch } from '@/shared/hooks';
import { setUser, resetUser } from '@/core/redux/reducers/auth';
import { getUser } from '@/core/services/auth';
import { AppIcon } from '@/shared/components';
import './AppHeader.scss';

const Header = () => {
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const history = useHistory();

  const fullName = `${user.firstName} ${user.lastName}`;

  const getUserData = async () => {
    if (fullName.trim()) return;

    try {
      const response = await getUser('id');
      dispatch(setUser(response));
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const handleLogOut = () => {
    clearStorageData();
    dispatch(resetUser());
    history.push('/login');
  };

  // LIFECYCLE HOOKS
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <header data-component="AppHeader">
      <img src={Logo} className="logo" alt="logo" />

      <h1 className="title">{PROJECT_TITLE}</h1>

      <nav className="main-menu">
        <ul>
          <li>
            <NavLink to="/" exact activeClassName="active" className="d-flex align-items-center">
              <AppIcon icon="Home" />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/blog" activeClassName="active" className="d-flex align-items-center">
              <AppIcon icon="Newspaper" />
              Blog
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" activeClassName="active" className="d-flex align-items-center">
              <AppIcon icon="Envelope" />
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink to="/account" activeClassName="active" className="d-flex align-items-center">
              <AppIcon icon="User" />
              Account
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="welcome-box d-flex align-items-center position-absolute">
        <p className="mb-0 me-3">Hello {fullName}!</p>
        <button className="btn btn-dark" type="button" onClick={handleLogOut}>
          Log out
        </button>
      </div>
    </header>
  );
};

export default Header;
