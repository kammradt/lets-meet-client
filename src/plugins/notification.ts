import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

import { clearToken } from './axios';

const notyf = new Notyf();
const success = (successMessage: string) => {
  notyf.success(successMessage);
};

const error = (errorMessage: string) => {
  notyf.error(errorMessage);
};

const handleUnexpected = () => {
  error('Unexpected error. Get in touch with support.');
};

const handleError = (err: any) => {
  const message = err.response.data.message;
  if (!message) handleUnexpected();

  Array.isArray(message) ? message.forEach(error) : error(message);
};

const clearExpirationNotification = () => {
  clearTimeout(Number(localStorage.getItem('ExpirationNotification')));
  localStorage.removeItem('ExpirationNotification');
};

const expiredError = () => {
  clearToken();
  error('Your session is expired. Sign in again.');
  setTimeout(() => document.location.reload, 1000);
  // TODO fiz with vuex
};
const createExpirationNotification = (expiration: number) => {
  clearExpirationNotification();
  localStorage.setItem(
    'ExpirationNotification',
    String(setTimeout(expiredError, expiration))
  );
};

export {
  handleError,
  success,
  error,
  createExpirationNotification,
  clearExpirationNotification,
  expiredError,
};
