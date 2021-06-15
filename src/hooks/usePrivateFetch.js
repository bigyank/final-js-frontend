import axios from "axios";
import { useSelector } from "react-redux";

export const usePrivateFetch = () => {
  const { token } = useSelector((state) => state.user);

  const authAxios = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
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
