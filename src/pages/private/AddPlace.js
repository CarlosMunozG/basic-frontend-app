import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Select from 'react-select';
import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import MapGL, { Marker, GeolocateControl } from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";


import withAuth from '../../components/withAuth.js';
import places from '../../services/places-services.js'
import FileUploadComponent from '../../components/FileUpload.js';
import { momentOptions, categoryOptions } from '../../helpers/placeHelper.js';
import GoBackButton from '../../components/GoBackButton.js';

const token='pk.eyJ1IjoiY2FybG9zLW11bm96IiwiYSI6ImNqemJieW9ibjAwM2EzY28wN244ajd6NHQifQ.hHRYI2BP8pDWsgI_iVvPwA';
const geolocateStyle = { float:'right', margin:'10px', padding:'10px' };


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
    message: '',
    marker: false,
    viewport :{
      latitude: this.props.position[0],
      longitude: this.props.position[1],
      zoom: 14,
    },
    searchResultLayer: null,
    redirect: false,
  };
  
  componentDidMount() {
    this.props.getLocation()
  }

  componentDidUpdate(prevProps, prevState){
    this.props.position[0] !== prevProps.position[0] && this.setState({
      viewport: {
        latitude: this.props.position[0],
        longitude: this.props.position[1],
        zoom: 14
      }
    },()=>{})
  }


  handleFormSubmit = (event) => {
    event.preventDefault();
    places.createPlace(this.state)
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
      location:{coordinates},
      marker: true,
    })

  }

  handleGeocoderViewportChange = viewport => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 };
    return this.handleViewportChange({
      ...viewport,
      ...geocoderDefaultOverrides,
    });
  };




  
  render() {
    const { 
      name, 
      postalCode, 
      locationType, 
      description, 
      inOutDoors,
      money,
      images,
      marker,
      viewport,
      location,
      redirect,
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
                {marker && (
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
                )}
              </MapGL>
            </div>

            <button type='submit'>Add new place</button>
          </form>
          {redirect ? <Redirect to={'/places'}/> : null}
        </section>
      </section>
    )
  }
}

export default withAuth(AddPlace);