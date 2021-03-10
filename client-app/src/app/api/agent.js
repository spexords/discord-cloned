import Axios from "axios";
import { id } from "date-fns/locale";

Axios.defaults.baseURL = process.env.REACT_APP_API_URL;

Axios.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem("jwt");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

Axios.interceptors.response.use(undefined, (error) => {
  throw error.response;
});

const responseBody = (response) => {
  return response.data;
};

const requests = {
  get: (url) => Axios.get(url).then(responseBody),
  post: (url, body) => Axios.post(url, body).then(responseBody),
  put: (url, body) => Axios.put(url, body).then(responseBody),
  delete: (url) => Axios.delete(url).then(responseBody),
};

const User = {
  login: (values) => requests.post("/user/login", values),
  current: () => requests.get("/user"),
  register: (values) => requests.post("/user/register", values),
  updateAccount: (values) => requests.put("/user", values),
  updatePassword: (values) => requests.put("/user/password", values)
};

const Channels = {
  fetchAll: () => requests.get("/channels"),
  fetchDetails: (id) => requests.get(`/channels/${id}`),
  fetchUsers: (id) => requests.get(`/channels/${id}/users`),
  createChannel: (values) => requests.post("/channels", values),
  deleteChannel: (id) => requests.delete(`/channels/${id}`),
  changePasswordChannel: (id, values) => requests.put(`/channels/${id}/password`, values),
  createSubchannel: (id, values) =>
    requests.post(`/channels/${id}/subchannels`, values),
  joinChannel: (values) => requests.post("/channels/join", values),
  leaveChannel: (id) => requests.post(`/channels/${id}/leave`, {}),
  kickUser: (id, uid) => requests.delete(`/channels/${id}/users/${uid}`)
};

const Messages = {
  remove: (id) => requests.delete(`/messages/${id}`),
};

const Subchannels = {
  fetchDetails: (id) => requests.get(`/subchannels/${id}`),
  sendMessage: (id, values) =>
    requests.post(`/subchannels/${id}/messages`, values),
};

export default {
  User,
  Channels,
  Subchannels,
  Messages,
};
