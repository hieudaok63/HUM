import { useCallback, useMemo } from "react";
import { Avatar } from "@mui/material";
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
import SubdirectoryArrowLeftIcon from "@mui/icons-material/SubdirectoryArrowLeft";
import {
  useAppDispatch,
  useCurrentLoading,
  useCurrentLocation,
  useCurrentView,
  useLocations,
} from "../../hooks";
import {
  setCurrentLocations,
  setCurrentLocationView,
  setCurrentVideo,
} from "../../store/todo-actions";

interface Props {
  position: "left" | "right";
  disabled: boolean;
}

export const NavigationArrows = ({ position, disabled }: Props) => {
  const dispatch = useAppDispatch();
  const currentLocation = useCurrentLocation();
  const currentView = useCurrentView();
  const locations = useLocations();
  const prevLocation = useCallback(() => {
    const newLocation =
      currentLocation === 0 ? locations.length - 1 : currentLocation - 1;

    const lastLocationIndex = locations.length - 1;
    const lastViewIndex = locations[newLocation].views.length - 1;
    if (currentView === 0 && currentLocation > 0) {
      dispatch(
        setCurrentVideo(
          locations[currentLocation].views[currentView].videoBack === "none"
            ? null
            : locations[currentLocation].views[currentView].videoBack,
          "forward"
        )
      );
      setTimeout(() => {
        dispatch(setCurrentLocations(newLocation));
      }, 500);
      setTimeout(() => {
        dispatch(setCurrentLocationView(lastViewIndex));
      }, 500);
      return;
    }
    if (currentLocation === 0) {
      setTimeout(() => {
        dispatch(setCurrentLocations(lastLocationIndex));
      }, 500);
      setTimeout(() => {
        dispatch(setCurrentLocationView(lastViewIndex));
      }, 500);
      return;
    }
    dispatch(
      setCurrentVideo(
        locations[currentLocation].views[currentView].videoBack === "none"
          ? null
          : locations[currentLocation].views[currentView].videoBack,
        "forward"
      )
    );
    setTimeout(() => {
      dispatch(setCurrentLocationView(currentView - 1));
    }, 500);
  }, [currentLocation, currentView, dispatch, locations]);

  const nextLocation = useCallback(() => {
    const lastLocationIndex = locations.length - 1;
    const lastViewIndex = locations[currentLocation].views.length - 1;
    if (lastViewIndex === currentView && lastLocationIndex > currentLocation) {
      dispatch(
        setCurrentVideo(
          locations[currentLocation].views[currentView].video === "none"
            ? null
            : locations[currentLocation].views[currentView].video,
          "forward"
        )
      );
      dispatch(setCurrentLocations(currentLocation + 1));
      dispatch(setCurrentLocationView(0));
      return;
    }
    if (lastViewIndex > currentView) {
      dispatch(
        setCurrentVideo(
          locations[currentLocation].views[currentView].video === "none"
            ? null
            : locations[currentLocation].views[currentView].video,
          "forward"
        )
      );
      dispatch(setCurrentLocationView(currentView + 1));
      return;
    }
    if (currentLocation === lastLocationIndex) {
      dispatch(setCurrentLocations(0));
      dispatch(setCurrentLocationView(0));
      return;
    }
    if (currentView === lastViewIndex) {
      dispatch(
        setCurrentVideo(
          locations[currentLocation].views[currentView].video === "none"
            ? null
            : locations[currentLocation].views[currentView].video,
          "forward"
        )
      );
      setTimeout(() => {
        dispatch(setCurrentLocations(currentLocation + 1));
      }, 500);
      setTimeout(() => {
        dispatch(setCurrentLocationView(0));
      }, 500);
      return;
    }
  }, [currentLocation, currentView, dispatch, locations]);

  const arrow = useMemo(
    () =>
      position === "left" ? (
        <SubdirectoryArrowLeftIcon
          sx={{
            transform: "rotate(90deg)",
            paddingRight: "2px",
          }}
          onClick={prevLocation}
        />
      ) : (
        <SubdirectoryArrowRightIcon
          sx={{ transform: "rotate(-90deg)", paddingLeft: "2px" }}
          onClick={nextLocation}
        />
      ),
    [nextLocation, position, prevLocation]
  );

  const sx = useMemo(
    () =>
      position === "left"
        ? {
            left: "15px",
          }
        : {
            right: "15px",
          },
    [position]
  );

  return (
    <Avatar
      sx={{
        bgcolor: disabled ? "rgb(168, 168, 168)" : "rgb(74, 177, 189)",
        position: "absolute",
        cursor: disabled ? "default" : "pointer",
        top: "0",
        bottom: "0",
        margin: "auto 0",
        "&:hover": {
          opacity: 0.8,
        },
        ...sx,
      }}
      onClick={position === "left" ? prevLocation : nextLocation}
    >
      {arrow}
    </Avatar>
  );
};
