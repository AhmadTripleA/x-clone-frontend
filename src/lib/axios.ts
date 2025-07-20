import axios from 'axios';

const BACKEND_BASE_API = process.env.BACKEND_BASE_API ?? 'http://localhost:8000';

const api = axios.create({
  baseURL: BACKEND_BASE_API,
  withCredentials: true,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'Accept-Language': 'en',
    Source: 'Desktop',
  },
});

// handle token injection in all requests
api.interceptors.request.use(
  async (req) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
  },
  (err) => err
);

// handle expired access token
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalReq = err.config;
    console.log(originalReq);
    
    if (err.response?.status === 401 && !originalReq._retry) {
      originalReq._retry = true;
      const res = await api.get('/auth/refresh');

      const newAcessToken = `Bearer ${res.data.accessToken}`;
      api.defaults.headers.common.Authorization = newAcessToken;
      originalReq.headers.Authorization = newAcessToken;

      return api(originalReq);
    }

    return Promise.reject(err);
  }
);

export default api;
