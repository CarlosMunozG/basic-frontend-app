import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import withAuth from '../withAuth.js';


const AnonRoute = (props) => {
  const {isLoggedIn, component: Component, ...rest} = props;
  return (
    <>
      {!isLoggedIn ? <Route 
        render={() => {
          return <Component {...props}/>
      }}
      {...rest}
    /> : <Redirect to='/main' />}
    </>
  )
}

export default withAuth(AnonRoute);
