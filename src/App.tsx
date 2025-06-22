import { QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { router } from "./lib/router";
import { RouterProvider } from "@tanstack/react-router";
import { queryClient } from "./lib/queryClient";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
