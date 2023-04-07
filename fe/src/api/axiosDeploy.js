import axios from "axios";

const dev = "https://mafline-upload-image-and-vnpay.onrender.com/api";

const axiosDeploy = axios.create({
  baseURL: dev,
  headers: {
    Accept: "application/json",
  },
});

export default axiosDeploy;
