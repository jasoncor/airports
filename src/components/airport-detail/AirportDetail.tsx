import { useParams, useNavigate } from "@tanstack/react-router";
import currencyCodes from "currency-codes";
import { useAirports } from "../../hooks/useAirports";
import { Spinner } from "../common";

export const AirportDetail = () => {
  const { code } = useParams({ from: "/airports/$code" });
  const navigate = useNavigate();

  const { data, isLoading, error } = useAirports();
  const airport = data?.find((airport) => airport.airportCode === code);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-6 py-4 shadow-md text-center max-w-md mx-auto mt-12">
        <div className="text-xl font-semibold mb-2">
          Error loading airport details
        </div>
        <div className="text-base">
          {"An unexpected error occurred. Please try again."}
        </div>
      </div>
    );
  }

  if (!airport) {
    return (
      <div className="text-center text-red-600 font-semibold mt-10">
        Airport not found.
      </div>
    );
  }

  const currency = currencyCodes.country(airport?.country.countryName);

  return (
    <div className="flex flex-col items-center w-full h-full p-4 md:p-8">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 w-full max-w-xl p-6 md:p-10 flex flex-col items-start mt-8 md:mt-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-1 tracking-tight w-full text-left">
          {airport.airportName}
        </h1>
        <span className="text-lg text-gray-400 font-medium mb-6 tracking-wide w-full text-left">
          ({airport.airportCode})
        </span>
        <div className="grid grid-cols-2 gap-x-8 gap-y-4 w-full mb-10">
          <div className="col-span-2 text-base md:text-lg text-gray-700 mb-2">
            <span className="font-semibold text-gray-800">Currency:</span>{" "}
            {currency[0]?.code || "N/A"}
          </div>
          <div className="col-span-2 text-base md:text-lg text-gray-700 mb-2">
            <span className="font-semibold text-gray-800">Timezone:</span>{" "}
            {airport.city.timeZoneName}
          </div>
          <div className="mb-2">
            <span className="block font-semibold text-gray-800">Country</span>
            <span className="block text-gray-600">
              {airport.country.countryName}
            </span>
          </div>
          <div className="mb-2">
            <span className="block font-semibold text-gray-800">City</span>
            <span className="block text-gray-600">{airport.city.cityName}</span>
          </div>
          <div className="mb-2">
            <span className="block font-semibold text-gray-800">State</span>
            <span className="block text-gray-600">
              {airport.state.stateName || "N/A"}
            </span>
          </div>
          <div className="mb-2">
            <span className="block font-semibold text-gray-800">Region</span>
            <span className="block text-gray-600">
              {airport.region.regionName}
            </span>
          </div>
          <div className="col-span-2 mt-2">
            <span className="block font-semibold text-gray-800">Location</span>
            <span className="block text-gray-600">
              {airport.location.latitude}° {airport.location.latitudeDirection},{" "}
              {airport.location.longitude}°{" "}
              {airport.location.longitudeDirection}
              {airport.location.aboveSeaLevel !== undefined &&
                ` (Above sea level: ${airport.location.aboveSeaLevel}m)`}
            </span>
          </div>
        </div>
        <button
          onClick={() => navigate({ to: "/airports" })}
          className="mt-2 px-6 py-2 bg-red-600 text-white font-semibold rounded-lg shadow hover:bg-red-700 transition-colors duration-150 self-center"
        >
          Back to Airports List
        </button>
      </div>
    </div>
  );
};
