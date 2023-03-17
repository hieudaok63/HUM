import { useMemo } from "react";
import {
  useCurrentLocation,
  useCurrentVideo,
  useCurrentView,
  useHideImage,
  useLocations,
  usePastView,
} from "../../hooks";
import { InteractiveFloorplan } from "../InteractiveFloorplan";

export const Locations = () => {
  const locations = useLocations();
  const currentLocation = useCurrentLocation();
  const currentView = useCurrentView();
  const video = useCurrentVideo();
  const pastView = usePastView();
  const hideImage = useHideImage();

  const jpg = useMemo(
    () =>
      locations[currentLocation]?.views[currentView]?.jpg === "none" ? null : (
        <img
          src={
            video
              ? locations[currentLocation]?.views[pastView]?.jpg
              : locations[currentLocation]?.views[currentView]?.jpg
          }
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          alt="location"
        />
      ),
    [currentLocation, currentView, locations, pastView, video]
  );

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
        // backgroundImage: `url(${locations[currentLocation]?.views[currentView]?.jpg})`,
        // backgroundSize: "cover",
        // backgroundRepeat: "no-repeat",
        transition: "all .5s ",
      }}
    >
      {svg ? <InteractiveFloorplan svg={svg} /> : jpg}
    </div>
  );
};
