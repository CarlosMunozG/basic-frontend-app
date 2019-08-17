import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
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

  render() {
    const { username, password, location, email, redirect } = this.state;
    return (
      <>
      <form onSubmit={this.handleFormSubmit}>
        <label htmlFor='username'>Name:</label>
        <input id='username' type='text' name='username' value={username} onChange={this.handleChange}/>

        <label htmlFor='email'>Email:</label>
        <input id='email' type='email' name='email' value={email} onChange={this.handleChange} />

        <label htmlFor='password'>Password:</label>
        <input id='password' type='password' name='password' value={password} onChange={this.handleChange} />

        <FileUploadComponent getImage={this.getImage}/>

        {/* <label htmlFor='image'>Image:</label>
        <input id='image' type='text' name='image' value={image} onChange={this.handleChange} /> */}

        <label htmlFor='location'>Location:</label>
        <input id='location' type='text' name='location' value={location} onChange={this.handleChange} />

        <button type='submit'>Add new place</button>
      </form>
        {redirect ? <Redirect to='/settings/profile'/> : null}
      </>

    )
  }
}

export default ProfileEdit;
