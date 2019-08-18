import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import withAuth from '../../components/withAuth.js';
import GoBackButton from '../../components/GoBackButton.js';
import places from '../../services/places-services.js';
import AddButton from '../../components/AddButton.js';
import ViewMapButton from '../../components/ViewMapButton.js';


class MyPlaces extends Component {
  state = {
    myPlaces: []
  }

  componentDidMount(){
    places.getAllMyPlaces()
    .then((response) => {
      const { listOfMyPlaces } = response.data;
      this.setState({
        myPlaces: listOfMyPlaces,
      })
    })
    .catch((error) =>{
      console.log(error);
    })
  }

  render() {
    const { myPlaces } = this.state;
    return (
      <section className='my-places'>
        <header>
          <GoBackButton />
          <h1>My Places</h1>
          <ViewMapButton addRoute='/places'/>
          <AddButton addRoute='/places/add'/>
        </header>
        <section>
          {myPlaces.length > 0 ? (
            myPlaces.map((place) => {
              return(
                <Link to={`/places/${place._id}`} key={place._id} >
                  <div className='wrapper-img normal-shadow'>
                    <img src={place.images[0]} alt={place.name}/>
                  </div>
                  <h4>{place.name}</h4>
                </Link>
              )
            })
          ) : <p>Your list of places created by you is empty</p>}
        </section>
      </section>
    )
  }  
}

export default withAuth(MyPlaces);

