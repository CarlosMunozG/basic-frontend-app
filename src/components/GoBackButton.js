import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';

class GoBackButton extends Component {

  goToPreviousPage = () => {
    this.props.history.goBack();
  }

  render() {
    return (
      <button className='go-back-button' onClick={this.goToPreviousPage}>
        <div className='wrapper-img reverse'>
          <img src='./images/arrow.png' alt='go back arrow'/>
        </div>
      </button>
    )
  }
}

export default withRouter(GoBackButton);
