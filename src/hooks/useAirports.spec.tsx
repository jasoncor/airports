import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as airportApi from "../api/airport";
import { describe, it, expect, vi, afterEach } from "vitest";

describe("useAirports", () => {
  const createWrapper = () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false, // Disable retries for tests
        },
      },
    });
    return ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("calls getAirports and returns data", async () => {
    const mockAirports = [{ code: "SYD", name: "Sydney" }] as any[];
    vi.spyOn(airportApi, "getAirports").mockResolvedValueOnce(mockAirports);

    const { useAirports } = await import("./useAirports");

    const { result } = renderHook(() => useAirports(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(mockAirports);
    expect(airportApi.getAirports).toHaveBeenCalledTimes(1);
  });

  it("handles error state", async () => {
    vi.spyOn(airportApi, "getAirports").mockRejectedValueOnce(
      new Error("Failed")
    );

    const { useAirports } = await import("./useAirports");

    const { result } = renderHook(() => useAirports(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });
    expect(result.current.error).toBeDefined();
  });
});
