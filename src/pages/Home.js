import React, { Component } from 'react';

import withAuth from '../components/withAuth.js';

class Home extends Component {

  render() {
    return (
      <div>
        <h1>Homepage</h1>
      </div>
    )
  }
}

export default withAuth(Home);