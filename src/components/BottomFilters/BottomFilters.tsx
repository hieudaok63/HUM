import { Button, Chip, Stack } from "@mui/material";

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
        <button
          style={{
            height: "32px",
            borderRadius: "20px",
            width: svgType === "2d" ? "44px" : "58px",
            backgroundColor: svgType === "2d" ? "#B4FFEE" : "#F6F6F6",
            border: `1px solid ${svgType === "2d" ? "#167D77" : "#979797"}`,
            fontWeight: svgType === "2d" ? "700" : "400",
            marginRight: "-24px",
            zIndex: svgType === "2d" ? "1" : "0",
            paddingRight: svgType === "3d" ? "20px" : "6px",
            cursor: "pointer",
          }}
          onClick={onClick2D}
        >
          2D
        </button>
        <button
          style={{
            height: "32px",
            borderRadius: "20px",
            paddingLeft: svgType === "2d" ? "20px" : "6px",
            width: svgType === "3d" ? "44px" : "58px",
            backgroundColor: svgType === "3d" ? "#B4FFEE" : "#F6F6F6",
            border: `1px solid ${svgType === "2d" ? "#167D77" : "#979797"}`,
            fontWeight: svgType === "3d" ? "700" : "400",
            zIndex: svgType === "3d" ? "1" : "0",
            cursor: "pointer",
          }}
          onClick={onClick3D}
        >
          3D
        </button>
      </Stack>
    </Stack>
  );
};
