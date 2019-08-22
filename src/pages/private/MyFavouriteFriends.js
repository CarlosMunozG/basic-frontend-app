import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import withAuth from '../../components/withAuth.js';
import GoBackButton from '../../components/GoBackButton.js';
import userService from '../../services/users-services.js';
import AddButton from '../../components/AddButton.js';
import LinkList from '../../components/LinkList.js';


class MyFriends extends Component {
  state = {
    myFriends: []
  }

  componentDidMount(){
    userService.getAllMyFavourites()
    .then((response) => {
      console.log(response.data);
      this.setState({
        myFriends: response.data.newUser.friends,
      })
    })
    .catch(error =>{ console.log(error) })
  }

  render() {
    const { myFriends } = this.state;
    return (
      <section className='my-places'>
        <header>
          <GoBackButton />
          <h1>My Friends</h1>
          <AddButton addRoute='/users'/>
        </header>
        <section>
          {myFriends.length > 0 ? (
            myFriends.map((friend) => {
              return(
                <LinkList 
                  key={friend._id}
                  addRoute='/users'
                  id={friend._id}
                  images={friend.images}
                  name={friend.username}
                />
              )
            })
          ) : (
            <div className='first-message'>
              <figure className='wrapper-center column'>
                <p>Your list of favourite friends is empty.</p>
                <p>Search for find them out</p>
                <Link className='button-mini view-in-map icon-shadow' to='/users'>Search</Link>
              </figure>
            </div>
          )}
        </section>
      </section>
    )
  }  
}

export default withAuth(MyFriends);