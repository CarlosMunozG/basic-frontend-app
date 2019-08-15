import React,  {Component} from 'react';
import withAuth from '../../components/withAuth.js';
import GoBackButton from '../../components/GoBackButton.js';


class MyOpinions extends Component {

  render() {
    return (
      <div>
        <h1>my opinions</h1>
        <GoBackButton />
      </div>
    )
  }  
}

export default withAuth(MyOpinions);

