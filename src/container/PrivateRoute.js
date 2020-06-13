import React from 'react'
import { Redirect } from 'react-router-dom';
import routes from '../constants/routes';

export default function PrivateRoute({ component: Component }) {
  const userLocalStorage = localStorage.getItem('user');
  if (!userLocalStorage) {
    return <Redirect to={routes.AUTH} />
  }

  return Component;
}
