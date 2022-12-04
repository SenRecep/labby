import axios from "axios";
import notify from "@/helpers/notify";
const labbyAxios = axios.create({
  withCredentials: false,
  timeout: 10000,
  baseURL: import.meta.env.VITE_LABBY_API_BASE_URL,
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
    console.log(error);
    return Promise.reject(error);
  }
);

export default labbyAxios;
