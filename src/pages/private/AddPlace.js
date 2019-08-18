import React, { Component } from 'react';
import Select from 'react-select';

import withAuth from '../../components/withAuth.js';
import places from '../../services/places-services.js'
import FileUploadComponent from '../../components/FileUpload.js';
import {momentOptions} from '../../helpers/placeHelper.js';
import {categoryOptions} from '../../helpers/placeHelper.js';


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

  
  render() {
    const { 
      name, 
      postalCode, 
      locationType, 
      description, 
      inOutDoors,
      money
    } = this.state;

    
    return (
      <form onSubmit={this.handleFormSubmit}>
        <label htmlFor='name'>Name of the place:</label>
        <input id='name' type='text' name='name' value={name} onChange={this.handleChange}/>
        <label htmlFor='postalCode'>Postal Code:</label>
        <input id='postalCode' type='number' name='postalCode' value={postalCode} onChange={this.handleChange} />
        <select name='locationType' value={locationType} onChange={this.handleChange}>
          <option value="urban">Urban</option>
          <option value="rural">Rural</option>
        </select>
        <Select
          defaultValue={[]}
          isMulti
          name='bestMomentOfYear'
          options={momentOptions}
          onChange={this.handleMultipleMomentsSelect}
          // className="basic-multi-select"
          // classNamePrefix="select"
        />
        <label htmlFor='description'>Description:</label>
        <input id='description' type='text' name='description' value={description} onChange={this.handleChange} />
        <select name='inOutDoors' value={inOutDoors} onChange={this.handleChange}>
          <option value="indoors">Indoors</option>
          <option value="outdoors">Outdoors</option>
        </select>
        <select name='money' value={money} onChange={this.handleChange}>
          <option value="free">Free</option>
          <option value="paid">Paid</option>
        </select>
        <FileUploadComponent getImage={this.getImage}/>
        <Select
          defaultValue={[]}
          isMulti
          name='categories'
          options={categoryOptions}
          onChange={this.handleMultipleCategoriesSelect}
          // className="basic-multi-select"
          // classNamePrefix="select"
        />
        <button type='submit'>Add new place</button>
      </form>
    )
  }
}

export default withAuth(AddPlace);