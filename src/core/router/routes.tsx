import Home from '@/pages/Home/Home';
import Blog from '@/pages/News/Blog/Blog';
import Post from '@/pages/News/Post/Post';
import EditPost from '@/pages/News/EditPost/EditPost';
import Contact from '@/pages/Contact/Contact';
import Account from '@/pages/Account/Account';
import Login from '@/pages/Auth/Login/Login';
import Register from '@/pages/Auth/Register/Register';
import NotFound from '@/pages/NotFound/NotFound';
import Guard from './Guard';

const ROUTES = [
  {
    path: '/',
    element: <Guard pageTitle="Home" component={<Home />} />,
  },
  {
    path: '/blog',
    element: <Guard pageTitle="Blog" component={<Blog />} />,
  },
  {
    path: '/post/:id',
    element: <Guard pageTitle="Post" component={<Post />} />,
  },
  {
    path: '/edit-post/:id',
    element: <Guard pageTitle="Edit Post" component={<EditPost />} />,
  },
  {
    path: '/contact',
    element: <Guard pageTitle="Contact" component={<Contact />} />,
  },
  {
    path: '/account',
    element: <Guard pageTitle="Account" component={<Account />} />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export default ROUTES;
