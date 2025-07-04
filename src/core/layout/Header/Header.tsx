import { useEffect } from 'react';

import { NavLink, useNavigate } from 'react-router-dom';

import { resetUser, setUser } from '@/core/redux/reducers/auth';
import { getUser } from '@/core/services';
import { Button, Icon } from '@/shared/components';
import { PROJECT_TITLE } from '@/shared/files/consts';
import { clearStorageData } from '@/shared/helpers';
import { useDispatch, useSelector } from '@/shared/hooks';
import './Header.scss';

const Header = () => {
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const navigate = useNavigate();

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
    navigate('/login');
  };

  // LIFECYCLE HOOKS
  useEffect(() => {
    getUserData();
  }, []); // eslint-disable-line

  return (
    <header data-layout="Header">
      <Icon className="logo mx-auto" category="Brand" name="Logo" />

      <h1 className="title">{PROJECT_TITLE}</h1>

      <nav className="main-menu">
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => `${isActive ? 'active' : ''} d-flex align-items-center`}
            >
              <Icon name="Home" />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/blog"
              className={({ isActive }) => `${isActive ? 'active' : ''} d-flex align-items-center`}
            >
              <Icon name="Newspaper" />
              Blog
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) => `${isActive ? 'active' : ''} d-flex align-items-center`}
            >
              <Icon name="Envelope" />
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/account"
              className={({ isActive }) => `${isActive ? 'active' : ''} d-flex align-items-center`}
            >
              <Icon name="User" />
              Account
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="welcome-box d-flex align-items-center">
        <p className="me-3">Hello {fullName}!</p>
        <Button onClick={handleLogOut}>Log out</Button>
      </div>
    </header>
  );
};

export default Header;
