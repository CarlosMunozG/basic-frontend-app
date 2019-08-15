import React from 'react';
import withAuth from '../../components/withAuth.js';
import GoBackButton from '../../components/GoBackButton.js';

function Profile() {
  return (
    <div>
      <h1>Profile</h1>
      <GoBackButton />
    </div>
  )
}

export default withAuth(Profile);
