import { Stack } from "@mui/material";
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

export const Desktop = () => {
  const video = useCurrentVideo();
  const type = useCurrentType();
  const currentView = useCurrentView();
  const currentLocation = useCurrentLocation();

  const [requested, setRequested] = useState(false);
  const dispatch = useAppDispatch();
  const { projectId } = useParams();
  useLayoutEffect(() => {
    if (!requested) dispatch(fetchAvailability((projectId as string) ?? "767"));

    setRequested(true);
  }, [dispatch, requested]);

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
        <Locations />
        {currentLocation !== 0 && <AvailabilityFilters />}
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
