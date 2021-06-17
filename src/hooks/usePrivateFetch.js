import axios from "axios";
import { useSelector } from "react-redux";

export const usePrivateFetch = () => {
  const { token } = useSelector((state) => state.user);

  const authAxios = axios.create({
    baseURL: "http://localhost:4000/api",
  });

  authAxios.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
    (error) => Promise.reject(error)
  );
  return authAxios;
};
