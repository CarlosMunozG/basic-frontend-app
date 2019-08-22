import React from 'react';

import withAuth from '../../components/withAuth.js';
import MainButton from '../../components/MainButton.js';

const Private = props => {
  const { username, images } = props.user;
  return (
    <section className='main'>
      <header>
        <h1>Welcome {username}</h1>
        <p>What do your pet wanna do?</p>
      </header>
      <section>
        {images.length > 0 ? null: (
          <MainButton 
            addRoute={'/settings/profile/edit'}
            title={'Complete Profile'}
            img={'complete-profile.jpg'}
          />
        )}
        <MainButton 
          addRoute={'/places'}
          title={'Find places'}
          img={'places.jpg'}
        />
        <MainButton 
          addRoute={''}
          title={'Find people'}
          img={'people.jpg'}
        />
        <MainButton 
          addRoute={''}
          title={'Find events'}
          img={'events.jpg'}
        />
      </section>
    </section>
  )
}

export default withAuth(Private);