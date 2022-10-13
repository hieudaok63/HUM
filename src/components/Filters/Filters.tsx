import { Divider, Grid, Stack } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Bed from "@mui/icons-material/HotelOutlined";
import Coin from "@mui/icons-material/MonetizationOnOutlined";
import { ReactComponent as BathroomIcon } from "../../assets/icons/bathroom.svg";
import { ReactComponent as AreaIcon } from "../../assets/icons/area.svg";
import { ReactComponent as FloorplanIcon } from "../../assets/icons/floorplan.svg";
import { ReactComponent as LevelsIcon } from "../../assets/icons/levels.svg";
import { Filter } from "./Filter";
import { useState } from "react";
import { useAppDispatch, useFilters } from "../../hooks";
import {
  setAreas,
  setBathrooms,
  setBedrooms,
  setFloorPlanType,
  setPrices,
  setLevel,
  cleanFilters
} from "../../store/todo-actions";

export const Filters = () => {
  const dispatch = useAppDispatch();
  const [shouldClear, setShouldClear] = useState(false);
  const [
    bedroomsOptions,
    bathroomOptions,
    floorplanTypesOptions,
    priceOptions,
    areaOptions,
    levels
  ] = useFilters();

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ height: 56, backgroundColor: "#000000", padding: "0px 23px" }}
    >
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        alignContent="center"
      >
        <h3
          style={{
            color: "white",
            fontWeight: 700,
            fontSize: 14
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
        <Divider
          orientation="vertical"
          variant="middle"
          sx={{ backgroundColor: "#ffffff", height: 32 }}
        />
        <Filter
          text="Recámaras"
          options={bedroomsOptions}
          startIcon={<Bed style={{ color: "white", width: 18, height: 18 }} />}
          onChange={(event) => dispatch(setBedrooms(event.value))}
          shouldClear={shouldClear}
          resetShouldClear={() => {
            setShouldClear(false);
          }}
        />
        <Filter
          text="Baños"
          options={bathroomOptions}
          startIcon={<BathroomIcon />}
          onChange={(event) => dispatch(setBathrooms(event.value))}
          shouldClear={shouldClear}
          resetShouldClear={() => {
            setShouldClear(false);
          }}
        />
        <Filter
          text="Precio"
          options={priceOptions}
          startIcon={<Coin style={{ color: "white", width: 18, height: 18 }} />}
          onChange={(event) => dispatch(setPrices(event.value))}
          shouldClear={shouldClear}
          resetShouldClear={() => {
            setShouldClear(false);
          }}
        />
        <Filter
          text="Área"
          options={areaOptions}
          startIcon={<AreaIcon />}
          onChange={(event) => dispatch(setAreas(event.value))}
          shouldClear={shouldClear}
          resetShouldClear={() => {
            setShouldClear(false);
          }}
        />
        <Filter
          text="Planta Tipo"
          options={floorplanTypesOptions}
          startIcon={<FloorplanIcon />}
          onChange={(event) => dispatch(setFloorPlanType(event.value))}
          shouldClear={shouldClear}
          resetShouldClear={() => {
            setShouldClear(false);
          }}
        />
        <Filter
          text="Nivel"
          options={levels}
          startIcon={<LevelsIcon />}
          onChange={(event) => dispatch(setLevel(event.value))}
          shouldClear={shouldClear}
          resetShouldClear={() => {
            setShouldClear(false);
          }}
        />
      </Stack>
    </Grid>
  );
};
