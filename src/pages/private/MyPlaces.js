import React, {Component} from 'react';
import withAuth from '../../components/withAuth.js';
import GoBackButton from '../../components/GoBackButton.js';


class MyPlaces extends Component {

  render() {
    return (
      <div>
        <h1>my places molaaaan</h1>
        <GoBackButton />
      </div>
    )
  }  
}

export default withAuth(MyPlaces);

