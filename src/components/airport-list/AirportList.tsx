import { useNavigate } from "@tanstack/react-router";
import { useAirports } from "../../hooks/useAirports";
import { Spinner } from "../common";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

export const AirportList = () => {
  const { data, isPending, error } = useAirports();
  const navigate = useNavigate();

  const handleAirportClick = (airportCode: string) => {
    navigate({
      to: `/airports/${airportCode}`,
    });
  };

  if (isPending) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-6 py-4 shadow-md text-center max-w-md mx-auto mt-12">
        <div className="text-xl font-semibold mb-2">Error loading airports</div>
        <div className="text-base">
          {"An unexpected error occurred. Please try again."}
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <div className="text-gray-500 font-semibold">No airports found.</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full bg-gray-50 md:rounded-lg md:shadow-lg border border-gray-200 flex-1 md:py-6 md:px-0 overflow-x-hidden">
      <div className="flex-1 md:max-w-[1280px] w-full mx-auto">
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              itemCount={data.length}
              itemSize={100}
              width={width}
            >
              {({
                index,
                style,
              }: {
                index: number;
                style: React.CSSProperties;
              }) => (
                <div
                  style={style}
                  className="group border-b border-gray-200 last:border-b-0 px-4 py-3 md:px-8 md:py-5 flex items-center justify-between bg-white hover:bg-red-50 cursor-pointer transition-colors duration-150 md:rounded-lg md:mb-3 shadow-sm hover:shadow-md focus-within:ring-2 focus-within:ring-red-400"
                  key={data[index].airportCode}
                  onClick={() => handleAirportClick(data[index].airportCode)}
                  tabIndex={0}
                  role="button"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleAirportClick(data[index].airportCode);
                    }
                  }}
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="text-lg md:text-xl font-bold text-gray-900 group-hover:text-red-700 transition-colors">
                      {data[index].airportName}{" "}
                      <span className="text-gray-400 font-normal text-base md:text-lg">
                        ({data[index].airportCode})
                      </span>
                    </span>
                    <span className="text-xs md:text-sm text-gray-500 font-medium">
                      {data[index].country.countryName}
                    </span>
                  </div>
                  <span className="ml-2 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="#f60000"
                      className="w-6 h-6 group-hover:scale-110 transition-transform"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </div>
              )}
            </List>
          )}
        </AutoSizer>
      </div>
    </div>
  );
};
