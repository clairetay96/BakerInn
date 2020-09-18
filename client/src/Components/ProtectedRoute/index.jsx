import React from 'react';
import { Redirect, Route, useHistory } from 'react-router-dom'
import Auth from '../../Auth';


function ProtectedRoute({ children, ...rest }) {
  let history = useHistory()
  return (
        <Route
            {...rest}
            render={({ location }) =>{
                return Auth.authenticate() === true 
                ? (children) 
                : (<Redirect to="/homepage"/>)
                }}
        />
    )
}

export default ProtectedRoute;

