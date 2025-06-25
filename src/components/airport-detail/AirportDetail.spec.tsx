import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import "@testing-library/jest-dom";

const mockNavigate = vi.fn();
const mockUseParams = vi.fn();
const mockUseAirports = vi.fn();

vi.mock("@tanstack/react-router", () => ({
  useParams: mockUseParams,
  useNavigate: () => mockNavigate,
}));

vi.mock("../../hooks/useAirports", () => ({
  useAirports: mockUseAirports,
}));

vi.mock("../common", () => ({
  Spinner: () => <div data-testid="spinner" />,
}));

const mockAirport = {
  airportCode: "SYD",
  airportName: "Sydney Kingsford Smith",
  country: { countryName: "Australia" },
  city: { cityName: "Sydney", timeZoneName: "Australia/Sydney" },
  state: { stateName: "New South Wales" },
  region: { regionName: "Oceania" },
  location: {
    latitude: -33.9461,
    latitudeDirection: "S",
    longitude: 151.1772,
    longitudeDirection: "E",
    aboveSeaLevel: 6,
  },
};

beforeEach(() => {
  vi.clearAllMocks();
  mockNavigate.mockReset();
});

describe("AirportDetail", () => {
  it("renders spinner while loading", async () => {
    mockUseParams.mockReturnValue({ code: "SYD" });
    mockUseAirports.mockReturnValue({ isLoading: true });

    const { AirportDetail } = await import("./AirportDetail");
    render(<AirportDetail />);
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  it("renders error message on error", async () => {
    mockUseParams.mockReturnValue({ code: "SYD" });
    mockUseAirports.mockReturnValue({
      isLoading: false,
      error: { message: "Error loading airport details" },
    });

    const { AirportDetail } = await import("./AirportDetail");
    render(<AirportDetail />);
    expect(
      screen.getByText(/Error loading airport details/i)
    ).toBeInTheDocument();
  });

  it("renders not found message if airport does not exist", async () => {
    mockUseParams.mockReturnValue({ code: "XXX" });
    mockUseAirports.mockReturnValue({
      isLoading: false,
      data: [mockAirport],
      error: undefined,
    });

    const { AirportDetail } = await import("./AirportDetail");
    render(<AirportDetail />);
    expect(screen.getByText(/Airport not found/i)).toBeInTheDocument();
  });

  it("renders airport details when airport is found", async () => {
    mockUseParams.mockReturnValue({ code: "SYD" });
    mockUseAirports.mockReturnValue({
      isLoading: false,
      data: [mockAirport],
      error: undefined,
    });

    const { AirportDetail } = await import("./AirportDetail");
    render(<AirportDetail />);
    expect(screen.getByText(/Sydney Kingsford Smith/)).toBeInTheDocument();
    expect(screen.getByText("Australia")).toBeInTheDocument();
    expect(screen.getByText("Sydney")).toBeInTheDocument();
    expect(screen.getByText("New South Wales")).toBeInTheDocument();
    expect(screen.getByText(/-33.9461° S, 151.1772° E/)).toBeInTheDocument();
    expect(screen.getByText("Australia/Sydney")).toBeInTheDocument();
  });

  it("navigates back to airports list when button is clicked", async () => {
    mockUseParams.mockReturnValue({ code: "SYD" });
    mockUseAirports.mockReturnValue({
      isLoading: false,
      data: [mockAirport],
      error: undefined,
    });

    const { AirportDetail } = await import("./AirportDetail");
    render(<AirportDetail />);
    const button = screen.getByRole("button", {
      name: /Back/i,
    });
    fireEvent.click(button);
    expect(mockNavigate).toHaveBeenCalledWith({ to: "/airports" });
  });
});
