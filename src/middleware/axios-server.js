import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/'

const server = axios.create({
  baseURL: API_URL,
  headers: {},
});




const responseBody = (response) => response.data;

const serverRequests = {
  del: (url) => server.delete(`${url}`).then(responseBody),
  get: (url) => server.get(`${url}`).then(responseBody),
  put: (url, body) => server.put(`${url}`, body).then(responseBody),
  post: (url, body) => server.post(`${url}`, body).then(responseBody),
};

export default serverRequests;
