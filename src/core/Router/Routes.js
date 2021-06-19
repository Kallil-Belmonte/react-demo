import React from 'react';

import RouterGuard from 'core/router/routerGuard';
import Home from 'pages/Home/Home';
import Blog from 'pages/News/Blog/Blog';
import Post from 'pages/News/Post/Post';
import EditPost from 'pages/News/EditPost/EditPost';
import Contact from 'pages/Contact/Contact';
import Account from 'pages/Account/Account';
import Login from 'pages/Auth/Login/Login';
import Register from 'pages/Auth/Register/Register';
import NotFound from 'pages/NotFound/NotFound';

const Routes = [
  {
    path: '/',
    exact: true,
    component: () => RouterGuard(<Home />),
  },
  {
    path: '/blog',
    exact: true,
    component: () => RouterGuard(<Blog />),
  },
  {
    path: '/post/:id',
    exact: true,
    component: () => RouterGuard(<Post />),
  },
  {
    path: '/edit-post/:id',
    exact: true,
    component: () => RouterGuard(<EditPost />),
  },
  {
    path: '/contact',
    exact: true,
    component: () => RouterGuard(<Contact />),
  },
  {
    path: '/account',
    exact: true,
    component: () => RouterGuard(<Account />),
  },
  {
    path: '/login',
    exact: true,
    component: () => <Login />,
  },
  {
    path: '/register',
    exact: true,
    component: () => <Register />,
  },
  {
    path: '*',
    exact: false,
    component: () => <NotFound />,
  },
];

export default Routes;
