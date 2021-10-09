import authReducer from '@/core/redux/reducers/auth';
import blogReducer from '@/core/redux/reducers/blog';

const reducer = {
  auth: authReducer,
  blog: blogReducer,
};

export default reducer;
