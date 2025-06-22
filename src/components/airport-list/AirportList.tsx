import { useNavigate } from "@tanstack/react-router";
import { useAirports } from "../../hooks/useAirports";
import { Spinner } from "../common";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { AirportListItem } from "./AirportListItem";

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
    <div className="flex flex-col w-full bg-gray-50 rounded-lg shadow-lg border border-gray-200 flex-1">
      <div className="flex-1 w-full">
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
              }) => {
                return (
                  <div
                    style={style}
                    className="h-[100px] w-full border-b border-gray-200 p-4 flex justify-between items-center bg-white hover:bg-gray-100 cursor-pointer transition-colors duration-150 group"
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
                    <AirportListItem airport={data[index]} />
                  </div>
                );
              }}
            </List>
          )}
        </AutoSizer>
      </div>
    </div>
  );
};
