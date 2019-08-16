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
              <div className='wrapper-img icon-shadow'>
                <img src={process.env.PUBLIC_URL + '/images/dogjoy-home-icon.png'} alt='home icon'/>
              </div>
              {/* <p>Home</p> */}
            </Link>
            <Link to='/search'>
              <div className='wrapper-img icon-shadow'>
                <img src={process.env.PUBLIC_URL + './images/dogjoy-search-icon.png'} alt='search icon'/>
              </div>
              {/* <p>Search</p> */}
            </Link>
            <Link to='/favourites'>
              <div className='wrapper-img icon-shadow'>
               <img src={process.env.PUBLIC_URL + './images/dogjoy-favourites-icon.png'} alt='favourites icon'/>
              </div>
              {/* <p>Favourites</p> */}
            </Link>
            <Link to='/settings'>
              <div className='wrapper-img icon-shadow'>
                <img src={process.env.PUBLIC_URL + './images/dogjoy-profile-icon.png'} alt='profile icon'/>
              </div>
              {/* <p>Profile</p> */}
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