import { useMutation } from "react-query";
import { usePrivateFetch } from "./usePrivateFetch";

export const useDelete = (key) => {
  const fetch = usePrivateFetch();
  return useMutation(
    async ({ path }) => {
      return fetch.delete(path);
    },
    { mutationKey: key }
  );
};
