import axios from "axios";
export const api = axios.create({
  baseURL:
    process.env.REACT_APP_API_BASE_URL || "URL_DE_PRODUCAO",
  withCredentials: true,
  timeout: 300000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
