import Axios from "axios";

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
};

const Channels = {
  fetchAll: () => requests.get("/channels"),
  fetchChannelDetails: (id) => requests.get(`/channels/${id}`)
}

export default {
  User,
  Channels
};
