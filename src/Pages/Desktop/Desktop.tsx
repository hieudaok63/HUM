import { Box, CircularProgress, Stack } from "@mui/material";
import { useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Filters,
  AvailabilityFilters,
  Locations,
  HandleZoom,
} from "../../components";
import { NavigationArrows } from "../../components/NavigationArrows";
import { Video } from "../../components/Video";
import {
  useAppDispatch,
  useCurrentLocation,
  useCurrentType,
  useCurrentVideo,
  useProjectId,
  useSvgType,
} from "../../hooks";

import { fetchAvailability } from "../../store/todo-actions";

export const Desktop = () => {
  const svgType = useSvgType();
  const video = useCurrentVideo();
  const type = useCurrentType();
  const currentLocation = useCurrentLocation();
  const [scale, setScale] = useState<number>(1);
  const scaleZoom = scale.toFixed(1);
  const handleZoomIn = () => setScale(scale + 0.1);
  const handleZoomOut = () => scale > 1 && setScale(scale - 0.1);
  const handleReset = () => setScale(1);
  const [requested, setRequested] = useState(false);
  const dispatch = useAppDispatch();
  const { projectId } = useParams();

  useLayoutEffect(() => {
    if (!requested) dispatch(fetchAvailability((projectId as string) ?? "767"));
    setRequested(true);
  }, [dispatch, requested, projectId]);

  const projectLoading = useProjectId();

  return !projectLoading ? (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        width: "100%",
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
        justifyItems: "center",
      }}
    >
      <CircularProgress sx={{ color: "#3948FF" }} />
    </Box>
  ) : (
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

        <HandleZoom
          handleZoomIn={handleZoomIn}
          handleZoomOut={handleZoomOut}
          handleReset={handleReset}
        />
        {currentLocation !== 0 && svgType === "3d" && (
          <NavigationArrows position="left" disabled={false} />
        )}
        {currentLocation !== 0 && svgType === "3d" && (
          <NavigationArrows position="right" disabled={false} />
        )}
      </Stack>
    </Stack>
  );
};
