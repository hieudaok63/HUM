import { useMemo } from "react";
import {
  useCurrentLocation,
  useCurrentVideo,
  useCurrentView,
  useLocations,
  usePastView,
  useSvgType,
} from "../../hooks";
import { InteractiveFloorplan } from "../InteractiveFloorplan";
import { InteractiveFloorplan2D } from "../InteractiveFloorplan2D";
import { ReactComponent as OkunIcon } from "../../assets/icons/okun.svg";
import { ReactComponent as LaHausIcon } from "../../assets/icons/lahaus.svg";
import { useMediaQuery } from "@mui/material";
interface IScale {
  scaleZoom: string;
}

export const Locations = ({ scaleZoom }: IScale) => {
  const locations = useLocations();
  const currentLocation = useCurrentLocation();
  const currentView = useCurrentView();
  const video = useCurrentVideo();
  const pastView = usePastView();
  const svgType = useSvgType();
  const mobile = useMediaQuery("(max-width:1365px)");

  const svg = useMemo(
    () =>
      locations[currentLocation]?.views[currentView]?.svg === "none"
        ? null
        : locations[currentLocation]?.views[currentView]?.svg,
    [currentLocation, currentView, locations]
  );

  const svg2D = useMemo(
    () => "https://athum.com/images-tmp/Okun-2D-Plans-AI-collapse4.svg",
    []
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
        scale: scaleZoom,
        position: "relative",
      }}
    >
      {currentLocation === 0 && (
        <>
          <div
            style={{
              position: "absolute",
              width: "100%",
              top: "4%",
              zIndex: "10",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <OkunIcon
              style={{
                width: !mobile ? "18%" : "30%",
              }}
            />
          </div>
          <div
            style={{
              position: "absolute",
              width: "100%",
              bottom: "5%",
              zIndex: "10",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <LaHausIcon
              style={{
                width: !mobile ? "8%" : "20%",
              }}
            />
          </div>
        </>
      )}

      {svg && svgType === "3d" ? (
        <InteractiveFloorplan svg={svg} />
      ) : (
        <InteractiveFloorplan2D svg={svg2D} />
      )}
    </div>
  );
};
