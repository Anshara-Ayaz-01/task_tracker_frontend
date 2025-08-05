import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true, // ✅ This handles cookies automatically
});

// No need to manually attach token anymore
// Remove the interceptor if you’re using HttpOnly cookie

export default api;
