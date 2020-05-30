import { http } from "../../../plugins/axios";
import { handleError } from "../../../plugins/notification";

const EVENTS = "/events";
const ME = "/me";

const events = params => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await http.get(EVENTS, { params });
      resolve(response.data.items);
    } catch (err) {
      handleError(err);
      reject();
    }
  });
};

const create = body => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await http.post(EVENTS, body);
      resolve(response.data);
    } catch (err) {
      handleError(err);
      reject();
    }
  });
};

const managedEvents = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await http.post(EVENTS + ME);
      resolve(response.data.items);
    } catch (err) {
      handleError(err);
      reject();
    }
  });
};

export { events, create, managedEvents };
