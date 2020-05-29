import { clearToken, http, isLogged, setToken } from "../../../plugins/axios";
import { handleError, success } from "../../../plugins/notification";

const USERS = "/users";
const ME = "/me";
const AUTH = "/auth";

const register = ({ email, password }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await http.post(USERS, {
        email,
        password
      });
      resolve(response.data);
    } catch (err) {
      handleError(err);
      reject();
    }
  });
};

const login = ({ email, password }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await http.post(AUTH, {
        email,
        password
      });
      setToken(response.data.token);
      success("Welcome!");
      resolve();
    } catch (err) {
      clearToken();
      handleError(err);
      reject();
    }
  });
};

const me = () => {
  return new Promise(async (resolve, reject) => {
    if (isLogged()) {
      try {
        const response = await http.get(USERS + ME);
        resolve(response.data);
      } catch (err) {
        clearToken();
        handleError(err);
        reject();
      }
    }
  });
};

export { register, login, me };
