import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import withAuth from '../../components/withAuth.js';
import GoBackButton from '../../components/GoBackButton.js';
import userService from '../../services/users-services.js';
import LinkList from '../../components/LinkList.js';


class MyFriends extends Component {
  state = {
    username: '',
    friends: [],
  }

  componentDidMount(){
    const { id } = this.props.match.params;
    userService.getUser(id)
    .then((response) => {
      this.setState({
        username: response.data.newUser.username,
        friends: response.data.newUser.friends,
      })
    })
    .catch(error =>{ console.log(error) })
  }

  render() {
    const { friends, username } = this.state;
    return (
      <section className='my-places'>
        <header>
          <GoBackButton />
          <h1>{username}'s friends</h1>
        </header>
        <section>
          {friends.length > 0 ? (
            friends.map((friend) => {
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
                <p>The list of {username}'s favourite friends is empty.</p>
                <p>Search for find new ones</p>
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