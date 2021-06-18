import { useMutation } from "react-query";
import { usePrivateFetch } from "./usePrivateFetch";

export const usePost = (key) => {
  const fetch = usePrivateFetch();
  return useMutation(
    async ({ path, credentials }) => {
      const { data } = await fetch.post(path, credentials);
      return data;
    },

    { mutationKey: key }
  );
};
