import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import withAuth from '../../components/withAuth.js';
import GoBackButton from '../../components/GoBackButton.js';
import userService from '../../services/users-services.js';
import LinkList from '../../components/LinkList.js';


class MyPlaces extends Component {
  state = {
    username:'',
    places: [],
  }

  componentDidMount(){
    const { id } = this.props.match.params;
    userService.getUser(id)
    .then((response) => {
      this.setState({
        username: response.data.newUser.username,
        places: response.data.newUser.favouritePlaces,
      })
    })
    .catch(error =>{ console.log(error) })
  }

  render() {
    const { places, username } = this.state;
    return (
      <section className='my-places'>
        <header>
          <GoBackButton />
          <h1>{username}'s places</h1>
        </header>
        <section>
          {places.length > 0 ? (
            places.map((place) => {
              return(
                <LinkList 
                  addRoute='/places'
                  id={place._id}
                  images={place.images}
                  name={place.name}
                />
              )
            })
          ) : (
          <div className='first-message'>
            <figure className='wrapper-center column'>
              <p>Your list of {username}'s favourite places is empty.</p>
              <p>Take a look at the map</p>
              <Link className='button-mini view-in-map icon-shadow' to='/places'>Map</Link>
            </figure>
          </div>
          )}
        </section>
      </section>
    )
  }  
}

export default withAuth(MyPlaces);