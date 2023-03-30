import { Divider, Grid, Stack } from "@mui/material";

import { ReactComponent as HomeIcon } from "../../assets/icons/home.svg";
import { ReactComponent as MenuIcon } from "../../assets/icons/menu.svg";
import { ReactComponent as FilterRemove } from "../../assets/icons/FilterRemove.svg";
import { ReactComponent as DeleteIcon } from "../../assets/icons/delete.svg";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import { Filter } from "./Filter";
import { useMemo, useState } from "react";
import {
  useAppDispatch,
  useCurrentLocation,
  useFilters,
  useFiltersValues,
  useSvgType,
} from "../../hooks";
import {
  setBathrooms,
  setBedrooms,
  setFloorPlanType,
  setLevel,
  cleanFilters,
  setCurrentLocations,
  setCurrentLocationView,
  setSVGType,
} from "../../store/todo-actions";
import { Box } from "@mui/system";
import useMediaQuery from "@mui/material/useMediaQuery";
import { BottomFilters } from "../BottomFilters";

export const Filters = () => {
  const dispatch = useAppDispatch();
  const [shouldClear, setShouldClear] = useState(false);

  const svgType = useSvgType();

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

  const handleClick = () => {
    svgType === "2d" && dispatch(setSVGType("3d"));
    dispatch(setCurrentLocations(0));
    dispatch(setCurrentLocationView(0));
  };

  const currentLocation = useCurrentLocation();
  const mobile = useMediaQuery("(max-width:600px)");
  const [openMenu, setOpenMenu] = useState(false);
  let myDocument: any = document.documentElement;
  let btn: any = document.getElementById("btn");

  btn?.addEventListener("click", () => {
    if (myDocument.requestFullscreen) {
      myDocument.requestFullscreen();
    } else if (myDocument.msRequestFullscreen) {
      myDocument.msRequestFullscreen();
    } else if (myDocument.mozRequestFullscreen) {
      myDocument.mozRequestFullscreen();
    } else if (myDocument.webkitRequestFullscreen) {
      myDocument.webkitRequestFullscreen();
    }
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  });
  return (
    <>
      {!mobile && (
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            height: 48,
            backgroundColor: currentLocation !== 0 ? "#000000" : "transparent",
            padding: "0px 23px",
            position: "absolute",
            top: "0",
            zIndex: "10",
          }}
        >
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            alignContent="center"
          >
            <Box
              sx={{
                color: "white",
                cursor: "pointer",
                marginRight: "10px",
                width: "32px",
                height: "32px",
              }}
              onClick={handleClick}
            >
              <HomeIcon
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
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
          <div style={{ display: "flex" }}>
            {currentLocation !== 0 && <BottomFilters />}
            <button
              id="btn"
              style={{
                padding: "4px",
                display: "flex",
                alignItems: "center",
                backgroundColor: "rgba(0, 0, 0, 0.4)",
                borderRadius: "16px",
                border: "none",
                outline: "none",
                cursor: "pointer",
              }}
            >
              {myDocument.requestFullscreen ? (
                <FullscreenIcon
                  sx={{
                    color: "#fff",
                    "&:hover": {
                      scale: "1.2",
                    },
                  }}
                />
              ) : (
                <DeleteIcon />
              )}
            </button>
          </div>
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
          {currentLocation !== 0 && !openMenu && <BottomFilters />}
        </Grid>
      )}
    </>
  );
};
