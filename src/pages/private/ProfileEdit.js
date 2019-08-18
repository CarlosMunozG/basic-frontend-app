import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

import withAuth from '../../components/withAuth.js';
import userService from '../../services/users-services.js';
import user from '../../services/users-services.js';
import FileUploadComponent from '../../components/FileUpload.js';

class ProfileEdit extends Component {
  state = {
    username: '',
    password: '',
    images: [],
    location: '',
    email: '',
    id: '',
    redirect: false,
    popUp: false,
  }

  componentDidMount(){
    userService.getCurrentUser()
    .then((response) => {
      const user = response.data.newUser;
      this.setState({
        username: user.username,
        password: '12345678',
        images: user.images,
        location: user.location,
        email: user.email,
        id: user._id,
      })
    })
    .catch((error) =>{
      console.log(error);
    })
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    user.updateUser(this.state)
    .then( (user) => {
      this.setState({
        redirect: true,
      })
    })
    .catch( error => console.log(error) )
  }

  handleFormPasswordSubmit = (event) => {
    event.preventDefault();
    user.updateUser(this.state)
    .then( (user) => {
      this.setState({
        redirect: true,
        popUp: false,
      })
    })
    .catch( error => console.log(error) )
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({
      [name]: value,
    });
  }
  
  getImage = (url) => {
    const { images } = this.state
    images.push(url)
    this.setState({
      images,
    })
  }

  handleDeleteImage = (index) => {
    const imagesCopy = this.state.images
    imagesCopy.splice(index, 1);
    this.setState({
      images: imagesCopy,
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
    const { username, password, location, email, redirect, images, popUp } = this.state;
    return (
      <>
      <form onSubmit={this.handleFormSubmit}>
        <label htmlFor='username'>Name:</label>
        <input id='username' type='text' name='username' value={username} onChange={this.handleChange}/>

        <label htmlFor='email'>Email:</label>
        <input id='email' type='email' name='email' value={email} onChange={this.handleChange} />

        <div>
          {images.length > 0 ? (
            <>
              <div className='wrapper-img'>
                <img src={images[0]} alt={username} />
              </div>
              <p onClick={() => this.handleDeleteImage(0)}>Delete</p>
              <FileUploadComponent getImage={this.getImage} />
            </>
          ) : (
            <FileUploadComponent getImage={this.getImage} />
          )}
        </div>

        <label htmlFor='location'>Location:</label>
        <input id='location' type='text' name='location' value={location} onChange={this.handleChange} />

        <button type='submit'>Edit Profile</button>
      </form>




      <form onSubmit={this.handleFormPasswordSubmit}>
        <label htmlFor='password'>Password:</label>
        <input id='password' type='password' name='password' value={password} onChange={this.handleChange} />

        <p onClick={this.showPopUp}>Edit password</p>
        {popUp ? (
          <section>
            <p>Confirm you want to change your password?</p>
            <p onClick={this.closePopUp}>No</p>
            <button type='submit'>Confirm</button>
          </section>
        ) : null}
      </form>
        {redirect ? <Redirect to='/settings/profile'/> : null}
      </>
    )
  }
}

export default withAuth(ProfileEdit);
