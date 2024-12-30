import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        const isLoggedIn = sessionStorage.getItem('isLoggedIn');
        if (isLoggedIn) {
          return <Component {...props} />;
        } else {
          // Redirect to login if not authenticated
          return <Redirect to="/" />;
        }
      }}
    />
  );
};

export default ProtectedRoute;
