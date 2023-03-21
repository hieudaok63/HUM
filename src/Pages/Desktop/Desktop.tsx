import { Stack, useMediaQuery } from "@mui/material";
import { useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Filters, AvailabilityFilters, Locations } from "../../components";
import { NavigationArrows } from "../../components/NavigationArrows";
import { Video } from "../../components/Video";
import {
  useAppDispatch,
  useCurrentLocation,
  useCurrentType,
  useCurrentVideo,
  useCurrentView,
} from "../../hooks";
import { fetchAvailability } from "../../store/todo-actions";
import { ReactComponent as ZoomInIcon } from "../../assets/icons/zoomin.svg";
import { ReactComponent as ZoomOutIcon } from "../../assets/icons/zoomout.svg";
import { ReactComponent as MoveIcon } from "../../assets/icons/Move.svg";

export const Desktop = () => {
  const video = useCurrentVideo();
  const type = useCurrentType();
  const currentView = useCurrentView();
  const currentLocation = useCurrentLocation();

  const [requested, setRequested] = useState(false);
  const dispatch = useAppDispatch();
  const { projectId } = useParams();
  const [scale, setScale] = useState<number>(1);
  const scaleZoom = scale.toFixed(1);

  useLayoutEffect(() => {
    if (!requested) dispatch(fetchAvailability((projectId as string) ?? "767"));

    setRequested(true);
  }, [dispatch, requested]);

  const handleZoomIn = () => setScale(scale + 0.1);

  const handleZoomOut = () => scale > 1 && setScale(scale - 0.1);

  const handleReset = () => setScale(1);
  const mobile = useMediaQuery("(max-width:600px)");

  return (
    <Stack
      sx={{
        height: "100%",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <Filters />
      <Stack
        alignItems="center"
        sx={{
          height: "100%",
          width: "100%",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {video && <Video src={video} type={type} />}
        <Locations scaleZoom={scaleZoom} />
        {currentLocation !== 0 && <AvailabilityFilters />}

        {currentLocation !== 0 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              position: "fixed",
              width: "100px",
              bottom: mobile ? "80px" : "40px",
              right: mobile ? "0px" : "50px",
              flexDirection: mobile ? "column" : "row",
            }}
          >
            <div
              onClick={handleZoomIn}
              style={{
                cursor: "pointer",
              }}
            >
              <ZoomInIcon />
            </div>

            <div
              style={{
                margin: mobile ? "16px 0" : "0 20px",
                cursor: "pointer",
              }}
              onClick={handleZoomOut}
            >
              <ZoomOutIcon />
            </div>

            <div
              onClick={handleReset}
              style={{
                cursor: "pointer",
              }}
            >
              <MoveIcon />
            </div>
          </div>
        )}

        {currentLocation !== 0 && currentView !== 0 && (
          <NavigationArrows position="left" disabled={false} />
        )}
        {currentLocation !== 0 && (
          <NavigationArrows position="right" disabled={false} />
        )}
      </Stack>
    </Stack>
  );
};
