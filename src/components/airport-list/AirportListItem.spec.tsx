import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AirportListItem } from "./AirportListItem";
import type { Airport } from "../../api/airport";

const mockAirport = {
  airportName: "Sydney Kingsford Smith",
  airportCode: "SYD",
  country: {
    countryName: "Australia",
    countryCode: "AU",
  },
};

describe("AirportListItem", () => {
  it("renders the airport name and code", () => {
    render(<AirportListItem airport={mockAirport as Airport} />);
    expect(screen.getByText("Sydney Kingsford Smith")).toBeInTheDocument();
    expect(screen.getByText("(SYD)")).toBeInTheDocument();
  });

  it("renders the country name", () => {
    render(<AirportListItem airport={mockAirport as Airport} />);
    expect(screen.getByText("Australia")).toBeInTheDocument();
  });

  it("renders the ChevronRight icon", () => {
    render(<AirportListItem airport={mockAirport as Airport} />);
    // Lucide icons render as SVGs with role="img"
    const chevronIcon = screen.getByTestId("airport-list-item-chevron");
    expect(chevronIcon).toBeInTheDocument();
  });
});
