import React, { FormEvent, useEffect } from 'react';
import Form from '../components/Form';
import { Credentials } from '../types';
import Cookies from 'universal-cookie';
import { loginWithToken, login } from '../services';

export default () => {
  useEffect(() => {
    const token = new Cookies().get('token');
    if (token) {
      const appid = new URLSearchParams().get('appid') as string;
      loginWithToken(appid, token);
    }
  });
  return (
    <Form
      title="Login"
      onSubmit={(e: FormEvent<HTMLFormElement>, credentials: Credentials) => {
        e.preventDefault();
        const appid = new URLSearchParams().get('appid') as string;
        login(appid, credentials);
      }}
    />
  );
};
