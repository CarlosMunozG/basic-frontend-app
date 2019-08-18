import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MapGL from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";

import withAuth from '../../components/withAuth.js';

const token='pk.eyJ1IjoiY2FybG9zLW11bm96IiwiYSI6ImNqemJieW9ibjAwM2EzY28wN244ajd6NHQifQ.hHRYI2BP8pDWsgI_iVvPwA';

class SearchableMap extends Component {
  state = { 
    viewport :{
      latitude: 41.393544,
      longitude: 2.165588,
      zoom: 6
    },
    searchResultLayer: null
  }

  mapRef = React.createRef()

  handleViewportChange = viewport => {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    })
  }
  // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
  handleGeocoderViewportChange = viewport => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 };

    return this.handleViewportChange({
      ...viewport,
      ...geocoderDefaultOverrides
    });
  };

    render(){
      const { viewport } = this.state
      return (
        <div style={{ height: '100vh'}}>
          {/* <h1 style={{textAlign: 'center', fontSize: '25px', fontWeight: 'bolder' }}>Use the search bar to find a location or click <a href="/">here</a> to find your location</h1> */}
          <MapGL 
            ref={this.mapRef}
            {...viewport}
            mapStyle="mapbox://styles/mapbox/light-v8"
            width="100%"
            height="100vh"
            onViewportChange={this.handleViewportChange}
            mapboxApiAccessToken={token}
          >
            <Geocoder 
              mapRef={this.mapRef}
              onResult={this.handleOnResult}
              onViewportChange={this.handleGeocoderViewportChange}
              mapboxApiAccessToken={token}
              position='top-left'
            />
            <Link to='Places-list' className='view-list-button'>View list</Link>
          </MapGL>
        </div>
      )
    }
}

export default withAuth(SearchableMap);