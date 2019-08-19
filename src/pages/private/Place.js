import React, { Component } from 'react'
import {Link, Redirect} from 'react-router-dom';

import withAuth from '../../components/withAuth.js';
import places from '../../services/places-services.js';
import GoBackButton from '../../components/GoBackButton.js';
import ViewMapButton from '../../components/ViewMapButton.js';
import userService from '../../services/users-services.js';


class Place extends Component {
  state = {
    place: null,
    redirect: false,
    isLiked: false,
    owner: null,
  }

  componentDidMount(){
    const {id} = this.props.match.params;
    places.getOnePlace(id)
    .then((response) => {
      const newPlace = response.data.onePlace;
      const newOwner = response.data.ownerData;
      this.setState({
        place: newPlace,
        owner: newOwner,
      })
    })
    .catch((error) =>{
      console.log(error);
    })
  }

  handleDeletePlaceClick = (id) => {
    places.deletePlace(id)
    .then(() => {
      this.setState({
        redirect: true,
      })
    })
  }
 
  handleLikeClick = (placeId) => {
    //const userId = this.props.user._id;
    userService.addLike(placeId)
    .then(() => {
      this.setState({
        isLiked: true,
      })
    })
  }

  handleUnlikeClick = (placeId) => {
    //const userId = this.props.user._id;
    userService.deleteLike(placeId)
    .then(() => {
      this.setState({
        isLiked: false,
      })
    })
  }


  render() {
    const { place, redirect, isLiked, owner } = this.state;
    return (
        <section className='model'>
          { place ? (
            <>
              <section>
                <section>
                  <div className='wrapper-center'>
                    <img src={place.images[0]} alt={place.name}/>
                  </div>
                <GoBackButton />
                <h1>{place.name}</h1>
                <ViewMapButton addRoute='/places'/>
                {this.props.user._id === place.owner ? (
                  <>
                    <Link to={`/places/${place._id}/edit`}>edit</Link>
                    <button onClick={() => {
                      this.handleDeletePlaceClick(place._id)
                    }}>Delete</button>
                  </>
                ): null }
                {!isLiked ? (
                  <button onClick={() => {
                    this.handleLikeClick(place._id)
                  }}>like</button>
                ) : (
                  <button onClick={() => {
                    this.handleUnlikeClick(place._id)
                  }}>like</button>
                ) }
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
                  <Link to={`/places/owner/${owner._id}`}>Owner: {owner.username}</Link>
                </section>
                <section>
                  <h3>Description</h3>
                  <p>open: {place.bestMomentOfYear}</p>
                  <p>{place.description}</p>
                </section>
              </section>
            </>
          ): <p>Loading...</p> }
        {redirect ? <Redirect to='/places-list'/> : null}
        </section>
      
    )
  }
}

export default withAuth(Place);
