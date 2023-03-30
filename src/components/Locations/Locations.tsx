import { useMemo } from "react";
import {
  useCurrentLocation,
  // useCurrentVideo,
  useCurrentView,
  // useHideImage,
  useLocations,
  // usePastView,
  useSvgType,
} from "../../hooks";
import { InteractiveFloorplan } from "../InteractiveFloorplan";
import { Location2D } from "./Location2D";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useMediaQuery } from "@mui/material";

import { ReactComponent as ZoomInIcon } from "../../assets/icons/zoomin.svg";
import { ReactComponent as ZoomOutIcon } from "../../assets/icons/zoomout.svg";
import { ReactComponent as MoveIcon } from "../../assets/icons/Move.svg";

interface IScale {
  scaleZoom: string;
}

export const Locations = ({ scaleZoom }: IScale) => {
  const locations = useLocations();
  const currentLocation = useCurrentLocation();
  const currentView = useCurrentView();
  // const video = useCurrentVideo();
  // const pastView = usePastView();
  // const hideImage = useHideImage();
  const svgType = useSvgType();
  const mobile = useMediaQuery("(max-width:600px)");

  // const jpg = useMemo(
  //   () =>
  //     locations[currentLocation]?.views[currentView]?.jpg === "none" ? null : (
  //       <img
  //         src={
  //           video
  //             ? locations[currentLocation]?.views[pastView]?.jpg
  //             : locations[currentLocation]?.views[currentView]?.jpg
  //         }
  //         style={{ width: "100%", height: "100%", objectFit: "cover" }}
  //         alt="location"
  //       />
  //     ),
  //   [currentLocation, currentView, locations, pastView, video]
  // );

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
        scale: scaleZoom,
      }}
    >
      {svg && svgType === "3d" ? (
        <InteractiveFloorplan svg={svg} />
      ) : (
        <div
          style={{
            scale: scaleZoom,
            height: "100%",
            width: "100%",
          }}
        >
          <TransformWrapper
            initialScale={1}
            initialPositionX={200}
            initialPositionY={100}
          >
            {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
              <>
                <div
                  className="tools"
                  style={{
                    position: "absolute",
                    bottom: mobile ? "80px" : "25px",
                    right: mobile ? "0px" : svgType === "2d" ? "170px" : "50px",
                    zIndex: "10",
                  }}
                >
                  <div
                    onClick={() => zoomIn()}
                    style={{
                      display: "inline-block",
                      cursor: "pointer",
                      width: "50px",
                      height: "50px",
                    }}
                  >
                    <ZoomInIcon />
                  </div>
                  <div
                    onClick={() => zoomOut()}
                    style={{
                      display: "inline-block",
                      cursor: "pointer",
                      width: "50px",
                      height: "50px",
                    }}
                  >
                    {" "}
                    <ZoomOutIcon />
                  </div>
                  <div
                    onClick={() => resetTransform()}
                    style={{
                      display: "inline-block",
                      cursor: "pointer",
                      width: "50px",
                      height: "50px",
                    }}
                  >
                    <MoveIcon />
                  </div>
                </div>
                <TransformComponent>
                  <Location2D />
                </TransformComponent>
              </>
            )}
          </TransformWrapper>
        </div>
      )}
    </div>
  );
};
