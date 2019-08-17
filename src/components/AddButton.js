import React from 'react';
import { Link } from 'react-router-dom';

import withAuth from './withAuth.js';

const AddButton = props => {
  return (
    <Link to={props.addRoute} className='add'>
      <img src={process.env.PUBLIC_URL + '/images/add-icon.png'} alt='add new place icon'/>
    </Link>
  )
}

export default withAuth(AddButton);
 