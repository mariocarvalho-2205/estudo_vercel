import axios from 'axios';

// Configurando a URL base do backend
const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export default api;