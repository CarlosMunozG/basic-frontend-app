import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import GoBackButton from '../components/GoBackButton.js';
import withAuth from '../components/withAuth.js';

class Login extends Component {
  state = {
    username: '',
    password: '',
    images: [],
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, password, images } = this.state

    this.props.login({ username, password, images })
    .then( (user) => {
      console.log(user)
    })
    .catch( error => console.log(error) )
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render() {
    const { username, password } = this.state;
    return (
      <>
      <div className='intro-pos'>
        <GoBackButton className='intro-pos'/>
      </div>
      <section className='not-private wrapper-center'>
        <div>
          <form onSubmit={this.handleFormSubmit}>
            <input id='username' type='text' name='username' value={username} onChange={this.handleChange} placeholder='Username'/>
            <input id='password' type='password' name='password' value={password} onChange={this.handleChange} placeholder='Password'/>
            <button type='submit'>Login</button>
          </form>
          <Link className='form-link' to={'/signup'}>You don't have an accout yet? <span>Signup</span></Link>
        </div>
      </section>
    </>
    )
  }
}

export default withAuth(Login);