import { useMemo } from "react";
import {
  useCurrentLocation,
  useCurrentView,
  useLocations,
  useSvgType,
} from "../../hooks";
import { InteractiveFloorplan } from "../InteractiveFloorplan";
import { Location2D } from "./Location2D";
interface IScale {
  scaleZoom: string;
}

export const Locations = ({ scaleZoom }: IScale) => {
  const locations = useLocations();
  const currentLocation = useCurrentLocation();
  const currentView = useCurrentView();

  const svgType = useSvgType();

  const svg = useMemo(
    () =>
      locations[currentLocation]?.views[currentView]?.svg === "none"
        ? null
        : locations[currentLocation]?.views[currentView]?.svg,
    [currentLocation, currentView, locations]
  );

  if (locations.length === 0) return null;

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        transition: "all .5s ",
        scale: scaleZoom,
      }}
    >
      {svg && svgType === "3d" ? (
        <InteractiveFloorplan svg={svg} />
      ) : (
        <Location2D />
      )}
    </div>
  );
};
