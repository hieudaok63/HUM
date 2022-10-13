import { Chip, Stack } from "@mui/material";
import { ReactComponent as LayoutIcon } from "../../assets/icons/layout.svg";
import { ReactComponent as CubeIcon } from "../../assets/icons/cube.svg";
import { useAppDispatch, useSvgType } from "../../hooks";
import { setSVGType } from "../../store/todo-actions";

export const BottomFilters = () => {
  const dispatch = useAppDispatch();
  const svgType = useSvgType();
  return (
    <Stack
      direction="row"
      spacing={4}
      sx={{ paddingLeft: "24px", paddingBottom: "32px" }}
    >
      <Chip
        sx={{
          width: 72,
          backgroundColor: "#F6F6F6",
          border: `1px solid ${svgType === "2D" ? "#3948FF" : "#E4E4E7"}`
        }}
        label={"2D"}
        deleteIcon={<LayoutIcon />}
        onDelete={() => {}}
        onClick={() => dispatch(setSVGType("2D"))}
      />
      <Chip
        sx={{
          width: 72,
          backgroundColor: "#F6F6F6",
          border: `1px solid ${svgType === "3D" ? "#3948FF" : "#E4E4E7"}`
        }}
        label={"3D"}
        deleteIcon={<CubeIcon />}
        onDelete={() => {}}
        onClick={() => dispatch(setSVGType("3D"))}
      />
    </Stack>
  );
};
