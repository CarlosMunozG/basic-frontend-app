import axios from 'axios';

class MapboxService {
  constructor() {
    this.mapbox = axios.create({
      baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
      withCredentials: true,
    })
  }

  getPlacesNearUser(){
    // const userLocation = user.location.type;
    // return this.mapbox.post(`/${userLocation}.json`)
    return this.mapbox.get(`/Barcelona.json?`)
      .then(({ response }) => response);
  }
}
const mapbox = new MapboxService();

export default mapbox