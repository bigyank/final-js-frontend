import axios from "axios";

const BASE_PATH = "http://localhost:4000/api";

export const publicFetch = axios.create({
  baseURL: BASE_PATH,
});
