import {
  Divider,
  Grid,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Bed from "@mui/icons-material/HotelOutlined";
import { ReactComponent as BathroomIcon } from "../../assets/icons/bathroom.svg";
import { ReactComponent as FloorplanIcon } from "../../assets/icons/floorplan.svg";
import { ReactComponent as LevelsIcon } from "../../assets/icons/levels.svg";
import { Filter } from "./Filter";
import { useMemo, useState } from "react";
import { useAppDispatch, useFilters, useFiltersValues } from "../../hooks";
import {
  setBathrooms,
  setBedrooms,
  setFloorPlanType,
  setLevel,
  cleanFilters,
  setCurrentLocations,
  setCurrentLocationView,
} from "../../store/todo-actions";
import { Box } from "@mui/system";

export const Filters = () => {
  const dispatch = useAppDispatch();
  const [shouldClear, setShouldClear] = useState(false);
  const [toggle, setToggle] = useState("3d");
  const {
    bedrooms: bedroomsOptions,
    bathrooms: bathroomOptions,
    floorplanTypes: floorplanTypesOptions,
    levels,
  } = useFilters();
  const [bedroomFilter, bathroomFilter, floorplanFilter, levelFilter] =
    useFiltersValues();

  const bedroomIndex = useMemo(
    () =>
      bedroomsOptions.findIndex(
        (bedroom: { value: number }) => bedroom.value === bedroomFilter
      ),
    [bedroomFilter, bedroomsOptions]
  );

  const bathroomIndex = useMemo(
    () =>
      bathroomOptions.findIndex(
        (bathroom: { value: number }) => bathroom.value === bathroomFilter
      ),
    [bathroomFilter, bathroomOptions]
  );

  const floorplanIndex = useMemo(
    () =>
      floorplanTypesOptions.findIndex(
        (floorplan: { value: string }) => floorplan.value === floorplanFilter
      ),
    [floorplanFilter, floorplanTypesOptions]
  );

  const levelIndex = useMemo(
    () =>
      levels.findIndex(
        (level: { value: number }) => level.value.toString() === levelFilter
      ),
    [levelFilter, levels]
  );

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newToggle: string
  ) => {
    setToggle(newToggle);
  };

  const handleClick = () => {
    dispatch(setCurrentLocations(0));
    dispatch(setCurrentLocationView(0));
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        height: 56,
        backgroundColor: "#000000",
        padding: "0px 23px",
        cursor: "pointer",
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        alignContent="center"
      >
        <Box sx={{ color: "white" }}>
          <p onClick={handleClick}>home</p>
        </Box>
        <Filter
          key={"level"}
          text="Nivel"
          options={levels}
          index={levelIndex}
          startIcon={<LevelsIcon />}
          onChange={(event) => dispatch(setLevel(event.value))}
          shouldClear={shouldClear}
          resetShouldClear={() => {
            setShouldClear(false);
          }}
        />
        <Divider
          orientation="vertical"
          variant="middle"
          sx={{ backgroundColor: "#ffffff", height: 32 }}
        />
        <Filter
          key={"bedrooms"}
          text="Recámaras"
          options={bedroomsOptions}
          index={bedroomIndex}
          startIcon={<Bed style={{ color: "white", width: 18, height: 18 }} />}
          onChange={(event) => dispatch(setBedrooms(event.value))}
          shouldClear={shouldClear}
          resetShouldClear={() => {
            setShouldClear(false);
          }}
        />
        <Filter
          key={"bathrooms"}
          text="Baños"
          index={bathroomIndex}
          options={bathroomOptions}
          startIcon={<BathroomIcon />}
          onChange={(event) => dispatch(setBathrooms(event.value))}
          shouldClear={shouldClear}
          resetShouldClear={() => {
            setShouldClear(false);
          }}
        />
        <Filter
          key={"floorplan"}
          text="Planta Tipo"
          options={floorplanTypesOptions}
          index={floorplanIndex}
          startIcon={<FloorplanIcon />}
          onChange={(event) => dispatch(setFloorPlanType(event.value))}
          shouldClear={shouldClear}
          resetShouldClear={() => {
            setShouldClear(false);
          }}
        />
        <h3
          style={{
            color: "white",
            fontWeight: 700,
            fontSize: 14,
          }}
        >
          Filtros
        </h3>
        <HighlightOffIcon
          sx={{ color: "#B1AEAE", width: 18, height: 18, cursor: "pointer" }}
          onClick={() => {
            setShouldClear(true);
            dispatch(cleanFilters());
          }}
        />
      </Stack>
      <Box>
        <ToggleButtonGroup
          exclusive
          aria-label="Platform"
          onChange={handleChange}
          value={toggle}
          color="primary"
          sx={{
            borderRadius: "18px",
            width: "82px",
            height: "28px",
            backgroundColor: "#ffffff",
          }}
        >
          <ToggleButton
            value="2d"
            sx={{
              borderRadius: "18px",
              color: "#000000",
              fontWeight: toggle === "2d" ? "600" : "unset",
            }}
          >
            2D
          </ToggleButton>
          <ToggleButton
            value="3d"
            sx={{
              borderRadius: "18px",
              color: "#000000",
              fontWeight: toggle === "3d" ? "600" : "unset",
            }}
          >
            3D
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
    </Grid>
  );
};
