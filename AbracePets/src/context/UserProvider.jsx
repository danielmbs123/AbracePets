// UserProvider.js
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { UserProvider } from './contexts/UserContext';
import App from './App';

const Root = () => {
  return (
    <UserProvider>
      <App />
    </UserProvider>
  );
};

export default Root;
