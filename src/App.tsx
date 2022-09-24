import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Provider } from 'react-redux';

import store from '@/core/redux/store';
import ROUTES from '@/core/router/routes';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {ROUTES.map(route => (
            <Route key={route.path} {...route} />
          ))}
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
