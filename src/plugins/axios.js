import axios from "axios";
import jwt_decode from "jwt-decode";
import {
  clearExpirationNotification,
  createExpirationNotification,
  expiredError
} from "./notification";

const baseURL = "http://localhost:3000"; //"https://api-lets-meet.herokuapp.com"; // Create env vars on vercel

const http = axios.create({ baseURL });

http.interceptors.request.use(
  function(config) {
    const userToken = getToken();
    if (userToken) {
      const decoded = jwt_decode(userToken);
      if (isExpired(decoded)) {
        expiredError();
        return;
      }
      createExpirationNotification(
        getRemainingTimeUntilExpiration(decoded.exp)
      );

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

const isLogged = () => {
  return !!getToken();
};

const isExpired = decodedToken => {
  const expiration = decodedToken.exp;
  const now = Date.now().valueOf() / 1000;
  return now > expiration;
};

const getRemainingTimeUntilExpiration = expiration => {
  const now = Date.now().valueOf() / 1000;
  return (expiration - now) * 1000;
};

const setToken = token => {
  localStorage.setItem("token", token);
};

const clearToken = () => {
  localStorage.removeItem("token");
  clearExpirationNotification();
};

export { http, setToken, clearToken, getToken, isLogged };
