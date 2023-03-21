import {
  Divider,
  Grid,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

import { ReactComponent as HomeIcon } from "../../assets/icons/home.svg";
import { ReactComponent as MenuIcon } from "../../assets/icons/menu.svg";
import { ReactComponent as FilterRemove } from "../../assets/icons/FilterRemove.svg";
import { ReactComponent as DeleteIcon } from "../../assets/icons/delete.svg";
import { Filter } from "./Filter";
import { useMemo, useState } from "react";
import {
  useAppDispatch,
  useCurrentLocation,
  useFilters,
  useFiltersValues,
} from "../../hooks";
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
import useMediaQuery from "@mui/material/useMediaQuery";

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

  const currentLocation = useCurrentLocation();
  const mobile = useMediaQuery("(max-width:600px)");
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <>
      {!mobile && (
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
            <Box
              sx={{ color: "white", cursor: "pointer", marginRight: "10px" }}
              onClick={handleClick}
            >
              <HomeIcon />
            </Box>
            {currentLocation !== 0 && (
              <>
                <Filter
                  key={"level"}
                  text="Level"
                  options={levels}
                  index={levelIndex}
                  onChange={(event) => dispatch(setLevel(event.value))}
                  shouldClear={shouldClear}
                  resetShouldClear={() => {
                    setShouldClear(false);
                  }}
                />

                <Filter
                  key={"bedrooms"}
                  text="Bedrooms / Baths"
                  options={bedroomsOptions}
                  index={bedroomIndex}
                  onChange={(event) => dispatch(setBedrooms(event.value))}
                  shouldClear={shouldClear}
                  resetShouldClear={() => {
                    setShouldClear(false);
                  }}
                />
                <Filter
                  key={"bathrooms"}
                  text="Phase"
                  index={bathroomIndex}
                  options={bathroomOptions}
                  onChange={(event) => dispatch(setBathrooms(event.value))}
                  shouldClear={shouldClear}
                  resetShouldClear={() => {
                    setShouldClear(false);
                  }}
                />
                <Filter
                  key={"floorplan"}
                  text="Floorplan"
                  options={floorplanTypesOptions}
                  index={floorplanIndex}
                  onChange={(event) => dispatch(setFloorPlanType(event.value))}
                  shouldClear={shouldClear}
                  resetShouldClear={() => {
                    setShouldClear(false);
                  }}
                />
                <Filter
                  key={"floorplan"}
                  text="Price"
                  options={floorplanTypesOptions}
                  index={floorplanIndex}
                  onChange={(event) => dispatch(setFloorPlanType(event.value))}
                  shouldClear={shouldClear}
                  resetShouldClear={() => {
                    setShouldClear(false);
                  }}
                />

                <Filter
                  key={"floorplan"}
                  text="Area"
                  options={floorplanTypesOptions}
                  index={floorplanIndex}
                  onChange={(event) => dispatch(setFloorPlanType(event.value))}
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
                <h3
                  style={{
                    color: "white",
                    fontWeight: 700,
                    fontSize: 14,
                  }}
                >
                  Filters
                </h3>
                <div style={{ cursor: "pointer" }}>
                  <FilterRemove
                    onClick={() => {
                      setShouldClear(true);
                      dispatch(cleanFilters());
                    }}
                  />
                </div>
              </>
            )}
          </Stack>
          {currentLocation !== 0 && (
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
          )}
        </Grid>
      )}
      {mobile && (
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            height: 56,
            backgroundColor: "#000000",
            cursor: "pointer",
          }}
        >
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            alignContent="center"
          >
            {!openMenu && (
              <Box
                sx={{ color: "white", paddingLeft: "10px" }}
                onClick={handleClick}
              >
                <HomeIcon />
              </Box>
            )}
          </Stack>
          {
            <>
              {currentLocation !== 0 && (
                <div
                  onClick={() => {
                    setOpenMenu(true);
                  }}
                >
                  {!openMenu ? (
                    <MenuIcon />
                  ) : (
                    <div
                      onClick={() => {
                        setShouldClear(true);
                        dispatch(cleanFilters());
                        setOpenMenu(true);
                      }}
                      style={{
                        marginTop: "12px",
                      }}
                    >
                      <FilterRemove />
                    </div>
                  )}
                </div>
              )}
              {currentLocation !== 0 && openMenu && (
                <span
                  style={{
                    color: "white",
                    fontSize: "26px",
                    position: "relative",
                    right: "26px",
                    top: "4px",
                  }}
                  onClick={() => {
                    setOpenMenu(false);
                  }}
                >
                  <DeleteIcon />
                </span>
              )}
              {openMenu && (
                <div
                  style={{
                    marginTop: "15px",
                    backgroundColor: "#000",
                    zIndex: "100",
                    width: "100%",
                    minHeight: "900px",
                  }}
                >
                  <Divider
                    orientation="horizontal"
                    sx={{ backgroundColor: "#ffffff", height: 1 }}
                  />
                  <Filter
                    key={"level"}
                    text="Level"
                    options={levels}
                    index={levelIndex}
                    onChange={(event) => dispatch(setLevel(event.value))}
                    shouldClear={shouldClear}
                    resetShouldClear={() => {
                      setShouldClear(false);
                    }}
                  />
                  <Divider
                    orientation="horizontal"
                    sx={{ backgroundColor: "#ffffff", height: 1 }}
                  />
                  <Filter
                    key={"bedrooms"}
                    text="Bedrooms / Baths"
                    options={bedroomsOptions}
                    index={bedroomIndex}
                    onChange={(event) => dispatch(setBedrooms(event.value))}
                    shouldClear={shouldClear}
                    resetShouldClear={() => {
                      setShouldClear(false);
                    }}
                  />
                  <Divider
                    orientation="horizontal"
                    sx={{ backgroundColor: "#ffffff", height: 1 }}
                  />
                  <Filter
                    key={"bathrooms"}
                    text="Phase"
                    index={bathroomIndex}
                    options={bathroomOptions}
                    onChange={(event) => dispatch(setBathrooms(event.value))}
                    shouldClear={shouldClear}
                    resetShouldClear={() => {
                      setShouldClear(false);
                    }}
                  />
                  <Divider
                    orientation="horizontal"
                    sx={{ backgroundColor: "#ffffff", height: 1 }}
                  />
                  <Filter
                    key={"floorplan"}
                    text="Floorplan"
                    options={floorplanTypesOptions}
                    index={floorplanIndex}
                    onChange={(event) =>
                      dispatch(setFloorPlanType(event.value))
                    }
                    shouldClear={shouldClear}
                    resetShouldClear={() => {
                      setShouldClear(false);
                    }}
                  />
                  <Divider
                    orientation="horizontal"
                    sx={{ backgroundColor: "#ffffff", height: 1 }}
                  />
                  <Filter
                    key={"bedrooms"}
                    text="Price"
                    options={bedroomsOptions}
                    index={bedroomIndex}
                    onChange={(event) => dispatch(setBedrooms(event.value))}
                    shouldClear={shouldClear}
                    resetShouldClear={() => {
                      setShouldClear(false);
                    }}
                  />
                  <Divider
                    orientation="horizontal"
                    sx={{ backgroundColor: "#ffffff", height: 1 }}
                  />
                  <Filter
                    key={"bedrooms"}
                    text="Area"
                    options={bedroomsOptions}
                    index={bedroomIndex}
                    onChange={(event) => dispatch(setBedrooms(event.value))}
                    shouldClear={shouldClear}
                    resetShouldClear={() => {
                      setShouldClear(false);
                    }}
                  />
                  <Divider
                    orientation="horizontal"
                    sx={{ backgroundColor: "#ffffff", height: 1 }}
                  />
                </div>
              )}
            </>
          }
          {currentLocation !== 0 && !openMenu && (
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
                  marginRight: "10px",
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
          )}
        </Grid>
      )}
    </>
  );
};
