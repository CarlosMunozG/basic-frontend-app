import React from 'react';
import { Link } from 'react-router-dom';

import withAuth from './withAuth.js';

const LinkList = props => {
  return (
    <Link to={`/places/${props.id}`} key={props.id} >
      <div className='wrapper-center normal-shadow'>
        <img src={props.images[0]} alt={props.name}/>
      </div>
      <h4>{props.name}</h4>
    </Link>
  )
}

export default withAuth(LinkList);
 