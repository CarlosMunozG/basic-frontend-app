import React, { Component } from 'react'
import {Link, Redirect} from 'react-router-dom';

import withAuth from '../../components/withAuth.js';
import places from '../../services/places-services.js';
import GoBackButton from '../../components/GoBackButton.js';
import ViewMapButton from '../../components/ViewMapButton.js';
import LinkText from '../../components/LinkText.js';
import LinkText2 from '../../components/LinkText2.js';
import LinkTextWithMapping from '../../components/LinkTextWithMapping.js';


class Place extends Component {
  state = {
    place: null,
    redirect: false,
    isLiked: false,
    owner: null,
    opinions: [],
    popUp: false,
    likes: [],
    favouritePlaces: []
  }

  componentDidMount(){
    const {id} = this.props.match.params;
    const userId = this.props.user._id;
    places.getOnePlace(id)
    .then((response) => {
      console.log(response.data);
      const newPlace = response.data.onePlace;
      const newOwner = response.data.ownerData;
      const newOpinions = response.data.onePlace.opinions;
      if(newPlace.likes.includes(userId)){
        this.setState({
          place: newPlace,
          owner: newOwner,
          opinions: newOpinions,
          isLiked: true,
        })
      }
      this.setState({
        place: newPlace,
        owner: newOwner,
      })
    })
    .catch((error) =>{
      console.log(error);
    })
  }

  handleDeletePlaceClick = (placeId) => {
    const newFavPlaces = this.props.user.favouritePlaces.pop(placeId);
    places.deletePlace(placeId)
    .then(() => {
      this.setState({
        redirect: true,
        popUp: false,
        favouritePlaces: newFavPlaces,
      })
    })
  }
 
  handleLikeClick = (placeId) => {
    const newFavPlaces = this.props.user.favouritePlaces.push(placeId);
    places.addLike(placeId)
    .then(() => {
      this.setState({
        isLiked: true,
        favouritePlaces: newFavPlaces,
      })
    })
  }

  handleUnlikeClick = (placeId) => {
    places.deleteLike(placeId)
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

  userDidGaveOpinion = () => {
    const { opinions }  = this.state;
    const userId = this.props.user._id;
    let isOpinionFound = false;
    opinions.forEach((opinion) => {
      if (opinion.owner === userId) isOpinionFound = true;
      return;
    })
    return isOpinionFound;
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
                    {/* <p>Global puntuation {place.likes}</p> */}
                </div>

                <LinkText 
                  addRoute={`/users/${owner._id}`}
                  class='model-block first-to-see'
                  title='Who created this place'
                  info={owner.username}
                />

                <LinkTextWithMapping 
                  class='model-block bottom'
                  title='Categories'
                  array={place.categories}
                />

                <LinkText 
                  addRoute={`/places/owner/${owner._id}`}
                  class='model-block'
                  title='Images'
                  info='View more images'
                />

                <LinkText2
                  class='model-block'
                  title='Indoors - outdoors'
                  info={place.inOutDoors}
                />

                <LinkText2
                  class='model-block'
                  title='City - Countryside'
                  info={place.locationType}
                />

                <LinkText2
                  class='model-block'
                  title='Free - Paid'
                  info={place.money}
                />
                
                <LinkText2
                  class='model-block'
                  title='Description'
                  info={place.description}
                />
                
                <LinkTextWithMapping 
                  class='model-block bottom'
                  title='When to go'
                  array={place.bestMomentOfYear}
                />

                <LinkText 
                  addRoute={`/places/owner/${owner._id}`}
                  class='model-block'
                  title='Opinions'
                  info='View all opinions of this place'
                />

                {this.userDidGaveOpinion() 
                ? ( 
                  this.state.opinions.map(opinion => {
                    if(opinion.owner === this.props.user._id){
                      return(
                        <LinkText 
                          addRoute={`/places/${place._id}/opinion/${opinion._id}/update`}
                          class='model-block'
                          title='Your opinion'
                          info='Change your opinion'
                        />
                      )
                    }
                  })
                )
                :(
                <LinkText 
                  addRoute={`/places/${place._id}/opinion`}
                  class='model-block'
                  title='Your opinion'
                  info='Give an opinion'
                />
                )}
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
