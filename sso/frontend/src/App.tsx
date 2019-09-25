import React from 'react';
import { Switch, Router } from 'react-router';
import routes from './routes';
import { createBrowserHistory } from 'history';
import './App.css';

export default () => {
  return (
    <Router history={createBrowserHistory()}>
      <Switch>{routes}</Switch>
    </Router>
  );
};
