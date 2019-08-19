import React, { Component } from 'react';
import Select from 'react-select';

import withAuth from '../../components/withAuth.js';
import places from '../../services/places-services.js'
import FileUploadComponent from '../../components/FileUpload.js';
import {momentOptions} from '../../helpers/placeHelper.js';
import {categoryOptions} from '../../helpers/placeHelper.js';
import GoBackButton from '../../components/GoBackButton.js';


class AddPlace extends Component {
  state = {
    name: '',
    postalCode: 0,
    locationType: 'urban',
    bestMomentOfYear: [],
    description: '',
    inOutDoors: 'indoors',
    money: 'free',
    images: [],
    categories: [],
    error: '',
    message: ''
  };


  handleFormSubmit = (event) => {
    event.preventDefault();
    places.createPlace(this.state)
    .then( (place) => {
      // console.log(place)
    })
    .catch( error => console.log(error) )
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({
      [name]: value,
    });
  }

  handleMultipleMomentsSelect = (selectedOptions) => {  
    const bestMomentOfYear = selectedOptions.map((option) => option.value )
    this.setState({ bestMomentOfYear });
  }

  handleMultipleCategoriesSelect = (selectedOptions) => { 
    const categories = selectedOptions.map((option)=> option.value)
    this.setState({ categories });
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


  
  render() {
    const { 
      name, 
      postalCode, 
      locationType, 
      description, 
      inOutDoors,
      money,
      images
    } = this.state;

    
    return (
      <section className='edit-page'>
        <header>
          <GoBackButton />
          <h1>Adding Place</h1>
        </header>
        <section>
          <form onSubmit={this.handleFormSubmit} className='edit'>
            <label htmlFor='name'>Name of the place</label>
            <input id='name' type='text' name='name' value={name} onChange={this.handleChange}/>
            <label htmlFor='categories'>Categories</label>
            <Select
              defaultValue={[]}
              isMulti
              name='categories'
              options={categoryOptions}
              onChange={this.handleMultipleCategoriesSelect}
            />
            <label htmlFor='postalCode'>Postal Code</label>
            <input id='postalCode' type='number' name='postalCode' value={postalCode} onChange={this.handleChange} />
            <label htmlFor='locationType'>Urban - Rural</label>
            <select name='locationType' value={locationType} onChange={this.handleChange}>
              <option value="urban">Urban</option>
              <option value="rural">Rural</option>
            </select>
            <label htmlFor='bestMomentOfYear'>When to go</label>
            <Select
              defaultValue={[]}
              isMulti
              name='bestMomentOfYear'
              options={momentOptions}
              onChange={this.handleMultipleMomentsSelect}
            />
            <label htmlFor='description'>Description</label>
            <input id='description' type='text' name='description' value={description} onChange={this.handleChange} />
            <label htmlFor='inOutDoors'>Indoors - Outdoors</label>
            <select name='inOutDoors' value={inOutDoors} onChange={this.handleChange}>
              <option value="indoors">Indoors</option>
              <option value="outdoors">Outdoors</option>
            </select>
            <label htmlFor='money'>Free - Paid</label>
            <select name='money' value={money} onChange={this.handleChange}>
              <option value="free">Free</option>
              <option value="paid">Paid</option>
            </select>
            <div className='add-form-img'>
              {images.length > 0 ?
                images.map((image, index) => {
                  return (
                    <article key={index} className='wrapper-form-images'>
                      <div className='wrapper-center wrapper-form-img'>
                        <img src={image} alt={name} />
                      </div>
                      <div onClick={() => this.handleDeleteImage(index)} className='wrapper-center delete'>
                        <img src={process.env.PUBLIC_URL + '/images/delete-icon.png'} alt='delete icon'/>
                      </div>
                    </article>
              )}) : ( <FileUploadComponent getImage={this.getImage} />)}
              {images.length > 0 ? <FileUploadComponent getImage={this.getImage} /> : null}
            </div>
            <button type='submit'>Add new place</button>
          </form>
        </section>
      </section>
    )
  }
}

export default withAuth(AddPlace);