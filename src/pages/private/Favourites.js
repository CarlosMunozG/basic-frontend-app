import React from 'react';

import withAuth from '../../components/withAuth.js';
import MainButton from '../../components/MainButton.js';
import GoBackButton from '../../components/GoBackButton.js';

const Favourites = props => {
  return (
    <section className='main'>
      <header>
        <GoBackButton />
        <h1>My Favourites</h1>
        <p>{props.user.username}</p>
      </header>
      <section>
        <MainButton 
          addRoute={'/favourites/places'}
          title={'My favourite places'}
          img={'my-places.jpg'}
        />
        <MainButton 
          addRoute={'/friends'}
          title={'My favourite users'}
          img={'my-friends.jpg'}
        />
      </section>
    </section>
  )
}

export default withAuth(Favourites);