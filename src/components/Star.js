import React from 'react';

import withAuth from './withAuth.js';

const StarImage = props => {
  return (
    <div className='wrapper-center'>
      <img src={`${process.env.PUBLIC_URL}/images/${props.nameImage}.png`} alt='star icon'/>
    </div>
  )
}

export default withAuth(StarImage);