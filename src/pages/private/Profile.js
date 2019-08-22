import React from 'react';
import { Link } from 'react-router-dom';

import withAuth from '../../components/withAuth.js';
import GoBackButton from '../../components/GoBackButton.js';

const Profile = props => {
  const { username, images, location } = props.user;
    return (
    <section className='model-page'>
      <header>
        <GoBackButton />
      </header>
      <section>
        <div className='wrapper-center model-img profile-img'>
          {images.length > 0 ? (
            <img src={images[0]} alt={username}/>
            ) : (
            <img src={process.env.PUBLIC_URL + '/images/default-profile-picture.png'} alt='default profile'/>
          )}
        </div>
        <div className='info-model top-shadow'>
          <h1>{username}</h1>
          <p>Username</p>
          <h4>{location}</h4>
          <p>Location</p>
          <Link className='button-mini edit-button icon-shadow' to={`/settings/profile/edit`}>Edit Profile</Link>
        </div>
      </section>
    </section>
  )
}

export default withAuth(Profile);
