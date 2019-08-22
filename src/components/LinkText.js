import React from 'react';
import {Link} from 'react-router-dom';

const LinkText = props => {
  return (
    <Link to={props.addRoute} className='oposite'>
      <div>
        <h3>{props.title}</h3>
        <p>{props.info}</p>
      </div>
      <div className='wrapper-center arrow'>
        <img src={process.env.PUBLIC_URL + '/images/arrow.png'} alt='arrow button'/>
      </div>
    </Link>
  )
}

export default LinkText;
