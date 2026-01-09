import type { HelloWorldResponse } from "../../types";
import * as useHelloWorldModule from "../useHelloWorld";

export type MockUseHelloWorldProps = {
  helloWorld?: HelloWorldResponse | undefined;
  isLoading?: boolean;
  isError?: any;
  mutate?: jest.Mock;
};

export const mockUseHelloWorld = ({
  helloWorld = undefined,
  isLoading = false,
  isError = undefined,
  mutate = jest.fn(),
}: MockUseHelloWorldProps = {}) => {
  const spy = jest
    .spyOn(useHelloWorldModule, "useHelloWorld")
    .mockImplementation(() => ({
      helloWorld,
      isLoading,
      isError,
      mutate,
    }));

  return {
    mockMutate: mutate,
    spy,
  };
};
