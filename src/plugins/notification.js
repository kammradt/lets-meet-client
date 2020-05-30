import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import colors from "vuetify/lib/util/colors";
import { clearToken } from "./axios";

const handleError = err => {
  const message = err.response.data.message;
  if (!message) handleUnexpected();

  Array.isArray(message) ? message.forEach(error) : error(message);
};

const handleUnexpected = () => {
  error("Unexpected error. Get in touch with support.");
};

const createExpirationNotification = expiration => {
  clearExpirationNotification();
  localStorage.setItem(
    "ExpirationNotification",
    setTimeout(expiredError, expiration)
  );
};

const expiredError = () => {
  clearToken();
  error("Your session is expired. Sign in again.");
  setTimeout(() => document.location.reload, 1000);
};

const clearExpirationNotification = () => {
  clearTimeout(Number(localStorage.getItem("ExpirationNotification")));
  localStorage.removeItem("ExpirationNotification");
};

const success = successMessage => {
  Toastify({
    text: successMessage,
    duration: 3000,
    backgroundColor: `linear-gradient(to right, ${colors.teal.base}, ${colors.teal.darken1})`
  }).showToast();
};

const error = errorMessage => {
  Toastify({
    text: errorMessage,
    duration: 3000,
    backgroundColor: `linear-gradient(to right, ${colors.red.base}, ${colors.red.darken1})`
  }).showToast();
};

export {
  handleError,
  success,
  error,
  createExpirationNotification,
  clearExpirationNotification,
  expiredError
};
