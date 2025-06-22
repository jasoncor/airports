import { useQuery } from "@tanstack/react-query";
import { getAirports } from "../api/airport";

export const useAirports = () => {
  return useQuery({
    queryKey: ["airports"],
    queryFn: getAirports,
    staleTime: 30 * 60 * 1000,
  });
};
