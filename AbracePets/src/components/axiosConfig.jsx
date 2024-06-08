import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://abracepets-api.tccnapratica.com.br',
});

instance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
