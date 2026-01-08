import useSWR from "swr";
import type { HelloWorldResponse } from "./types";
import { fetcher } from "~/common/utils/api/fetchers";

export const useHelloWorld = () => {
  const { data, error, isLoading, mutate } = useSWR<HelloWorldResponse>(
    `${import.meta.env.VITE_API_URL}/`,
    fetcher,
  );

  return {
    helloWorld: data,
    isLoading,
    isError: error,
    mutate,
  };
};
