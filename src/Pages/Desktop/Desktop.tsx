import { Box, CircularProgress, Stack } from "@mui/material";
import {
  Filters,
  InteractiveFloorplan,
  AvailabilityFilters,
  BottomFilters
} from "../../components";
import { useSVGImage } from "../../hooks";

export const Desktop = () => {
  const svgImage = useSVGImage();

  return !svgImage ? (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        width: "100%",
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
        justifyItems: "center"
      }}
    >
      <CircularProgress sx={{ color: "#3948FF" }} />
    </Box>
  ) : (
    <Stack
      sx={{
        height: "100%",
        width: "100%",
        overflow: "hidden"
      }}
    >
      <Filters />
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          height: "100%",
          width: "100%",
          overflow: "hidden"
        }}
      >
        <InteractiveFloorplan />
        <AvailabilityFilters />
      </Stack>
      <BottomFilters />
    </Stack>
  );
};
