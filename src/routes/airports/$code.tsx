import { createFileRoute } from "@tanstack/react-router";
import { AirportDetail } from "../../components/airport-detail/AirportDetail";

export const Route = createFileRoute("/airports/$code")({
  component: RouteComponent,
});

function RouteComponent() {
  return <AirportDetail />;
}
