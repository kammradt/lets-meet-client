import axios from "axios";
import jwt_decode from "jwt-decode";

const baseURL = "http://localhost:3000"; //"https://api-lets-meet.herokuapp.com"; // Create env vars on vercel

const http = axios.create({ baseURL });

http.interceptors.request.use(
  function(config) {
    const userToken = getToken();
    if (userToken) {
      const decoded = jwt_decode(userToken);
      if (isExpired(decoded)) return;

      config.headers.Authorization = `Bearer ${userToken}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

const getToken = () => {
  return localStorage.getItem("token");
};

const isExpired = decodedToken => {
  const expiration = decodedToken.exp;
  const now = Date.now().valueOf() / 1000;
  return now > expiration;
};

const setToken = token => {
  localStorage.setItem("token", token);
  localStorage.setItem("logged", "true");
};

const clearToken = () => {
  localStorage.removeItem("token");
  localStorage.setItem("logged", "");
};

export { http, setToken, clearToken };
