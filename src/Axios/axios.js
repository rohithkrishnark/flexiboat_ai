import axios from "axios";
import { BACKEND_API } from "../constant/Static";

const axiosLogin = axios.create({
  baseURL: BACKEND_API,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosLogin;
