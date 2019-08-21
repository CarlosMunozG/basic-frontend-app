import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Select from 'react-select';
import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import MapGL, { Marker, GeolocateControl } from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";

import withAuth from '../../components/withAuth.js';
import places from '../../services/places-services.js';
import FileUploadComponent from '../../components/FileUpload.js';
import {momentOptions, categoryOptions} from '../../helpers/placeHelper.js';
import GoBackButton from '../../components/GoBackButton.js';

const token='pk.eyJ1IjoiY2FybG9zLW11bm96IiwiYSI6ImNqemJieW9ibjAwM2EzY28wN244ajd6NHQifQ.hHRYI2BP8pDWsgI_iVvPwA';
const geolocateStyle = { float:'right', margin:'10px', padding:'10px' };


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
    likes: [],
    _id:'',
    redirect: false,
    viewport :{
      latitude: 0,
      longitude: 0,
      zoom: 8,
    },
    searchResultLayer: null,
    location: [],
    render: false,
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
          images,
          location,
          likes,
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
          likes,
          _id: this.props.match.params.id,
          viewport :{
            latitude: location.coordinates[1],
            longitude: location.coordinates[0],
            zoom: 15
          },
          searchResultLayer: null,
          location,
          render: true,
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

  getInputs = (inputs, isMonth) => {
    let indexs = [];
    isMonth ? 
      momentOptions.forEach((input, i)=>{
      if(inputs.includes(input.value)){
        indexs.push(i)
      } 
    }) : 
      categoryOptions.forEach((input, i)=>{
      if(inputs.includes(input.value)){
        indexs.push(i)
      } 
    })
    return indexs;
  }

  renderInputs = (inputs, isMonth) => {
    let inputNumbers = this.getInputs(inputs, isMonth);
    return isMonth ? 
    momentOptions.filter((moment, index) => inputNumbers.includes(index) && moment) 
    : 
    categoryOptions.filter((moment, index) => inputNumbers.includes(index) && moment)
  }

  mapRef = React.createRef()

  handleViewportChange = viewport => {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    })
  }

  _getCoordinates = (event) => {
    const newLat = event.lngLat[0];
    const newLon = event.lngLat[1];
    const coordinates = [newLat, newLon];
    this.setState({
      markerLat: newLat,
      markerLon: newLon,
      location:{coordinates}
    })
  }

  handleGeocoderViewportChange = viewport => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 };
    return this.handleViewportChange({
      ...viewport,
      ...geocoderDefaultOverrides
    });
  };



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
      viewport,
      location,
      render,
    } = this.state;
    return (
      <>
      {render && (

      <section className='edit-page'>
        <header>
          <GoBackButton />
          <h1>Editing Place</h1>
        </header>
        <section>
          <form onSubmit={this.handleFormSubmit} className='edit'>
            <label htmlFor='name'>Name of the place</label>
            <input id='name' type='text' name='name' value={name} onChange={this.handleChange} />
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
            {bestMomentOfYear.length > 0 && (            
              <>
                <Select
                  defaultValue={this.renderInputs(bestMomentOfYear, true) }
                  isMulti
                  name='bestMomentOfYear'
                  options={momentOptions}
                  onChange={this.handleMultipleMomentsSelect}
                />
              </>
            )}
            <label htmlFor='categories'>Categories</label>
            {categories.length > 0 && (            
              <>
                <Select
                  defaultValue={this.renderInputs(categories, false)}
                  isMulti
                  name='categories'
                  options={categoryOptions}
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



            <label htmlFor='location'>Location</label>
            <div className='mapbox-in-form'>
              <MapGL 
                ref={this.mapRef}
                {...viewport}
                mapStyle="mapbox://styles/mapbox/light-v8"
                width="100%"
                height="50vh"
                onViewportChange={this.handleViewportChange}
                mapboxApiAccessToken={token}
                onClick={this._getCoordinates}
              >
                <Geocoder 
                  mapRef={this.mapRef}
                  onResult={this.handleOnResult}
                  onViewportChange={this.handleGeocoderViewportChange}
                  mapboxApiAccessToken={token}
                  position='top-left'
                />
                <GeolocateControl
                  style={geolocateStyle}
                  positionOptions={{enableHighAccuracy: true}}
                  trackUserLocation={true}
                />
                <Marker 
                  latitude={location.coordinates[1]} 
                  longitude={location.coordinates[0]}
                  draggable={true}
                  onDrag={this._getCoordinates}
                >
                  <div className="signal wrapper-center">
                    <img src={process.env.PUBLIC_URL + '/images/marker.png'} alt='marker icon'/>
                  </div>
                </Marker>
              </MapGL>
            </div>





            <button type='submit'>Edit place</button>
          </form>
          {redirect ? <Redirect to={`/places/${_id}`}/> : null}
        </section>
      </section>
      )}
      </>
    )
  }
}

export default withAuth(ProfileEdit);
