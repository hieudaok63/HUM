import { Box, CircularProgress, Stack } from "@mui/material";
import { useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Filters, AvailabilityFilters, Locations } from "../../components";
import { NavigationArrows } from "../../components/NavigationArrows";
import { Video } from "../../components/Video";
import {
  useAppDispatch,
  useCurrentType,
  useCurrentVideo,
  useSVGImage,
} from "../../hooks";
import { fetchAvailability } from "../../store/todo-actions";

export const Desktop = () => {
  const svgImage = useSVGImage();
  const video = useCurrentVideo();
  const type = useCurrentType();

  const [requested, setRequested] = useState(false);
  const dispatch = useAppDispatch();
  const { projectId } = useParams();
  useLayoutEffect(() => {
    if (!requested) dispatch(fetchAvailability((projectId as string) ?? "767"));

    setRequested(true);
  }, [dispatch, requested]);

  return !svgImage ? (
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
        height: {
          xl: "100%",
          lg: "120%",
        },
        width: "100%",
        overflow: "hidden",
      }}
    >
      <Filters />
      <Stack
        alignItems="center"
        sx={{
          height: {
            xl: "100%",
            lg: "80%",
          },
          width: "100%",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {video && <Video src={video} type={type} />}
        <Locations />
        <AvailabilityFilters />
        <NavigationArrows position="left" disabled={false} />
        <NavigationArrows position="right" disabled={false} />
      </Stack>
    </Stack>
  );
};
