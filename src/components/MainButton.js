import React from 'react';
import { Link } from 'react-router-dom';

import withAuth from './withAuth.js';

const MainButton = props => {
  return (
    <Link to={props.addRoute} className='button button-main normal-shadow'>
      <div className='wrapper-center'>
        <img src={`${process.env.PUBLIC_URL}/images/${props.img}`} alt={props.img}/>
      </div>
      <p>{props.title}</p>
    </Link>
  )
}

export default withAuth(MainButton);
 