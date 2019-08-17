import React from 'react';
import {Link} from 'react-router-dom';

import withAuth from './withAuth.js';


const ViewMapButton = props => {
  return (
    <Link to={props.addRoute} className='go-to-map-link'>
      <p>View map</p>
      <div className='wrapper-img'>
        <img src={process.env.PUBLIC_URL + '/images/mini-maps-pointer-icon.png'} alt='map selector icon'/>
      </div>
    </Link>  
  )
}

export default withAuth(ViewMapButton);
