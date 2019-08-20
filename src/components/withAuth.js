import React, {Component} from 'react';
import {AuthContext} from '../context/AuthContext';

const withAuth = (Comp) => {
  return class WithAuth extends Component {
    render() {
      return(
        <AuthContext.Consumer>
          {({ user, isLoggedIn, login, signup, logout, position, getLocation}) => (
            <Comp 
              user={user}  
              position={position}
              isLoggedIn={isLoggedIn} 
              login={login} 
              signup={signup} 
              logout={logout}
              getLocation={getLocation}
              {...this.props} 
            />
          )}
        </AuthContext.Consumer>
      )
    }
  }
}

export default withAuth;