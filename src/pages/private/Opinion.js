import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import withAuth from '../../components/withAuth.js';
import GoBackButton from '../../components/GoBackButton.js';
import opinionsService from '../../services/opinions-services.js';
import places from '../../services/places-services.js';

class Opinion extends Component {
  state = {
    description:'',
    rating: 0,
    placeName: '',
    redirect: false,
    placeId: '',
  }

  componentDidMount(){
    const placeId = this.props.match.params.id
    places.getOnePlace(placeId)
    .then((response) => {
      this.setState({
        placeName: response.data.onePlace.name,
        placeId,
      })
    }).catch(error => console.log(error));
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const placeId = this.props.match.params.id
    opinionsService.createOpinion(this.state, placeId)
    .then( (place) => {
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

  render() {
    const { description, rating, placeName, redirect, placeId } = this.state;
    return (
      <section className='edit-page'>
        <header>
          <GoBackButton />
          <h1>Adding Opinion</h1>
          <p className='title-detail'>{placeName}</p>
        </header>
        <section>
          <form onSubmit={this.handleFormSubmit} className='edit'>
            <label htmlFor='description'>Add comment</label>
            <input id='description' type='text' name='description' value={description} onChange={this.handleChange}/>
            <label htmlFor='rating'>Rate this place</label>
            <select name='rating' value={rating} onChange={this.handleChange}>
              <option value='0'>0</option>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
              {/*<option value="0">
                 <FiveStars number='0'/>
              </option>
              <option value="1">
                <FiveStars number='1'/>
              </option>
              <option value="2">
                <FiveStars number='2'/>
              </option>
              <option value="3">
                <FiveStars number='3'/>
              </option>
              <option value="4">
                <FiveStars number='4'/>
              </option>
              <option value="5">
                <FiveStars number='5'/>
              </option> */}
            </select>

            <button type='submit'>Add new opinion</button>
          </form>
          {redirect && <Redirect to={`/places/${placeId}`}/>}
        </section>
      </section>
    )
  }
}

export default withAuth(Opinion);
