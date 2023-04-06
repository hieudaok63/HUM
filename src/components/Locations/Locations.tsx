import { useMemo } from "react";
import {
  useCurrentLocation,
  useCurrentVideo,
  useCurrentView,
  useHideImage,
  useLocations,
  usePastView,
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
  const video = useCurrentVideo();
  const pastView = usePastView();
  const hideImage = useHideImage();

  const svgType = useSvgType();

  const svg = useMemo(
    () =>
      locations[currentLocation]?.views[currentView]?.svg === "none"
        ? null
        : locations[currentLocation]?.views[currentView]?.svg,
    [currentLocation, currentView, locations]
  );

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
      {!svg && jpg}
    </div>
  );
};
