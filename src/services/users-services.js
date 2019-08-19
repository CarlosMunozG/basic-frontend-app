import axios from 'axios'

class UserService {
  constructor(){
    this.user = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_DOMAIN,
      withCredentials: true,
    })
  }
  
  getCurrentUser(){
    return this.user.get('/users')
    .then(response => response);
  }
  
  getUser(id){
    return this.user.get('/users/:id')
    .then(response => response);
  }

  updateUser(user) {
    return this.user.put(`/users/update`, { user })
      .then(({ data }) => data);
  }
  
  addLike(placeId) {
    return this.user.put(`/users/like/${placeId}`)
      .then(({ data }) => data);
  }

  deleteLike(placeId, userId) {
    return this.user.put(`/users/unlike/${placeId}`)
      .then(({ data }) => data);
  }

}

const userService = new UserService();
export default userService;