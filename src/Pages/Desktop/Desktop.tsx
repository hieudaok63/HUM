import { Box, CircularProgress, Stack } from "@mui/material";
import { Filters, AvailabilityFilters, Locations } from "../../components";
import { NavigationArrows } from "../../components/NavigationArrows";
import { Video } from "../../components/Video";
import { useCurrentType, useCurrentVideo, useSVGImage } from "../../hooks";

export const Desktop = () => {
  const svgImage = useSVGImage();
  const video = useCurrentVideo();
  const type = useCurrentType();

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
