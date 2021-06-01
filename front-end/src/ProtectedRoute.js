import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import { isAuthenticated } from './services/localStorage';

function ProtectedRoute({ children, ...rest }) {
  return (
    <Route
      { ...rest }
      render={ () => (isAuthenticated() ? (
        <Switch>
          {children}
        </Switch>
      ) : <Redirect to="/login" />) }
    />
  );
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
