import React from 'react';

import withAuth from './withAuth.js';
import Star from './Star.js';

const FiveStars = props => {
  return (
    <div className='wrapper-center'>
      {props.number === 0 ? (
        <Star nameImage='fullstar-icon'/>
      ) : (
        <Star nameImage='emptystar-icon'/>
      )}
      {props.number === 1 ? (
        <Star nameImage='fullstar-icon'/>
      ) : (
        <Star nameImage='emptystar-icon'/>
      )}
      {props.number === 2 ? (
        <Star nameImage='fullstar-icon'/>
      ) : (
        <Star nameImage='emptystar-icon'/>
      )}
      {props.number === 3 ? (
        <Star nameImage='fullstar-icon'/>
      ) : (
        <Star nameImage='emptystar-icon'/>
      )}
      {props.number === 4 ? (
        <Star nameImage='fullstar-icon'/>
      ) : (
        <Star nameImage='emptystar-icon'/>
      )}
      {props.number === 5 ? (
        <Star nameImage='fullstar-icon'/>
      ) : (
        <Star nameImage='emptystar-icon'/>
      )}
    </div>
  )
}

export default withAuth(FiveStars);