import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { AirportList } from "./AirportList";
import { afterEach } from "node:test";

let useAirportsMockReturnValue = {
  data: [
    {
      airportCode: "SYD",
      airportName: "Sydney",
      country: { countryName: "Australia" },
    },
    {
      airportCode: "MEL",
      airportName: "Melbourne",
      country: { countryName: "Australia" },
    },
  ],
  isPending: false,
  error: null,
};

const navigate = vi.fn();
vi.doMock("@tanstack/react-router", () => ({
  useNavigate: () => navigate,
}));

vi.mock("../../hooks/useAirports", () => ({
  useAirports: () => useAirportsMockReturnValue,
}));

vi.mock("@tanstack/react-router", () => ({
  useNavigate: () => vi.fn(),
}));

vi.mock("../common", () => ({
  Spinner: () => <div>Loading...</div>,
}));

// Mock AutoSizer and List for react-window
vi.mock("react-virtualized-auto-sizer", () => ({
  __esModule: true,
  default: ({ children }: any) => children({ height: 600, width: 800 }),
}));
vi.mock("react-window", () => {
  const Actual = vi.importActual("react-window");
  return {
    ...Actual,
    FixedSizeList: ({ children, itemCount }: any) => (
      <div>
        {Array.from({ length: itemCount }).map((_, i) =>
          children({ index: i, style: {} })
        )}
      </div>
    ),
  };
});

describe("AirportList", () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
  });

  it("renders a list of airports", () => {
    render(<AirportList />);
    expect(screen.getByText(/Sydney/)).toBeInTheDocument();
    expect(screen.getByText(/Melbourne/)).toBeInTheDocument();
  });

  it("shows loading spinner when pending", () => {
    useAirportsMockReturnValue = {
      data: [],
      isPending: true,
      error: null,
    };

    render(<AirportList />);
    expect(screen.getByText(/Loading/)).toBeInTheDocument();
  });

  it("shows error message on error", () => {
    useAirportsMockReturnValue = {
      data: [],
      isPending: false,
      error: { message: "Error loading airports" } as any,
    };

    render(<AirportList />);
    expect(screen.getByText(/Error loading airports/)).toBeInTheDocument();
  });

  it("navigates to airport detail on click", async () => {
    useAirportsMockReturnValue = {
      data: [
        {
          airportCode: "SYD",
          airportName: "Sydney",
          country: { countryName: "Australia" },
        },
        {
          airportCode: "MEL",
          airportName: "Melbourne",
          country: { countryName: "Australia" },
        },
      ],
      isPending: false,
      error: null,
    };

    render(<AirportList />);

    fireEvent.click(screen.getByText(/Sydney/));

    waitFor(() => {
      expect(navigate).toHaveBeenCalledWith({
        to: "/airports/SYD",
      });
    });
  });
});
