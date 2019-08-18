import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import withAuth from '../../components/withAuth.js';
import places from '../../services/places-services.js';
import AddButton from '../../components/AddButton.js';
import ViewMapButton from '../../components/ViewMapButton.js';
import GoBackButton from '../../components/GoBackButton.js';

class PlacesList extends Component {
  state = {
    Places: []
  }

  componentDidMount(){
    places.getAllPlaces()
    .then((response) => {
      const { listOfPlaces } = response.data;
      this.setState({
        Places: listOfPlaces,
      })
    })
    .catch((error) =>{
      console.log(error);
    })
  }


  render() {
    const { Places } = this.state;
    return (
      <section className='places'>
        <header>
          <GoBackButton />
          <h1>Places List</h1>
          <ViewMapButton addRoute='/places' />
          <AddButton addRoute='/places/add'/>
        </header>
        <section>
          {Places.length > 0 ? (
            Places.map((place) => {
              return(
                <Link to={`places/${place._id}`} key={place._id} className='button-list normal-shadow'>
                  <div className='wrapper-img'>
                    <img src={place.images[0]} alt={place.name}/>
                  </div>
                  <div>
                    <h4>{place.name}</h4>
                    <p>Location</p>
                    <p>Leisure · Sports · Water</p>
                    <p>Punctiation</p>
                  </div>
                </Link>
              )
            })
          ) : <p>There are no places near you</p>}
        </section>
      </section>
    )
  }
}

export default withAuth(PlacesList);