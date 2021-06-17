import { useMutation } from "react-query";
import { usePrivateFetch } from "./usePrivateFetch";

export const usePut = (key) => {
  const fetch = usePrivateFetch();
  return useMutation(
    async ({ path, credentials }) => {
      const { data } = await fetch.put(path, credentials);
      return data;
    },
    { mutationKey: key }
  );
};
