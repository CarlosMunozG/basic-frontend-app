import axios from 'axios';

class PlacesService {
  constructor() {
    this.places = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_DOMAIN,
      withCredentials: true,
    })
  }

  getAllPlaces(){
    return this.places.get('/places')
    .then(response => response);
  }

  getAllMyPlaces(){
    return this.places.get('/places/myplaces')
    .then(response => response);
  }

  getAllMyFavouritePlaces(){
    return this.places.get('/places/myFavouritePlaces')
    .then(response => response);
  }

  getOnePlace(id){
    return this.places.get(`places/${id}`)
    .then(response => response);
  }

  createPlace(place) {
    const { name, postalCode, bestMomentOfYear, categories, locationType, description, inOutDoors, money, images, location } = place;
    return this.places.post('/places/add', {name, postalCode, bestMomentOfYear, categories, locationType, description, inOutDoors, money, images, location})
      .then(({ data }) => data);
  }

  updatePlace(place) {
    const { name, postalCode, bestMomentOfYear, categories, locationType, description, inOutDoors, money, images, _id, location } = place;
    return this.places.put(`/places/${_id}/update`, {name, postalCode, bestMomentOfYear, categories, locationType, description, inOutDoors, money, images, location})
      .then(({ data }) => data);
  }

  deletePlace(id) {
    return this.places.delete(`/places/${id}/delete`)
      .then(data => data)
  }

  addLike(placeId) {
    return this.places.put(`/places/${placeId}/like`)
      .then(({ data }) => data);
  }

  deleteLike(placeId) {
    return this.places.put(`/places/${placeId}/unlike`)
      .then(({ data }) => data);
  }
}

const places = new PlacesService();

export default places
