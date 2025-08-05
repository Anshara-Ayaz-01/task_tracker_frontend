import axios from 'axios';

const api = axios.create({
  baseURL: 'https://task-tracker-backend-462y.onrender.com/api',
  withCredentials: true,
});

export default api;
