import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Select from 'react-select';

import withAuth from '../../components/withAuth.js';
import places from '../../services/places-services.js';
import FileUploadComponent from '../../components/FileUpload.js';
import {momentOptions} from '../../helpers/placeHelper.js';
import {categoryOptions} from '../../helpers/placeHelper.js';


class ProfileEdit extends Component {
  state = {
    name: '',
    postalCode: '',
    locationType: '',
    bestMomentOfYear: [],
    description: '',
    inOutDoors: '',
    money: '',
    categories: [],
    images: [],
    _id:'',
    redirect: false,
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    places.getOnePlace(id)
      .then((response) => {
        const {
          name,
          postalCode,
          locationType,
          bestMomentOfYear,
          description,
          inOutDoors,
          money,
          categories,
          images
        } = response.data.onePlace;
        this.setState({
          name,
          postalCode,
          locationType,
          bestMomentOfYear,
          description,
          inOutDoors,
          money,
          categories,
          images,
          _id: this.props.match.params.id
        })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
    places.updatePlace(this.state)
      .then((response) => {
        this.setState({
          redirect: true,
        })
      })
      .catch(error => console.log(error))
  }

  handleChange = (event) => {
    const { name, value } = event.target;
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

  handleDeleteImage = (index) => {
    const imagesCopy = this.state.images
    imagesCopy.splice(index, 1);
    this.setState({
      images: imagesCopy,
    })
  }


  render() {
    const { name,
      postalCode,
      locationType,
      bestMomentOfYear,
      description,
      inOutDoors,
      money,
      categories,
      images,
      _id,
      redirect,
    } = this.state;
    return (
      <>
        <form onSubmit={this.handleFormSubmit}>
          <label htmlFor='name'>Name of the place:</label>
          <input id='name' type='text' name='name' value={name} onChange={this.handleChange} />

          <label htmlFor='postalCode'>Postal Code:</label>
          <input id='postalCode' type='number' name='postalCode' value={postalCode} onChange={this.handleChange} />

          <select name='locationType' value={locationType} onChange={this.handleChange}>
            {locationType === 'urban' ? (
              <>
                <option defaultValue="urban">Urban</option>
                <option value="rural">Rural</option>
              </>
            ) : (
                <>
                  <option defaultValue="rural">Rural</option>
                  <option value="urban">Urban</option>
                </>
              )}
          </select>
          {bestMomentOfYear.length > 0 ? (
            
            <>
              {/* {console.log("moments", bestMomentOfYear.length)} */}
              <p>Whe you can go</p>
              <Select
                defaultValue={[momentOptions[0], momentOptions[4]]}
                isMulti
                name='bestMomentOfYear'
                options={momentOptions}
                onChange={this.handleMultipleMomentsSelect}
              />
            </>
          ) : (
            <>
              <p>Whe you can gooooooooo</p>
              <Select
                defaultValue={[momentOptions[11]]}
                isMulti
                name='bestMomentOfYear'
                options={momentOptions}
                onChange={this.handleMultipleMomentsSelect}
              />
            </>
          )}
          <label htmlFor='description'>Description:</label>
          <input id='description' type='text' name='description' value={description} onChange={this.handleChange} />

          <select name='inOutDoors' value={inOutDoors} onChange={this.handleChange}>
            {inOutDoors === 'indoors' ? (
              <>
                <option defaultValue="indoors">Indoors</option>
                <option value="outdoors">Outdoors</option>
              </>
            ) : (
                <>
                  <option defaultValue="outdoors">Outdoors</option>
                  <option value="indoors">Indoors</option>
                </>
              )}
          </select>

          <select name='money' value={money} onChange={this.handleChange}>
            {money === 'free' ? (
              <>
                <option defaultValue="free">Free</option>
                <option value="paid">Paid</option>
              </>
            ) : (
                <>
                  <option defaultValue="paid">Paid</option>
                  <option value="free">Free</option>
                </>
              )}
          </select>

          <Select
            defaultValue={[]}
            isMulti
            name='categories'
            options={categoryOptions}
            onChange={this.handleMultipleCategoriesSelect}
          />
          <div>
            {images.length > 0 ?
              images.map((image, index) => {
                return (
                  <article key={index}>
                    <div className='wrapper-img'>
                      <img src={image} alt={name} />
                    </div>
                    <p onClick={() => this.handleDeleteImage(index)}>Delete</p>
                    <FileUploadComponent getImage={this.getImage} />
                  </article>
                )
              })
              : (
                <FileUploadComponent getImage={this.getImage} />
              )}
          </div>


          <button type='submit'>Edit place</button>
        </form>
        {redirect ? <Redirect to={`/places/${_id}`}/> : null}
      </>

    )
  }
}

export default withAuth(ProfileEdit);
