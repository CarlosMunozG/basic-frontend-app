import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withAuth from '../../components/withAuth.js';
import userService from '../../services/users-services.js';


class Private extends Component {
  state = {
    username: '',
    images: [],
  }

  componentDidMount() {
    userService.getCurrentUser()
    .then((response) => {
      const user = response.data.newUser;
      this.setState({
        username: user.username,
        images: user.images,
      })
    })
    .catch((error) =>{
      console.log(error);
    })
  }

  render() {
    const { username, images } = this.state;
    return (
      <section className='main'>
        <header>
          <h1>Welcome {username}</h1>
          {/* What do Bobby wanna do? poner el nombre de la mascota cuando lo tenga */}
          <p>What do your pet wanna do?</p>
        </header>
        <section>
          {images.length > 0 ? null: (
            <Link to='settings/profile/edit'className='button-main normal-shadow'>
              <div className='wrapper-img'>
                {/* <img src='' alt=''/> */}
              </div>
              <p>Complete Profile</p>
            </Link>
          )}
          <Link to='/search-places' className='button-main normal-shadow'>
            <div className='wrapper-img'>
              {/* <img src='' alt=''/> */}
            </div>
            <p>Find places</p>
          </Link>
          <Link to='' className='button-main normal-shadow'>
            <div className='wrapper-img'>
              {/* <img src='' alt=''/> */}
            </div>
            <p>Find events</p>
          </Link>
        </section>
      </section>
    )
  }
}

export default withAuth(Private);