import axios from 'axios';

// Configurando a URL base do backend
const api = axios.create({
  baseURL: 'https://estudo-vercel.vercel.app',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;