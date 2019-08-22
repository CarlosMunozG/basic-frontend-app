import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import withAuth from '../components/withAuth.js';

class Home extends Component {

  render() {
    return (
      <section className='intro'>
        <div className='img-intro'>
          <img src={process.env.PUBLIC_URL + '/images/dogjoy-intro.gif'} alt='dogjoy intro'/>
        </div>
        <div className='message-intro'>
          <div>
            <h1>DogJoy</h1>
            <h3>Finding different places for your pet…</h3>
            <p>Because your pet will do that for for you!</p>
          </div>
          <div>
            <Link className='btn-intro icon-shadow' to='/login'>Login</Link>
            <Link className='btn-intro icon-shadow' to='/Signup'>Signup</Link>
          </div>
        </div>
      </section>
    )
  }
}

export default withAuth(Home);