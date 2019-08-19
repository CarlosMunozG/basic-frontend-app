import React, {Component} from 'react';
import withAuth from '../../components/withAuth.js';
import GoBackButton from '../../components/GoBackButton.js';
import userService from '../../services/users-services.js';


class Profile extends Component {
  state = {
    username: '',
    id: '',
    images: [],
    location: '',
    favouritePlaces: [],
    friends: []
  }

  componentDidMount(){
    const {id} = this.props.match.params;
    userService.getUser(id)
    .then((response) => {
      const user = response.data.newUser;
      this.setState({
        username: user.username,
        id: user._id,
        images: user.images,
        location: user.location,
        favouritePlaces: user.favouritePlaces,
        friends: user.friends,
      })
    })
    .catch((error) =>{
      console.log(error);
    })
  }

  addFollowing = (id) => {
    console.log(this.state);
    const friends = [...this.state.friends, id];
    userService.addFriend(id)
    .then( () => {
      this.setState({
        friends,
      })
    })
    .catch( error => console.log(error) )
  }

  render(){
    const { username, password, images, location, id } = this.state;
     return (
      <div>
        <h1>Owner</h1>
        <GoBackButton />
        <section>
          <p>{username}</p>
          <p>{password}</p>
          <p>{images}</p>
          <p>{location}</p>
          <p>{username}</p>
          <p>{username}</p>
          <p>{username}</p>
          <p>{username}</p>
          <p>{username}</p>
          <button onClick={() => this.addFollowing(id)}>Follow</button>
        </section>
      </div>
    )
  }
}

export default withAuth(Profile);
