import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import withAuth from '../../components/withAuth.js';
import GoBackButton from '../../components/GoBackButton.js';
import opinionsService from '../../services/opinions-services.js';

class Opinion extends Component {
  state = {
    description:'',
    rating: 0,
    placeName: '',
    opinionId: '',
    placeId: '',
    popUp: false,
    redirect: false,
  }

  componentDidMount(){
    const placeId = this.props.match.params.id;
    const opinionId = this.props.match.params.opinionId;
    opinionsService.getOpinion(opinionId)
    .then((response) => {
      const { description, rating } = response.data.oneOpinion;
      const newPlaceName = response.data.oneOpinion.place.name;
      this.setState({
        description,
        rating,
        placeName: newPlaceName,
        opinionId,
        placeId,
      })
    }).catch(error => console.log(error));
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    opinionsService.updateOpinion(this.state)
    .then( () => {
      this.setState({
        redirect: true,
      })
    })
    .catch( error => console.log(error) )
  }

  handleDeleteClick = (id) => {
    opinionsService.deleteOpinion(id)
    .then(() => {
      this.setState({
        redirect: true,
        popUp: false,
      })
    })
  }


  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({
      [name]: value,
    });
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
    const { description, rating, placeName, redirect, opinionId, placeId, popUp } = this.state;
    return (
      <>
      <section className='edit-page'>
        <header>
          <GoBackButton />
          <h1>Editing my Opinion</h1>
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

            <button type='submit'>Edit my opinion</button>
          </form>
          <p>or if you want, delete your opinion</p>
          <button onClick={this.showPopUp}>Delete</button>
          {redirect && <Redirect to={`/places/${placeId}`}/>}
        </section>
      </section>
      {popUp ? (
        <section className='pop-up wrapper-center'>
          <figure className='normal-shadow'>
            <p>Confirm you want to delete this place?</p>
            <p className='like-form-button' onClick={this.closePopUp}>No</p>
            <button className='button-pop-up' onClick={() => {this.handleDeleteClick(opinionId)}}>Confirm</button>
          </figure>
        </section>
      ) : null}
      </>
    )
  }
}

export default withAuth(Opinion);
