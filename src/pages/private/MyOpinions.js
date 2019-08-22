import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import withAuth from '../../components/withAuth.js';
import GoBackButton from '../../components/GoBackButton.js';
import userService from '../../services/users-services.js';
import LinkText from '../../components/LinkText.js';


class MyOpinions extends Component {
  state = {
    myOpinions: []
  }

  componentDidMount(){
    userService.getAllMyFavourites()
    .then((response) => {
      this.setState({
        myOpinions: response.data.newUser.opinions,
      })
    })
    .catch(error =>{ console.log(error) })
  }

  render() {
    const { myOpinions } = this.state;
    console.log(myOpinions);
    return (
      <section className='my-places'>
        <header>
          <GoBackButton />
          <h1>My Opinions</h1>
        </header>
        <section>
          {myOpinions.length > 0 ? (
            myOpinions.map((opinion) => {
              console.log(opinion);
              return(
                <LinkText 
                  addRoute={`/opinions/${opinion._id}`}
                  class='model-block first-to-see'
                  title='Who created this place'
                  info={opinion.description}
                />
                
              )
            })
          ) : (
            <div className='first-message'>
              <figure className='wrapper-center column'>
                <p>Your list of your opinions is empty.</p>
              </figure>
            </div>
          )}
        </section>
      </section>
    )
  }  
}

export default withAuth(MyOpinions);


