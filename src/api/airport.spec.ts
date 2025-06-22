import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import axios from "axios";
import { getAirports, type Airport } from "./airport";

vi.mock("axios");

const mockedAxios = axios as unknown as {
  get: ReturnType<typeof vi.fn>;
};

describe("getAirports", () => {
  const mockAirports: Airport[] = [
    {
      airportCode: "SYD",
      internationalAirport: true,
      domesticAirport: true,
      regionalAirport: false,
      onlineIndicator: true,
      eticketableAirport: true,
      location: {
        aboveSeaLevel: 21,
        latitude: -33.9461,
        latitudeRadius: 0,
        longitude: 151.1772,
        longitudeRadius: 0,
        latitudeDirection: "S",
        longitudeDirection: "E",
      },
      airportName: "Sydney Kingsford Smith",
      city: {
        cityCode: "SYD",
        cityName: "Sydney",
        timeZoneName: "Australia/Sydney",
      },
      state: {
        stateCode: "NSW",
        stateName: "New South Wales",
      },
      country: {
        countryCode: "AU",
        countryName: "Australia",
      },
      region: {
        regionCode: "OCE",
        regionName: "Oceania",
      },
    },
  ];

  beforeEach(() => {
    mockedAxios.get = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch airports and return data", async () => {
    (mockedAxios.get as any).mockResolvedValue({ data: mockAirports });

    const result = await getAirports();

    expect(mockedAxios.get).toHaveBeenCalledWith(
      "https://api.qantas.com/flight/refData/airport"
    );
    expect(result).toEqual(mockAirports);
  });

  it("should throw if axios.get fails", async () => {
    (mockedAxios.get as any).mockRejectedValue(new Error("Network error"));

    await expect(getAirports()).rejects.toThrow("Network error");
  });
});
