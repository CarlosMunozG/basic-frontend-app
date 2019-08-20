import React,{ Component } from 'react';
import {Link} from 'react-router-dom';
import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import MapGL, { GeolocateControl, Marker } from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";

import withAuth from '../../components/withAuth.js';
import places from '../../services/places-services.js';

const token='pk.eyJ1IjoiY2FybG9zLW11bm96IiwiYSI6ImNqemJieW9ibjAwM2EzY28wN244ajd6NHQifQ.hHRYI2BP8pDWsgI_iVvPwA';
const geolocateStyle = { float:'right', margin:'10px', padding:'10px' };


class Places extends Component {
  state = {
    viewport :{
      latitude: 0,
      longitude: 0,
      zoom: 12,
    },
    searchResultLayer: null,
    location: [],
    places: [],
  }

  
  geolocateStyle = { float:'right', margin:'50px', padding:'10px' };

  componentDidMount() {
    this.props.getLocation();
    places.getAllPlaces()
    .then((response) => {
      const getAllPlaces = response.data.listOfPlaces;
      this.setState({
        places: getAllPlaces,
      })
    }).catch(error => console.log(error));
  }

  componentDidUpdate(prevProps, prevState){
    this.props.position[0] !== prevProps.position[0] && this.setState({
      viewport: {
        latitude: this.props.position[1],
        longitude: this.props.position[0],
        zoom: 12
      }
    },()=>{})
  }

  mapRef = React.createRef()

  handleViewportChange = viewport => {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
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
    const { viewport, places } = this.state;
    console.log(places);
    return (
      <div className='mapbox-in-page'>
      <Link to='/places/add'>Create a new place</Link>
      <MapGL
        ref={this.mapRef}
        {...viewport}
        mapStyle="mapbox://styles/mapbox/light-v8"
        width="100%"
        height="100vh"
        onViewportChange={this.handleViewportChange}
        mapboxApiAccessToken={token}
        onClick={this._onClickMap}
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
        {places.length > 0 && (
          places.map((place) => {
            return (
              <Marker latitude={place.location.coordinates[1]} longitude={place.location.coordinates[0]}>
                <div className="signal"></div>
              </Marker>
            )
          })
        )}
      </MapGL>
    </div>
    )
  }
}

export default withAuth(Places);




  
  

  
