import { Chip, Stack } from "@mui/material";

import { useAppDispatch, useSvgType } from "../../hooks";
import { setSVGType } from "../../store/todo-actions";

export const BottomFilters = () => {
  const dispatch = useAppDispatch();
  const svgType = useSvgType();
  const onClick2D = () => {
    dispatch(setSVGType("2d"));
  };
  const onClick3D = () => {
    dispatch(setSVGType("3d"));
  };
  return (
    <Stack direction="row" spacing={6}>
      <Stack direction="row" alignItems="end">
        <Chip
          sx={{
            width: svgType === "2d" ? "44px" : "66px",
            backgroundColor: svgType === "2d" ? "#B4FFEE" : "#F6F6F6",
            border: `1px solid ${svgType === "2d" ? "#167D77" : "#979797"}`,
            fontWeight: svgType === "2d" ? "700" : "400",
            marginRight: "-24px",
            zIndex: svgType === "2d" ? "1000" : "0",
            "&:hover": {
              opacity: "0.8",
              backgroundColor: svgType === "2d" ? "#B4FFEE" : "#F6F6F6",
            },
          }}
          label={"2D"}
          onClick={onClick2D}
        />
        <Chip
          sx={{
            width: svgType === "3d" ? "44px" : "66px",
            backgroundColor: svgType === "3d" ? "#B4FFEE" : "#F6F6F6",
            border: `1px solid ${
              svgType === "3d" ? "#167D77 !important" : "#979797"
            }`,
            fontWeight: svgType === "3d" ? "700" : "400",
            zIndex: svgType === "3d" ? "1000" : "0",
            "&:hover": {
              opacity: "0.8",
              backgroundColor: svgType === "3d" ? "#B4FFEE" : "#F6F6F6",
            },
          }}
          label={"3D"}
          onClick={onClick3D}
        />
      </Stack>
    </Stack>
  );
};
