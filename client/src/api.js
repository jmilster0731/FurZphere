import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // Replace with your Express server URL
});

export default api;