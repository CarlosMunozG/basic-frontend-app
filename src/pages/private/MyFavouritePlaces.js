import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import withAuth from '../../components/withAuth.js';
import GoBackButton from '../../components/GoBackButton.js';
import places from '../../services/places-services.js';
import AddButton from '../../components/AddButton.js';
import ViewMapButton from '../../components/ViewMapButton.js';
import LinkList from '../../components/LinkList.js';


class MyPlaces extends Component {
  state = {
    myFavouritePlaces: []
  }

  componentDidMount(){
    places.getAllMyFavouritePlaces()
    .then((response) => {
      this.setState({
        myFavouritePlaces: response.data.listOfMyPlaces.favouritePlaces,
      })
    })
    .catch(error =>{ console.log(error) })
  }

  render() {
    const { myFavouritePlaces } = this.state;
    return (
      <section className='my-places'>
        <header>
          <GoBackButton />
          <h1>My Favourite Places</h1>
          <ViewMapButton addRoute='/favourites/places/map'/>
          <AddButton addRoute='/places'/>
        </header>
        <section>
          {myFavouritePlaces.length > 0 ? (
            myFavouritePlaces.map((place) => {
              return(
                <LinkList 
                  id={place._id}
                  images={place.images}
                  name={place.name}
                />
              )
            })
          ) : (
            <div className='first-message'>
              <figure className='wrapper-center column'>
                <p>Your list of favourite places is empty.</p>
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