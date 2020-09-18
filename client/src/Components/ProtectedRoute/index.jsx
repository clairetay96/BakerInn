import React from 'react';
import { Route, useHistory } from 'react-router-dom'
import Auth from '../../Auth';


function ProtectedRoute({ children, ...rest }) {
  let history = useHistory()
  return (
        <Route
            {...rest}
            render={({ location }) =>{
                Auth.authenticate((valid) => {
                  if (valid) {
                    return (children)
                  } else {
                    return history.push("/homepage")
                  }
                })
            }}
        />
    )
}

export default ProtectedRoute;

