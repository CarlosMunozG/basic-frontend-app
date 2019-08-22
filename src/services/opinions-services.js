import axios from 'axios';

class OpinionsService {
  constructor() {
    this.opinions = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_DOMAIN,
      withCredentials: true,
    })
  }

  // getAllOpinions(){
  //   return this.opinions.get('/opinions')
  //   .then(response => response);
  // }

  // getAllMyOpinions(){
  //   return this.opinions.get('/opinions/myopinions')
  //   .then(response => response);
  // }

  getOpinion(id){
    return this.opinions.get(`/opinions/${id}`)
    .then(response => response);
  }

  createOpinion(opinion, placeId) {
    const { description, rating } = opinion;
    return this.opinions.post('/opinions/add', {description, rating, placeId})
      .then(({ data }) => data);
  }

  updateOpinion(opinion) {
    const { description, rating, opinionId } = opinion;
    return this.opinions.put(`/opinions/${opinionId}/update`, { description, rating })
      .then(({ data }) => data);
  }

  deleteOpinion(id) {
    return this.opinions.delete(`/opinions/${id}/delete`)
      .then(data => data)
  }

}

const opinionsService = new OpinionsService();

export default opinionsService;