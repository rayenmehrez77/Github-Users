import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const PrivateRoute = ({children, ...otherProps}) => {  
  const { isAuthenticated, user } = useAuth0(); 
  console.log(isAuthenticated, user)
  const isUser = isAuthenticated && user; 
  console.log(isUser)

  return <Route {...otherProps} render={() => { 
    return isUser ? children : <Redirect to="/login" /> 
  }}>
  </Route>;
};
export default PrivateRoute;
