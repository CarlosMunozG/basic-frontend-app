import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withAuth from './withAuth.js';

class Navbar extends Component {
  
  render() {  
    const classNavbar = this.props.isLoggedIn ? 'is-private-navbar' : 'is-public-navbar'
    return (
      <div>
        {this.props.isLoggedIn ? ( 
          <nav className={classNavbar}>
            <Link to='/main'>
              <div>
                <img src='' alt=''/>
              </div>
              <p>Home</p>
            </Link>
            <Link to='/search'>
              <div>
                <img src='' alt=''/>
              </div>
              <p>Search</p>
            </Link>
            <Link to='/favourites'>
              <div>
                <img src='' alt=''/>
              </div>
              <p>Favourites</p>
            </Link>
            <Link to='/settings'>
              <div>
                <img src='' alt=''/>
              </div>
              <p>Profile</p>
            </Link>
            
          </nav>
        ) : (
          <>
            <Link to='/'>Home</Link>
            <Link to='/login'>Login</Link>
            <Link to='/signup'>Signup</Link>
          </>
        )}
      </div>
    )
  }
}

export default withAuth(Navbar);