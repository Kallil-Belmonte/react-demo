import type { FunctionComponent } from 'react';

import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import store from '@/core/redux/store';
import router from '@/core/router';

const App: FunctionComponent = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;
