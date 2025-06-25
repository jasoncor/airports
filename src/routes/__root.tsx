import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Header } from "../components/layout/Header";

export const Route = createRootRoute({
  component: () => (
    <div className="w-full min-h-screen flex flex-col bg-white">
      <Header />
      <div className="flex-1 w-full flex justify-center bg-white">
        <div className="w-full flex flex-col justify-center items-center">
          <Outlet />
        </div>
      </div>
      <TanStackRouterDevtools />
    </div>
  ),
});
