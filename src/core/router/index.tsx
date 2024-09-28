import { createBrowserRouter } from 'react-router-dom';

import Home from '@/pages/Home/Home';
import Blog from '@/pages/News/Blog/Blog';
import Post from '@/pages/News/Post/Post';
import EditPost from '@/pages/News/EditPost/EditPost';
import Contact from '@/pages/Contact/Contact';
import Account from '@/pages/Account/Account';
import Login from '@/pages/Auth/Login/Login';
import Register from '@/pages/Auth/Register/Register';
import NotFound from '@/pages/NotFound/NotFound';
import AppGuard from './guards/app';
import AuthGuard from './guards/auth';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppGuard pageTitle="Home" component={<Home />} />,
  },
  {
    path: '/blog',
    element: <AppGuard pageTitle="Blog" component={<Blog />} />,
  },
  {
    path: '/post/:id',
    element: <AppGuard pageTitle="Post" component={<Post />} />,
  },
  {
    path: '/edit-post/:id',
    element: <AppGuard pageTitle="Edit Post" component={<EditPost />} />,
  },
  {
    path: '/contact',
    element: <AppGuard pageTitle="Contact" component={<Contact />} />,
  },
  {
    path: '/account',
    element: <AppGuard pageTitle="Account" component={<Account />} />,
  },
  {
    path: '/login',
    element: <AuthGuard pageTitle="Login" component={<Login />} />,
  },
  {
    path: '/register',
    element: <AuthGuard pageTitle="Register" component={<Register />} />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
