import React from 'react';

import { RouteComponentProps } from 'node_modules/@types/react-router';
import { Route, Switch } from 'react-router-dom';

import guard from '@/core/router/guard';
import AppDashboard from '@/core/layout/AppDashboard/AppDashboard';
import Home from '@/pages/Home/Home';
import Blog from '@/pages/News/Blog/Blog';
import Post from '@/pages/News/Post/Post';
import EditPost from '@/pages/News/EditPost/EditPost';
import Contact from '@/pages/Contact/Contact';
import Account from '@/pages/Account/Account';
import Login from '@/pages/Auth/Login/Login';
import Register from '@/pages/Auth/Register/Register';
import NotFound from '@/pages/NotFound/NotFound';

const Routes = [
  {
    path: '/',
    exact: true,
    component: () => guard('Home', <Home />),
  },
  {
    path: '/blog',
    exact: true,
    component: () => guard('Blog', <Blog />),
  },
  {
    path: '/post/:id',
    exact: true,
    component: () => guard('Post', <Post />),
  },
  {
    path: '/edit-post/:id',
    exact: true,
    component: () => guard('Edit Post', <EditPost />),
  },
  {
    path: '/contact',
    exact: true,
    component: () => guard('Contact', <Contact />),
  },
  {
    path: '/account',
    exact: true,
    component: () => guard('Account', <Account />),
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
