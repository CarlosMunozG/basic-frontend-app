import React, { Component } from 'react';
import { withRouter} from 'react-router-dom';

import withAuth from '../../components/withAuth.js';
import MainButton from '../../components/MainButton.js';
import userService from '../../services/users-services.js';


class Private extends Component {
  state = {
    username: '',
    images: [],
  }

  componentDidMount(){
    userService.getCurrentUser()
    .then(response => {
      this.setState({
        username: response.data.newUser.username,
        images: response.data.newUser.images,
      })
    }).catch(error => console.log(error));
  }


render() {
  const { username, images } = this.state;
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
          addRoute={'/users'}
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
  )}
}

export default withRouter(withAuth(Private));