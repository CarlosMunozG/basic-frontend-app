import React, { Component } from 'react'
import {Link} from 'react-router-dom';

import withAuth from '../../components/withAuth.js';
import places from '../../services/places-services.js';
import GoBackButton from '../../components/GoBackButton.js';
import ViewMapButton from '../../components/ViewMapButton.js';


class Place extends Component {
  state = {
    currentUserId: '',
    place: null,
  }

  componentDidMount(){
    const {id} = this.props.match.params;
    places.getOnePlace(id)
    .then((response) => {
      const newPlace = response.data.onePlace;
      const newCurrentUserId = this.props.user._id;
      this.setState({
        place: newPlace,
        currentUserId: newCurrentUserId,
      })
    })
    .catch((error) =>{
      console.log(error);
    })
  }




  render() {
    console.log(this.props.user._id);
    const { place, currentUserId } = this.state;
    return (
        <section className='model'>
          { place ? (
            <>
              <section>
                <section>
                  <div className='wrapper-img'>
                    <img src={place.images[0]} alt={place.name}/>
                  </div>
                <GoBackButton />
                <h1>{place.name}</h1>
                <ViewMapButton addRoute='/places'/>
                {this.props.user._id === place.owner ? (
                  <Link to={`/places/${place._id}/edit`}>edit</Link>
                ): null }
                </section>
                <section>
                  <h3>{place.name}</h3>
                  <p>Valoracion global {place.likes}</p>
                </section>
                <section>
                  <h3>Info</h3>
                  <p>indoors/outdoors: {place.inOutDoors}</p>
                  <p>{place.locationType}</p>
                  <p>categories: {place.categories}</p>
                  <p>free or paid: {place.money}</p>
                </section>
                <section>
                  <h3>Location</h3>
                  <p>Postal Code: {place.postalCode}</p>
                </section>
                <section>
                  <h3>Contact info</h3>
                  <p>Owner: {place.owner}</p>
                </section>
                <section>
                  <h3>Description</h3>
                  <p>open: {place.bestMomentOfYear}</p>
                  <p>{place.description}</p>
                </section>
              </section>
            </>
          ): <p>Loading...</p> }
        </section>
  
      
    )
  }
}

export default withAuth(Place);
