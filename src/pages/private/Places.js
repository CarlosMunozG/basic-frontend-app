import React,{ useState } from 'react';
import {Link} from 'react-router-dom';
import MapGL, { GeolocateControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const TOKEN='pk.eyJ1IjoiY2FybG9zLW11bm96IiwiYSI6ImNqemJieW9ibjAwM2EzY28wN244ajd6NHQifQ.hHRYI2BP8pDWsgI_iVvPwA';

const geolocateStyle = {
  float: 'left',
  margin: '50px',
  padding: '10px'
};

const Map = () => {

  const [viewport, setViewPort ] = useState({
    width: "100%",
    height: '100vh',
    latitude: 41.393544,
    longitude: 2.165588,
    zoom: 6
  })

  const _onViewportChange = viewport => setViewPort({...viewport, transitionDuration: 2000 })
  
  return (
    <div style={{ margin: '0 auto'}}>
      <h3 style={{textAlign: 'center', fontSize: '25px', fontWeight: 'bolder' }}>GeoLocator: Click To Find  
      Your Location or click <a href="/search">here</a> to search for a location</h3>
      <Link to='/places/add'>Create a new place</Link>
      <MapGL
        {...viewport}
        mapboxApiAccessToken={TOKEN}
        mapStyle="mapbox://styles/mapbox/light-v8"
        onViewportChange={_onViewportChange}
      >
        <GeolocateControl
          style={geolocateStyle}
          positionOptions={{enableHighAccuracy: true}}
          trackUserLocation={true}
        />
      </MapGL>
    </div>
  )
}

export default Map