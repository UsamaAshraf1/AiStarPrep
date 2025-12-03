import axios from "axios";
import { useModal } from "../helper/ModalContext";

let openSessionExpiredModal = null;

export const setSessionExpiredModal = (openModal) => {
  openSessionExpiredModal = openModal;
};

const handleLogout = () => {
  localStorage.clear();
  window.location.href = "/auth/signin";
};

const axiosInstance = axios.create({
  baseURL: "https://api.aistarprep.com/api",
  withCredentials: true, // ✅ Send cookies/session with every request
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use((request) => {
  const token = localStorage.getItem("token");
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      openSessionExpiredModal?.();
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
