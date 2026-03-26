import axios from "axios";
import { BACKEND_API, CHATBOT_API } from "../constant/Static";

export const axiosLogin = axios.create({
  baseURL: BACKEND_API,
  headers: {
    "Content-Type": "application/json",
  },
});

export const chataxios = axios.create({
  baseURL: CHATBOT_API,
  headers: {
    "Content-Type": "application/json",
  },
});
