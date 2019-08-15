import React from 'react';
import {Link} from 'react-router-dom';
import withAuth from '../../components/withAuth.js';
import GoBackButton from '../../components/GoBackButton.js';


function Settings(props) {
  return (
    <section>
      <h1>Settings</h1>
      <Link to='/settings/profile'>Profile</Link>
      <Link to='/settings/my-places'> My Places</Link>
      <Link to='/settings/my-opinions'> My opinions</Link>
      <p onClick={props.logout}>Logout</p>
      <GoBackButton />
    </section>
  )
}

export default withAuth(Settings);
