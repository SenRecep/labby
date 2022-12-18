import axios from "axios";
import notify from "@/helpers/notify";
import { useAuthStore } from "../stores/auth.store";
import router from "@/routers/index";
const labbyAxios = axios.create({
  withCredentials: false,
  timeout: 10000,
  baseURL: import.meta.env.VITE_LABBY_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

labbyAxios.interceptors.request.use((config) => {
  const store = useAuthStore();
  if (store.isAuthenticated && config.headers)
    config.headers.Authorization = `${import.meta.env.VITE_AUTH_SCHEMA} ${
      store.token
    }`;
  return config;
});

labbyAxios.interceptors.response.use(
  (response) => response,
  function (error) {
    const statusCode = error.response ? error.response.status : null;
    let message = error.message;
    if (statusCode === 404)
      message = "The requested resource does not exist or has been deleted";
    if (statusCode === 401) message = "Please login to access this resource";

    notify({
      title: error.name,
      text: message,
      type: "error",
    });
    if (import.meta.env.DEV) console.log(error);
    if (statusCode === 401) {
      router.push({ name: "login" });
    }
    return Promise.reject(error);
  }
);

export default labbyAxios;
