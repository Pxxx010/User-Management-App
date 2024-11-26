import axios from 'axios';

const api = axios.create({
  baseURL: 'http://172.26.45.242:5000/api/users', // Substitua pelo seu IP local ou domínio
  headers: {
    'Content-Type': 'multipart/form-data', // Permite envio de FormData
  },
});

export const createUser = (user) => api.post('/', user);
export const getAllUsers = () => api.get('/');

export default api;
