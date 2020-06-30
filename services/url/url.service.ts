import axios from 'axios';

export const moveToUrl = (url: string) => {
  return axios.get(`/api/${url}`);
}

export const compressFullUrl = (fullUrl: string) => {
  return axios.post('/api/compress', { fullUrl }, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}