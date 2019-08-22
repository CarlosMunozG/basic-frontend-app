import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import withAuth from '../../components/withAuth.js';
import userService from '../../services/users-services.js';
import AddButton from '../../components/AddButton.js';
import ViewMapButton from '../../components/ViewMapButton.js';
import GoBackButton from '../../components/GoBackButton.js';

class UserList extends Component {
  state = {
    users: []
  }

  componentDidMount(){
    userService.getAllUsers()
    .then((response) => {
      const { listOfUsers } = response.data;
      this.setState({
        users: listOfUsers,
      })
    })
    .catch(error => { console.log(error) })
  }

  excludeCurrentUser = () => {
    const position = this.state.users.indexOf(this.props.user._id);
    console.log(position);
    const copyUsers = this.state.users;
    const arrayUsers = copyUsers.splice(position, 1);
    console.log(arrayUsers);
  }




  render() {
    const  { users }  = this.state;
    return (
      <section className='places'>
        <header>
          <GoBackButton />
          <h1>Users List</h1>
          <ViewMapButton addRoute='/places' />
          <AddButton addRoute='/places/add'/>
        </header>
        <section>
          {this.excludeCurrentUser()}
          {users.length > 0 ? (
            users.map((user) => {
              return(
                <Link to={`users/${user._id}`} key={user._id} className='button button-list normal-shadow'>
                  <div className='wrapper-center'>
                    {user.images > 0 ? (
                      <img src={user.images[0]} alt={user.username}/>
                    ) : (
                      <img src={process.env.PUBLIC_URL + '/images/default-profile-picture.png'} alt='default profile'/>
                    )}
                  </div>
                  <div>
                    <h4>{user.username}</h4>
                    <p>Location</p>
                  </div>
                </Link>
              )
            })
          ) : <p>There are no users near you</p>}
        </section>
      </section>
    )
  }
}

export default withAuth(UserList);