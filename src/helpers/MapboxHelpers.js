import React,{ Component } from 'react';


export const MapActivation = {
  token='pk.eyJ1IjoiY2FybG9zLW11bm96IiwiYSI6ImNqemJieW9ibjAwM2EzY28wN244ajd6NHQifQ.hHRYI2BP8pDWsgI_iVvPwA';
  geolocateStyle = { float:'right', margin:'10px', padding:'10px' };
  mapRef = React.createRef()
}

export const handleViewportChange = viewport => {
  this.setState({
    viewport: { ...this.state.viewport, ...viewport }
  })
}

export const handleGeocoderViewportChange = viewport => {
  const geocoderDefaultOverrides = { transitionDuration: 1000 };
  return this.handleViewportChange({
    ...viewport,
    ...geocoderDefaultOverrides
  });
};