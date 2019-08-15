import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import withAuth from '../withAuth.js';


const PrivateRoute = (props) => {
  const {isLoggedIn, component: Component, ...rest} = props;
  return (
    <>
      {isLoggedIn 
      ? <Route 
        render={(routeProps) => {
          return <Component {...routeProps}/>
      }}
      {...rest}
    /> 

    : <Redirect to='/' />}
    </>
  )
}

export default withAuth(PrivateRoute);
