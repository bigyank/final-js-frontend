import { useQuery } from "react-query";
import { usePrivateFetch } from "./usePrivateFetch";

export const useGet = (key, id) => {
  const fetch = usePrivateFetch();
  return ({ path }) =>
    useQuery([key, id], async () => {
      const { data } = await fetch.get(path);
      return data;
    });
};
