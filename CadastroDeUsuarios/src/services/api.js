import axios from 'axios';

const api = axios.create({
    baseURL: 'https://cadastro-de-usuarios-back-1zbhz0258.vercel.app'
});

export default api;