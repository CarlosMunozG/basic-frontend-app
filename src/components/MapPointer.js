import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Marker, Popup } from "react-map-gl";


class MapPointer extends Component {
  state = {
    isShowing: false,
    selectedPoint: null,
  }



  render() {
    const { key, latitude, longitude, placeId, placeImages, placeName, placeCategories } = this.props;
    return (
      <>
      <Marker key={placeId}
        latitude={latitude} 
        longitude={longitude}
      >
        {/* {placeCategories.includes('Eating') && ( */}
          <div
            key={key}
            className="signal wrapper-center" 
            onClick={event => {
              event.preventDefault();
              this.setState({
                selectedPoint: true
              })
            }}>
            <img src={process.env.PUBLIC_URL + '/images/marker-eating.png'} alt='health marker'/>
          </div>
        {/* )} */}
      </Marker>

      {this.state.selectedPoint && (
        <Popup
          latitude={latitude}
          longitude={longitude}
          closeOnClick={false}
          onClose={()=>{
            this.setState({
              selectedPoint: false,
            })
          }}
        >
          <Link to={`/places/${placeId}`} className='map-popup'>
            <div className='wrapper-center map-popup-img'>
              <img src={placeImages[0]}alt=''/>
            </div>
            <div>
              <h4>{placeName}</h4>
              {/* {!isLiked ? (
                <button className='wrapper-center like' onClick={() => {
                  this.handleLikeClick(placeId)
                }}>
                  <img src={process.env.PUBLIC_URL + '/images/unlike-icon.png'} alt='unlike icon'/>
                </button>
              ) : (
                <button className='wrapper-center like' onClick={() => {
                  this.handleUnlikeClick(placeId)
                }}>
                  <img src={process.env.PUBLIC_URL + '/images/like-icon.png'} alt='like icon'/>
                </button>
              ) } */}
            </div>
          </Link>
        </Popup>
        )}
      </>
    )
  }
}

export default MapPointer;
