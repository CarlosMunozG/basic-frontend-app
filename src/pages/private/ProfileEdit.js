import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import withAuth from '../../components/withAuth.js';
import FileUploadComponent from '../../components/FileUpload.js';
import GoBackButton from '../../components/GoBackButton.js';
import userService from '../../services/users-services.js';

class ProfileEdit extends Component {
  state = {
    username: '',
    images: [],
    location: '',
    email: '',
    id: '',
    redirect: false,
    popUp: false,
  }

  componentDidMount(){
    userService.getCurrentUser()
    .then(response => {
      this.setState({
        username: response.data.newUser.username,
        images: response.data.newUser.images,
        location: response.data.newUser.location,
        email: response.data.newUser.email,
        id: response.data.newUser.email,
      })
    }).catch( error => console.log(error));
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    userService.updateUser(this.state)
    .then( (user) => {
      console.log(this.state);
      this.setState({
        redirect: true,
      })
    })
    .catch( error => console.log(error) )
  }

  handleFormPasswordSubmit = (event) => {
    event.preventDefault();
    userService.updateUser(this.state)
    .then( () => {
      this.setState({
        redirect: true,
        popUp: false,
      })
    })
    .catch( error => console.log(error) )
  }

  handleChange = event => {  
    const {name, value} = event.target;
    this.setState({
      [name]: value,
    });
  }
  
  getImage = url => {
    const { images } = this.state
    images.push(url)
    this.setState({
      images,
    })
  }

  handleDeleteImage = index => {
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
      <section className='edit-page'>
        <header>
          <GoBackButton />
          <h1>Editing Profile</h1>
        </header>
        <section>
          <form onSubmit={this.handleFormSubmit} className='edit'>
            <label htmlFor='username'>Name</label>
            <input id='username' type='text' name='username' value={username} onChange={this.handleChange}/>
            <label htmlFor='email'>Email</label>
            <input id='email' type='email' name='email' value={email} onChange={this.handleChange} />
            
            <div className='add-form-img'>
              {images.length > 0 ? (
                <article className='wrapper-form-images'>
                  <div className='wrapper-center wrapper-form-img'>
                    <img src={images[0]} alt={username} />
                  </div>
                  <div onClick={() => this.handleDeleteImage(0)} className='wrapper-center delete'>
                    <img src={process.env.PUBLIC_URL + '/images/delete-icon.png'} alt='delete icon'/>
                  </div>                 
                </article>
              ) : (
                <FileUploadComponent getImage={this.getImage} />
              )}
              {images.length > 0 ? <FileUploadComponent getImage={this.getImage} /> : null}
            </div>
                      
           
            <label htmlFor='location'>Location</label>
            <input id='location' type='text' name='location' value={location} onChange={this.handleChange} />
            <button type='submit'>Edit Profile</button>
          </form>


          <form onSubmit={this.handleFormPasswordSubmit} className='edit'>
            <label htmlFor='password'>Password</label>
            <input id='password' type='password' name='password' placeholder='' value={password} onChange={this.handleChange} />
            <p className='like-form-button' onClick={this.showPopUp}>Edit password</p>
            {popUp ? (
              <section className='pop-up wrapper-center'>
                <figure className='normal-shadow'>
                  <p>Confirm you want to change your password?</p>
                  <p className='like-form-button' onClick={this.closePopUp}>No</p>
                  <button type='submit'>Confirm</button>
                </figure>
              </section>
            ) : null}
          </form>
        </section>
        {redirect ? <Redirect to='/settings/profile'/> : null}
      </section>
    )
  }
}

export default withAuth(ProfileEdit);
