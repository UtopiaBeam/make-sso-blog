import React from 'react';
import { RouteProps, Route } from 'react-router';
import Login from './views/Login';
import Register from './views/Register';

const routes: RouteProps[] = [
  { path: '/', exact: true, component: Login },
  { path: '/register', exact: true, component: Register },
];

export default routes.map((route, index) => (
  <Route key={index} {...route}></Route>
));
