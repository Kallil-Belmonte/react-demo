import authReducer from '@/core/redux/reducers/auth';
import newsReducer from '@/core/redux/reducers/news';

const reducer = {
  auth: authReducer,
  news: newsReducer,
};

export default reducer;
