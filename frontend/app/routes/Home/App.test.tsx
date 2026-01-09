import { render, screen } from "@testing-library/react";
import Home from "./App";
import { mockUseHelloWorld } from "./hooks/__mocks__/mockUseHelloWorld";

jest.mock("~/common/utils/env");

describe("Home", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("shows loading state", () => {
    mockUseHelloWorld({ isLoading: true });

    render(<Home />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("shows error state", () => {
    mockUseHelloWorld({ isError: new Error("API Error") });

    render(<Home />);

    expect(screen.getByText("Error loading data")).toBeInTheDocument();
  });

  it("shows no data state", () => {
    mockUseHelloWorld({ helloWorld: undefined });

    render(<Home />);

    expect(screen.getByText("No data")).toBeInTheDocument();
  });

  it("shows hello world data", () => {
    mockUseHelloWorld({ helloWorld: { Hello: "World" } });

    render(<Home />);

    expect(screen.getByText("World")).toBeInTheDocument();
  });
});
