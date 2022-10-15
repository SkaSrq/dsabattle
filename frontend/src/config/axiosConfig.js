import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  //   credentials: "include",
  //   withCredentials: true,
});
axios.defaults.withCredentials = true;
export default instance;
