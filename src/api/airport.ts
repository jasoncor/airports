import axios from "axios";

export interface Airport {
  airportCode: string;
  internationalAirport: boolean;
  domesticAirport: boolean;
  regionalAirport: boolean;
  onlineIndicator: boolean;
  eticketableAirport: boolean;
  location: {
    aboveSeaLevel: number;
    latitude: number;
    latitudeRadius: number;
    longitude: number;
    longitudeRadius: number;
    latitudeDirection: string;
    longitudeDirection: string;
  };
  airportName: string;
  city: {
    cityCode: string;
    cityName: string;
    timeZoneName: string;
  };
  state: {
    stateCode?: string;
    stateName?: string;
  };
  country: {
    countryCode: string;
    countryName: string;
  };
  region: {
    regionCode: string;
    regionName: string;
  };
}

export const getAirports = async (): Promise<Airport[]> => {
  const response = await axios.get(
    `https://api.qantas.com/flight/refData/airport`
  );
  return await response.data;
};
