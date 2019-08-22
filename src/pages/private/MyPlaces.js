import React, {Component} from 'react';

import withAuth from '../../components/withAuth.js';
import GoBackButton from '../../components/GoBackButton.js';
import places from '../../services/places-services.js';
import AddButton from '../../components/AddButton.js';
import ViewMapButton from '../../components/ViewMapButton.js';
import LinkList from '../../components/LinkList.js';


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
    .catch(error =>{ console.log(error) })
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
                <LinkList 
                  addRoute='/places'
                  id={place._id}
                  images={place.images}
                  name={place.name}
                />
              )
            })
          ) : <p>Your list of places created by you is empty</p>}
        </section>
      </section>
    )
  }  
}

export default withAuth(MyPlaces);

