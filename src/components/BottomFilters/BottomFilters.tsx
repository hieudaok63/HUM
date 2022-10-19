import { Chip, Stack, Tab, Tabs } from "@mui/material";
import { ReactComponent as LayoutIcon } from "../../assets/icons/layout.svg";
import { ReactComponent as CubeIcon } from "../../assets/icons/cube.svg";
import { useAppDispatch, useStage, useSvgType } from "../../hooks";
import {
  cleanFilters,
  cleanLevels,
  setStage,
  setSVGType
} from "../../store/todo-actions";

export const BottomFilters = () => {
  const dispatch = useAppDispatch();
  const svgType = useSvgType();
  const stage = useStage();
  const onClick2D = () => {
    dispatch(setSVGType("2D"));
    dispatch(cleanFilters());
    dispatch(cleanLevels(0));
  };
  const onClick3D = () => {
    dispatch(setSVGType("3D"));
    dispatch(cleanFilters());
    dispatch(cleanLevels(null));
  };
  return (
    <Stack
      direction="row"
      spacing={6}
      sx={{ paddingLeft: "24px", paddingBottom: "32px" }}
    >
      <Stack direction="row" spacing={4} alignItems="end">
        <Chip
          sx={{
            width: 72,
            backgroundColor: "#F6F6F6",
            border: `1px solid ${svgType === "2D" ? "#3948FF" : "#E4E4E7"}`
          }}
          label={"2D"}
          deleteIcon={<LayoutIcon />}
          onDelete={onClick2D}
          onClick={onClick2D}
        />
        <Chip
          sx={{
            width: 72,
            backgroundColor: "#F6F6F6",
            border: `1px solid ${svgType === "3D" ? "#3948FF" : "#E4E4E7"}`
          }}
          label={"3D"}
          deleteIcon={<CubeIcon />}
          onDelete={onClick3D}
          onClick={onClick3D}
        />
      </Stack>
      {svgType === "3D" && (
        <Tabs
          value={stage}
          onChange={(_: React.SyntheticEvent, newValue: string) => {
            dispatch(setStage(newValue));
          }}
          sx={{ height: "25px", paddingTop: "0px" }}
        >
          <Tab label="Etapa 1" value={"etapa-1"} sx={{ padding: "0px" }} />
          <Tab label="Etapa 2" value={"etapa-2"} sx={{ padding: "0px" }} />
        </Tabs>
      )}
    </Stack>
  );
};
