import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Select from 'react-select';

import withAuth from '../../components/withAuth.js';
import places from '../../services/places-services.js';
import FileUploadComponent from '../../components/FileUpload.js';
import {momentOptions} from '../../helpers/placeHelper.js';
import {categoryOptions} from '../../helpers/placeHelper.js';
import GoBackButton from '../../components/GoBackButton.js';


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
      <section className='edit-page'>
        <header>
          <GoBackButton />
          <h1>Editing Place</h1>
        </header>
        <section>
          <form onSubmit={this.handleFormSubmit} className='edit'>
            <label htmlFor='name'>Name of the place</label>
            <input id='name' type='text' name='name' value={name} onChange={this.handleChange} />
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
            <label htmlFor='bestMomentOfYear'>When to go</label>
            {bestMomentOfYear.length > 0 ? (            
              <>
                {/* {console.log("moments", bestMomentOfYear.length)} */}
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
                <Select
                  defaultValue={[momentOptions[11]]}
                  isMulti
                  name='bestMomentOfYear'
                  options={momentOptions}
                  onChange={this.handleMultipleMomentsSelect}
                />
              </>
            )}
            <label htmlFor='description'>Description</label>
            <input id='description' type='text' name='description' value={description} onChange={this.handleChange} />
            <label htmlFor='inOutDoors'>Indoors - Outdoors</label>
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
            <label htmlFor='money'>Free - Paid</label>
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

            <button type='submit'>Edit place</button>
          </form>
          {redirect ? <Redirect to={`/places/${_id}`}/> : null}
        </section>
      </section>
    )
  }
}

export default withAuth(ProfileEdit);
