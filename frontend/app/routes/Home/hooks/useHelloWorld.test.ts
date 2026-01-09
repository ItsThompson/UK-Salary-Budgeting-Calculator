import { renderHook } from "@testing-library/react";

jest.mock("swr");
jest.mock("~/common/utils/env");

import useSWR from "swr";
import { useHelloWorld } from "./useHelloWorld";

const mockUseSWR = useSWR as jest.MockedFunction<typeof useSWR>;

describe("useHelloWorld", () => {
  const mockMutate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseSWR.mockReturnValue({
      data: { Hello: "World" },
      error: null,
      isLoading: false,
      mutate: mockMutate,
      isValidating: false,
    });
  });

  it("should return hello world data", () => {
    const { result } = renderHook(() => useHelloWorld());

    expect(result.current.helloWorld).toEqual({ Hello: "World" });
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(null);
  });
});
