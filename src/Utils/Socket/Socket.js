// frontend/src/socket.js
import { io } from "socket.io-client";

const SOCKET_URL = "http://192.168.38.114:7000"; // your backend

export const socket = io(SOCKET_URL, {
  withCredentials: true,
  transports: ["websocket", "polling"],
});