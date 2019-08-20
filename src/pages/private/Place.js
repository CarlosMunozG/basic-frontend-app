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
    popUp: false,
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
        popUp: false,
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

  showPopUp = () => {
    this.setState({
      popUp: true,
    })
  }
  
  closePopUp = () => {
    this.setState({
      popUp: false,
    })
  }



  render() {
    const { place, redirect, isLiked, owner, popUp } = this.state;
    return (
        <>
        <section className='model-page'>
          {place ? (
            <>
              <header>
                <GoBackButton />
                {!isLiked ? (
                  <button className='wrapper-center like' onClick={() => {
                    this.handleLikeClick(place._id)
                  }}>
                    <img src={process.env.PUBLIC_URL + '/images/unlike-icon.png'} alt='unlike icon'/>
                  </button>
                ) : (
                  <button className='wrapper-center like' onClick={() => {
                    this.handleUnlikeClick(place._id)
                  }}>
                    <img src={process.env.PUBLIC_URL + '/images/like-icon.png'} alt='like icon'/>
                  </button>
                ) }
              </header>
              <section>
                <div className='wrapper-center model-img-wrapper'>
                  <img src={place.images[0]} alt={place.name}/>
                </div>
                <div className='info-model top-shadow'>
                  <h1>{place.name}</h1>
                  <ViewMapButton addRoute='/places'/>
                  {this.props.user._id === place.owner ? (
                    <>
                      <Link to={`/places/${place._id}/edit`} className='wrapper-center icon-shadow edit-icon'>
                        <img src={process.env.PUBLIC_URL + '/images/edit-icon.png'} alt='edit icon'/>
                      </Link>
                      <div className='wrapper-center icon-shadow delete-icon' onClick={this.showPopUp}>
                        <img src={process.env.PUBLIC_URL + '/images/delete-icon.png'} alt='delete icon'/>
                      </div>
                    </>
                  ): null }             
                    <p>Global puntuation {place.likes}</p>
                </div>
                  <div>
                    <h3>Info</h3>
                    <p>indoors/outdoors: {place.inOutDoors}</p>
                    <p>{place.locationType}</p>
                    <p>categories: {place.categories}</p>
                    <p>free or paid: {place.money}</p>
                  </div>
                  <div>
                    <h3>Location</h3>
                    <p>Postal Code: {place.postalCode}</p>
                  </div>
                  <div>
                    <h3>Contact info</h3>
                    <Link to={`/places/owner/${owner._id}`}>Owner: {owner.username}</Link>
                  </div>
                  <div>
                    <h3>Description</h3>
                    <p>open: {place.bestMomentOfYear}</p>
                    <p>{place.description}</p>
                  </div>
              </section>
            </>
          ): <p>Loading...</p> }
        </section>
        {popUp ? (
          <section className='pop-up wrapper-center'>
            <figure className='normal-shadow'>
              <p>Confirm you want to delete this place?</p>
              <p className='like-form-button' onClick={this.closePopUp}>No</p>
              <button className='button-pop-up' onClick={() => {this.handleDeletePlaceClick(place._id)}}>Confirm</button>
            </figure>
          </section>
        ) : null}
        {redirect ? <Redirect to='/places-list'/> : null}
      </>
    )
  }
}

export default withAuth(Place);
