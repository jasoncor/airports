import { ChevronRight } from "lucide-react";
import type { Airport } from "../../api/airport";

interface AirportListItemProps {
  airport: Airport;
}

export const AirportListItem = ({ airport }: AirportListItemProps) => {
  return (
    <>
      <div className="flex flex-col">
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-red-600 transition-colors duration-150">
          {airport.airportName}{" "}
          <span className="text-gray-400 font-normal">
            ({airport.airportCode})
          </span>
        </h3>
        <p className="text-gray-600 text-sm mt-1">
          {airport.country.countryName}
        </p>
      </div>
      <ChevronRight
        height={40}
        width={40}
        data-testid="airport-list-item-chevron"
        className="text-red-500 group-hover:text-red-700 transition-colors duration-150"
      />
    </>
  );
};
