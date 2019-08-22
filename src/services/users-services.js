import axios from 'axios'

class UserService {
  constructor(){
    this.user = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_DOMAIN,
      withCredentials: true,
    })
  }

  getCurrentUser(){
    return this.user.get('/users/current')
    .then(response => response);
  }
    
  getAllUsers(){
    return this.user.get('/users')
    .then(response => response);
  }
  
  getUser(id){
    return this.user.get(`/users/${id}`)
    .then(response => response);
  }

  getAllMyFavourites(){
    return this.user.get('/users/myFavourites')
    .then(response => response);
  }

  updateUser(user){
    return this.user.put(`/users/update`, { user })
      .then(({ data }) => data);
  }

  addFriend(id){
    return this.user.put(`/users/addFriend/${id}`)
      .then(({ data }) => data);
  }
  
  deleteFriend(id) {
    return this.user.put(`/users/deleteFriend/${id}`)
      .then(({ data }) => data);
  }

}

const userService = new UserService();
export default userService;