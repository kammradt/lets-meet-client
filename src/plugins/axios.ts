import axios, {AxiosRequestConfig} from "axios";
import JwtDecode from "jwt-decode";
import {
  clearExpirationNotification,
  createExpirationNotification,
  expiredError,
  handleError,
  success
} from "./notification";

const baseURL = "https://api-lets-meet.herokuapp.com"; // Create env vars on vercel

const getToken = () => {
  return localStorage.getItem("token");
};

const isLogged = () => {
  return !!getToken();
};

const isExpired = (decodedToken: any) => {
  const expiration = decodedToken.exp;
  const now = Date.now().valueOf() / 1000;
  return now > expiration;
};

const getRemainingTimeUntilExpiration = (expiration: number) => {
  const now = Date.now().valueOf() / 1000;
  return (expiration - now) * 1000;
};

const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

const clearToken = () => {
  localStorage.removeItem("token");
  clearExpirationNotification();
};

const http = axios.create({baseURL});

http.interceptors.request.use(
    function (value: AxiosRequestConfig): AxiosRequestConfig {
      const userToken = getToken();
      if (userToken) {
        const decoded = JwtDecode(userToken) as any;
        if (isExpired(decoded)) {
          expiredError();
        }
        createExpirationNotification(
            getRemainingTimeUntilExpiration(decoded.exp)
        );

        value.headers.Authorization = `Bearer ${userToken}`;
      }

      return value;
    },
    (error: any) => {
      return Promise.reject(error);
    }
);

http.interceptors.response.use((response) => {
  return response;
}, (error) => {
  console.log('error')

  if (error.response.status >= 400) {
    handleError(error)
  }
  return Promise.reject(error);
});


export {http, setToken, clearToken, getToken, isLogged};
