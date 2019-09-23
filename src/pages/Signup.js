import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import { processError } from '../helpers/processError';
import withAuth from '../components/withAuth.js';
import GoBackButton from '../components/GoBackButton.js';


class Signup extends Component {
  state = {
    username: '',
    password: '',
    error: '',
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state
    
    this.props.signup({ username, password })
    .then( (user) => {
    })
    .catch( error => {
      this.setState({ error: processError(error.response.status) });
      console.log(error);
    })
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render() {
    const { username, password, error } = this.state;
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
            <button type='submit'>Sign up</button>
          </form>
          <Link className='form-link' to={'/login'}>Already have account? <span>Login</span></Link>
          { error && <p className='error-message'>{this.state.error}</p> }
        </div>
      </section>
      </>
    )
  }
}

export default withAuth(Signup);

