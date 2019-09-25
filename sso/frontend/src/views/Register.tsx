import React from 'react';
import Form from '../components/Form';

export default () => {
  return (
    <Form
      title="Register"
      onSubmit={() => {
        console.log('Hi');
      }}
    />
  );
};
