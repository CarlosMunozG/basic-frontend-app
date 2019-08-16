import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import withAuth from '../../components/withAuth.js';
import GoBackButton from '../../components/GoBackButton.js';
import userService from '../../services/users-services.js';


class Profile extends Component {
  state = {
    username: '',
    password: '',
    image: '',
    location: '',
  }

  componentDidMount(){
    userService.getCurrentUser()
    .then((response) => {
      const user = response.data.newUser;
      this.setState({
        username: user.username,
        password: user.password,
        image: user.image,
        location: user.location,
      })
    })
    .catch((error) =>{
      console.log(error);
    })
  }

  render(){
    const { username, password, image, location, _id } = this.state;
     return (
      <div>
        <h1>Profile</h1>
        <GoBackButton />
        <section>
          <p>{username}</p>
          <p>{password}</p>
          <p>{image}</p>
          <p>{location}</p>
          <p>{username}</p>
          <p>{username}</p>
          <p>{username}</p>
          <p>{username}</p>
          <p>{username}</p>
          <Link to={`/settings/profile/edit`}>Edit Profile</Link>
        </section>
      </div>
    )
  }
}

export default withAuth(Profile);
