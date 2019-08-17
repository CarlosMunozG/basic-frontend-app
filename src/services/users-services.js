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

  updateUser(user) {
    const { id } = user;
    return this.user.put(`/users/${id}/update`, { user })
      .then(({ data }) => data);
  }

}

const userService = new UserService();

export default userService;