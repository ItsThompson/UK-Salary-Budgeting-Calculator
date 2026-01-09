import useSWR from "swr";
import { fetcher } from "~/common/utils/api/fetchers";
import { getApiUrl } from "~/common/utils/env";
import type { HelloWorldResponse } from "../types";

export const useHelloWorld = () => {
  const { data, error, isLoading, mutate } = useSWR<HelloWorldResponse>(
    `${getApiUrl()}/`,
    fetcher,
  );

  return {
    helloWorld: data,
    isLoading,
    isError: error,
    mutate,
  };
};
