import React, { FormEvent } from 'react';
import Form from '../components/Form';
import { Credentials } from '../types';
import { register } from '../services';

export default () => {
  return (
    <Form
      title="Register"
      onSubmit={(e: FormEvent<HTMLFormElement>, credentials: Credentials) => {
        e.preventDefault();
        const appid = new URLSearchParams(window.location.search).get(
          'appid',
        ) as string;
        console.log(appid);
        register(appid, credentials);
      }}
    />
  );
};
