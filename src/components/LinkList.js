import React from 'react';
import { Link } from 'react-router-dom';

import withAuth from './withAuth.js';

const LinkList = props => {
  return (
    <Link to={`${props.addRoute}/${props.id}`} key={props.Key} >
      <div className='wrapper-center normal-shadow'>
        {props.images.length > 0 ? (
          <img src={props.images[0]} alt={props.name}/>
        ) : (
          <img src={process.env.PUBLIC_URL + '/images/default-profile-picture.png'} alt='default profile'/>
        )}
      </div>
      <h4>{props.name}</h4>
    </Link>
  )
}

export default withAuth(LinkList);
 