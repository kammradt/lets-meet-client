import axios from 'axios'

const baseURL = 'https://api-lets-meet.herokuapp.com/' // Create env vars on vercel

const http = axios.create({ baseURL })

http.interceptors.request.use((config) => {
  const userToken = 'getUserToken()'

  // const expiration = getExpiration(userToken)
  // const today = new Date();
  //if (today > expiration) {
  //} else { }

  config.headers.Authorization = `Bearer ${userToken}`;
  return config;
}, (error) => {
  return Promise.reject(error);
});

export {http}
