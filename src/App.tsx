import { RouterProvider } from 'react-router-dom';

import { Provider } from 'react-redux';

import store from '@/core/redux/store';
import router from '@/core/router';

const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;
