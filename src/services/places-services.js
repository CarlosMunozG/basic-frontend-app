import axios from 'axios';

class PlacesService {
  constructor() {
    this.places = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_DOMAIN,
      withCredentials: true,
    })
  }

  createPlace(place) {
    console.log(place);
    const { name, postalCode, bestMomentOfYear, categories, locationType, description, inOutDoors, money } = place;
    return this.places.post('/places/add', {name, postalCode, bestMomentOfYear, categories, locationType, description, inOutDoors, money})
      .then(({ data }) => data);
  }

  updatePlace(place) {
    const { name, postalCode, bestMomentOfYear, categories, locationType, description, inOutDoors, money, _id } = place;
    return this.places.put(`/places/${_id}/update`, {name, postalCode, bestMomentOfYear, categories, locationType, description, inOutDoors, money})
      .then(({ data }) => data);
  }

  deletePlace(place) {
    const { _id } = place;
    return this.places.delete(`/places/${_id}/delete`)
      .then(data => data)
  }
}

const places = new PlacesService();

export default places
