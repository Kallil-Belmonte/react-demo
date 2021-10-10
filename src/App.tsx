import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';

import store from '@/core/redux/store';
import Routes from '@/core/router/routes';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          {Routes.map(route => (
            <Route key={route.path} {...route} />
          ))}
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
