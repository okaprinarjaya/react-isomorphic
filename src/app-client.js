import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRoutes from './components/AppRoutes';
import store from './store';

window.onload = () => {
    ReactDOM.render(
      <Provider store={store}>
        <AppRoutes />
      </Provider>,
      document.getElementById('main')
    );
}
