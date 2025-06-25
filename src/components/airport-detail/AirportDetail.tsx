import { useParams, useNavigate } from "@tanstack/react-router";
import currencyCodes from "currency-codes";
import { useAirports } from "../../hooks/useAirports";
import { Spinner } from "../common";
import { motion } from "framer-motion";

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
    <div className="flex flex-col items-center w-full h-full p-4 md:p-8 bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="bg-white rounded-2xl shadow-xl border border-gray-100 w-full max-w-2xl p-0 flex flex-col items-stretch md:mt-12 overflow-hidden"
      >
        {/* Banner with code and name */}
        <div className="bg-gradient-to-r from-red-600 to-red-400 px-4 py-4 md:px-8 md:py-8 flex flex-col md:flex-row items-center gap-4 md:gap-6">
          <div className="flex flex-col items-center md:items-start flex-1">
            <span className="text-3xl md:text-6xl font-black text-white drop-shadow mb-1 md:mb-2">
              {airport.airportCode}
            </span>
            <span className="text-lg md:text-3xl font-bold text-white/90 mb-1 text-center md:text-left">
              {airport.airportName}
            </span>
          </div>
        </div>
        {/* Details section - condensed on mobile */}
        <div className="p-6 flex flex-col md:p-8 md:grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6 bg-gray-50 text-sm md:text-base">
          {currency[0]?.code && (
            <div className="mb-4 md:mb-4">
              <span className="block text-gray-500 text-xs font-semibold uppercase mb-1 md:mb-1">
                Currency
              </span>
              <span className="block font-mono text-gray-800">
                {currency[0]?.code}
              </span>
            </div>
          )}
          <div className="mb-4 md:mb-4">
            <span className="block text-gray-500 text-xs font-semibold uppercase mb-1 md:mb-1">
              Timezone
            </span>
            <span className="block font-mono text-gray-800">
              {airport.city.timeZoneName}
            </span>
          </div>
          <div className="mb-4 md:mb-4">
            <span className="block text-gray-500 text-xs font-semibold uppercase mb-1 md:mb-1">
              Country
            </span>
            <span className="block font-mono text-gray-800">
              {airport.country.countryName}
            </span>
          </div>
          {airport.state.stateName ? (
            <div className="mb-4 md:mb-4">
              <span className="block text-gray-500 text-xs font-semibold uppercase mb-1 md:mb-1">
                State
              </span>
              <span className="block font-mono text-gray-800">
                {airport.state.stateName}
              </span>
            </div>
          ) : (
            <div className="mb-4 md:mb-4">
              <span className="block text-gray-500 text-xs font-semibold uppercase mb-1 md:mb-1">
                Region
              </span>
              <span className="block font-mono text-gray-800">
                {airport.region.regionName}
              </span>
            </div>
          )}
          <div className="mb-4 md:mb-4">
            <span className="block text-gray-500 text-xs font-semibold uppercase mb-1 md:mb-1">
              City
            </span>
            <span className="block font-mono text-gray-800">
              {airport.city.cityName}
            </span>
          </div>
          <div className="mb-4 md:mb-4">
            <span className="block text-gray-500 text-xs font-semibold uppercase mb-1 md:mb-1">
              Location
            </span>
            <span className="block font-mono text-gray-800">
              {airport.location.latitude}° {airport.location.latitudeDirection},{" "}
              {airport.location.longitude}°{" "}
              {airport.location.longitudeDirection}
            </span>
          </div>
        </div>
        <div className="flex justify-center items-center bg-white border-t border-gray-100 p-4 md:p-6">
          <button
            onClick={() => navigate({ to: "/airports" })}
            className="px-4 py-2 md:px-5 md:py-2 bg-red-600 text-white font-bold rounded-lg shadow hover:bg-red-700 transition-colors duration-150 flex items-center gap-2 text-sm md:text-base"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4 md:w-5 md:h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
            Back
          </button>
        </div>
      </motion.div>
    </div>
  );
};
