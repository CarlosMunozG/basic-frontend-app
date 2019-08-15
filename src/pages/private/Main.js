import React, { Component } from 'react';
import withAuth from '../../components/withAuth.js';
import mapbox from '../../services/mapbox-services.js'


class Private extends Component {
  state = {
    location: '',
  }

  componentDidMount() {
    mapbox.getPlacesNearUser()
    .then((response) => {
      console.log(response);
      const cardsFromAPI = response.data.cards;
      this.setState({
        cards: cardsFromAPI
      })
    })
    .catch((error) =>{
      console.log(error);
    })
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state

    mapbox.getPlacesNearUser()
    .then((response) => {
      console.log(response);
      const cardsFromAPI = response.data.cards;
      this.setState({
        cards: cardsFromAPI
      })
    })
    .catch((error) =>{
      console.log(error);
    })
  }

  getPlacesNearUser(){
    // const userLocation = user.location.type;
    // return this.mapbox.post(`/${userLocation}.json`)
    return this.mapbox.post(`/barcelona.json`)
      .then(({ data }) => data);
  }



  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render() {
  
    return (
      <div>
        <h1>Welcome {this.props.user.username}</h1>
        {/* <form onSubmit={this.handleFormSubmit}>
          <label htmlFor='username' >Insert a city</label>
          <input id='username' type='text' name='username' value={username} onChange={this.handleChange}/>
          <button type='submit'>Search</button>
        </form> */}
      </div>
    )
  }
}

export default withAuth(Private);