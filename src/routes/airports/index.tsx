import { createFileRoute } from "@tanstack/react-router";
import { AirportList } from "../../components/airport-list/AirportList";

export const Route = createFileRoute("/airports/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <AirportList />;
}
