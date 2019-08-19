import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import withAuth from '../components/withAuth.js';


class Signup extends Component {
  state = {
    username: '',
    password: '',
    error: '',
    message: '',
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    
    this.props.signup({ username, password })
    .then( (user) => {
      this.setState({
          username: '',
          password: '',
      });
    })
    .catch( error => 
      { this.setState({
        error: 'error'
      })
        console.log(this.props);
        console.log(error);}
    )
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render() {
    const { username, password, error, message } = this.state;
    return (
      <section className='not-private wrapper-center'>
        <div>
          <form onSubmit={this.handleFormSubmit}>
            <input id='username' type='text' name='username' value={username} onChange={this.handleChange} placeholder='Username'/>
            <input id='password' type='password' name='password' value={password} onChange={this.handleChange} placeholder='Password'/>
            <button type='submit'>Sign up</button>
          </form>
          {message ? <p>{error}</p> : null }
          <Link className='form-link' to={'/login'}>Already have account? <span>Login</span></Link>
        </div>
      </section>
    )
  }
}

export default withAuth(Signup);

