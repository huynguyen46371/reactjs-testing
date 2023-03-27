import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5003/",
  timeout: 100000,
});

export default API;
