import React from 'react';
import {Link} from 'react-router-dom';
import withAuth from '../../components/withAuth.js';
import GoBackButton from '../../components/GoBackButton.js';


function Settings(props) {
  return (
    <section className='settings'>
      <GoBackButton />
      <header>
        <h1>Settings</h1>
      </header>
      <section>
        <Link to='/settings/profile' className='oposite'>
          <div>
            <h3>Profile</h3>
            <p>View your personal info</p>
          </div>
          <div className='wrapper-img arrow'>
            <img src='./images/arrow.png' alt='arrow button'/>
          </div>
        </Link>
        <Link to='/settings/my-places' className='oposite'>
          <div>
            <h3>My Places</h3>
            <p>Places you liked</p>
          </div>
          <div className='wrapper-img arrow'>
            <img src='./images/arrow.png' alt='arrow button'/>
          </div>         
        </Link>
        <Link to='/settings/my-opinions' className='oposite'>
          <div>
            <h3>My opinions</h3>
            <p>Opinions you gave</p>
          </div>
          <div className='wrapper-img arrow'>
            <img src='./images/arrow.png' alt='arrow button'/>
          </div>    
        </Link>
        <button className='logout icon-shadow' onClick={props.logout}>Logout</button>
      </section>
    </section>
  )
}

export default withAuth(Settings);
