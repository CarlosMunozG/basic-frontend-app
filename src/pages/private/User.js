import React, { Component } from 'react'

import withAuth from '../../components/withAuth.js';
import userService from '../../services/users-services.js';
import GoBackButton from '../../components/GoBackButton.js';
import LinkText from '../../components/LinkText.js';


class User extends Component {
  state = {
    username: null,
    isLiked: false,
    friends: [],
    favouritePlaces: [],
    images: [],
    _id: '',
  }

  componentDidMount(){
    const {id} = this.props.match.params;
    userService.getUser(id)
    .then((response) => {
      const { username, friends, favouritePlaces, _id, images } = response.data.newUser;
      console.log(response.data);
      this.setState({
        username,
        friends,
        favouritePlaces,
        images,
        _id,
      })
    })
    .catch(error => { console.log(error) })
  }

 
  handleLikeClick = (id) => {
    const newFriends = this.props.user.friends.push(id);
    userService.addFriend(id)
    .then(() => {
      this.setState({
        isLiked: true,
        friends: newFriends,
      })
    })
  }

  handleUnlikeClick = (id) => {
    userService.deleteFriend(id)
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
    const { username, isLiked,  _id, images } = this.state;
    return (
        <>
        <section className='model-page'>
          {_id ? (
            <>
              <header>
                <GoBackButton />
                {!isLiked ? (
                  <button className='wrapper-center like' onClick={() => {
                    this.handleLikeClick(_id)
                  }}>
                    <img src={process.env.PUBLIC_URL + '/images/unlike-icon.png'} alt='unlike icon'/>
                  </button>
                ) : (
                  <button className='wrapper-center like' onClick={() => {
                    this.handleUnlikeClick(_id)
                  }}>
                    <img src={process.env.PUBLIC_URL + '/images/like-icon.png'} alt='like icon'/>
                  </button>
                ) }
              </header>
              <section>
                <div className='wrapper-center model-img-wrapper'>
                  {images.length > 0 ? (
                    <img src={images[0]} alt={username}/>
                  ) : (
                    <img src={process.env.PUBLIC_URL + '/images/default-profile-picture.png'} alt='default profile'/>
                  )}
                </div>
                <div className='info-model top-shadow'>
                  <h1>{username}</h1>
                </div>

                <LinkText 
                  addRoute={`/users/${_id}/friends`}
                  class='model-block first-to-see'
                  title='View friends'
                  info='get in touch with other people'
                />

                <LinkText 
                  addRoute={`/users/${_id}/places`}
                  class='model-block'
                  title='View favourite places'
                  info='View what he/she likes'
                />
              </section>
            </>
          ): <p>Loading...</p> }
        </section>
      </>
    )
  }
}

export default withAuth(User);
