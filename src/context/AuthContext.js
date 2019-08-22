import React, { Component } from 'react'
import authService from '../services/auth-service.js'

export const AuthContext = React.createContext();

class AuthProvider extends Component {
  state = {
    isLoggedIn: false,
    user: {},
    isLoading: true,
    position: [],
  }

  userSignUp = (user) => {
    return authService.signup(user)
    .then(() => {
      this.setState({
        user,
        isLoggedIn: true,
      })
    })
  }

  userLogin = (user) => {
    return authService.login(user)
    .then((user) => {
      this.setState({
        user,
        isLoggedIn: true,
      })
    })
  }

  userLogout = () => {
    return authService.logout()
    .then(() => {
      this.setState({
        user: {},
        isLoggedIn: false,
      })
    })
  }

  componentDidMount() {
    authService.me()
    .then(user => {
      this.setState({
        user,
        isLoggedIn: true,
        isLoading: false,
      })
    })
    .catch(()=> {
      this.setState({
        isLoggedIn: false,
        user: {},
        isLoading: false,
      })
    })
  }

  geolocateUser = () =>  {
    this.setState({loading: true},()=>{
      navigator.geolocation.getCurrentPosition((position) => {
        let location= [position.coords.latitude, position.coords.longitude];
       this.setState({
         position: location,
         loading: false,
       })
     })
    })
  
  }

  render() {
    const {user, isLoggedIn, isLoading, position } = this.state
    return (
      <>
        {isLoading ? <div class="lds-ring"><div></div><div></div><div></div><div></div></div> : (
          <AuthContext.Provider value={
            {
              user,
              isLoggedIn,
              position,
              getLocation: this.geolocateUser,
              login: this.userLogin,
              signup: this.userSignUp,
              logout: this.userLogout,
            }
          }>
            {this.props.children}
          </AuthContext.Provider>
        ) }
      </>
  
      
    )
  }
}

export default AuthProvider;