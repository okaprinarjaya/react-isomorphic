import React from 'react';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from '../routes';
import store from '../store';

const history = syncHistoryWithStore(browserHistory, store);

export default class AppRoutes extends React.Component {
  render() {
    return (
      <Router history={history} routes={routes} onUpdate={() => window.scrollTo(0, 0)} />
    );
  }
}