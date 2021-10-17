import React from 'react';

import { RouteComponentProps } from 'node_modules/@types/react-router';
import { Route } from 'react-router-dom';

import guard from '@/core/router/guard';
import AppDashboard from '@/core/layout/AppDashboard/AppDashboard';
import Home from '@/pages/Home/Home';
// import Blog from '@/pages/News/Blog/Blog';
// import Post from '@/pages/News/Post/Post';
// import EditPost from '@/pages/News/EditPost/EditPost';
import Contact from '@/pages/Contact/Contact';
// import Account from '@/pages/Account/Account';
import Login from '@/pages/Auth/Login/Login';
import Register from '@/pages/Auth/Register/Register';
import NotFound from '@/pages/NotFound/NotFound';

const Routes = [
  {
    path: '/',
    render: ({ match: { url } }: RouteComponentProps<any>) =>
      guard(
        <AppDashboard>
          <Route path={`${url}`} component={() => <Home />} exact />
          {/* <Route path={`${url}blog`} component={() => <Blog />} exact />
          <Route path={`${url}blog/post/:id`} component={() => <Post />} exact />
          <Route path={`${url}blog/edit-post/:id`} component={() => <EditPost />} exact />*/}
          <Route path={`${url}contact`} component={() => <Contact />} exact />
          {/*<Route path={`${url}account`} component={() => <Account />} exact /> */}
        </AppDashboard>,
      ),
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
