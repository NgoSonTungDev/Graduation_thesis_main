import axios from "axios";
// import { toast } from 'react-toastify';

const dev = "https://63ea2b4b3363c870036334ea.mockapi.io";

const axiosClient = axios.create({
  baseURL: dev,
});

axiosClient.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("jwt_token");
  config.headers = {
    "Content-Type": "application/json",
  };
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    const { data, status } = error.response;
    console.log(data.message, status);
    const statusCode = error.response.status;
    //  if (statusCode === 404 || statusCode === 400) {
    //    window.location.href = '/not-found';
    //    return;
    //  }

    if (statusCode === 403) {
      window.location.href = "/forbidden";
      return;
    }
    if (statusCode === 500) {
      // show notification
      // toast.error('System has an error');
      return;
    }
    throw new Error(data.message);
  }
);

export default axiosClient;
