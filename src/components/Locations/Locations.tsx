import { useMemo } from "react";
import {
  useCurrentLocation,
  useCurrentVideo,
  useCurrentView,
  useLocations
} from "../../hooks";
import { InteractiveFloorplan } from "../InteractiveFloorplan";

export const Locations = () => {
  const locations = useLocations();
  const currentLocation = useCurrentLocation();
  const currentView = useCurrentView();
  const video = useCurrentVideo();

  const jpg = useMemo(
    () =>
      locations[currentLocation].views[currentView]?.jpg === "none"
        ? null
        : locations[currentLocation].views[currentView]?.jpg,
    [currentLocation, currentView, locations]
  );

  const svg = useMemo(
    () =>
      locations[currentLocation].views[currentView]?.svg === "none"
        ? null
        : locations[currentLocation].views[currentView]?.svg,
    [currentLocation, currentView, locations]
  );

  if (locations.length === 0) return null;

  return (
    <div
      style={{
        position: "absolute",
        height: "100%",
        width: "100%",
        paddingLeft: "9px",
        paddingRight: "12px",
        zIndex: video ? "-1" : "0"
      }}
    >
      {svg ? (
        <InteractiveFloorplan svg={svg} />
      ) : jpg ? (
        <img
          src={jpg}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          alt="location"
        />
      ) : null}
    </div>
  );
};
