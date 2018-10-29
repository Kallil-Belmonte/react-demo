import React from 'react';

import RouteGuard from './RouteGuard';
import Home from '../../pages/Home/Home';
import Blog from '../../pages/News/Blog/Blog';
import Post from '../../pages/News/Post/Post';
import EditPost from '../../pages/News/EditPost/EditPost';
import Contact from '../../pages/Contact/Contact';
import Account from '../../pages/Account/Account';
import Login from '../../pages/Auth/Login/Login';
import Register from '../../pages/Auth/Register/Register';
import NotFound from '../../pages/NotFound/NotFound';

const Routes = [
  {
    path: '/',
    exact: true,
    component: () => RouteGuard(<Home />)
  },
  {
    path: '/blog',
    exact: true,
    component: () => RouteGuard(<Blog />)
  },
  {
    path: '/post/:id',
    exact: true,
    component: () => RouteGuard(<Post />)
  },
  {
    path: '/edit-post/:id',
    exact: true,
    component: () => RouteGuard(<EditPost />)
  },
  {
    path: '/contact',
    exact: true,
    component: () => RouteGuard(<Contact />)
  },
  {
    path: '/account',
    exact: true,
    component: () => RouteGuard(<Account />)
  },
  {
    path: '/login',
    exact: true,
    component: () => <Login />
  },
  {
    path: '/register',
    exact: true,
    component: () => <Register />
  },
  {
    path: '*',
    exact: false,
    component: () => RouteGuard(<NotFound />)
  }
];

export default Routes;
