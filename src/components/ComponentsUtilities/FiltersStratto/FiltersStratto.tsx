import { Divider, Grid, Stack } from "@mui/material";

import { ReactComponent as LogoHome } from "../../../assets/icons/LogoHome.svg";
import { ReactComponent as FilterRemove } from "../../../assets/icons/FilterRemove.svg";
import { FilterStratto } from "./FilterStratto";
import { useMemo, useState } from "react";
import {
  useAppDispatch,
  useFilters,
  useFiltersValues,
  useSvgType,
} from "../../../hooks";
import {
  setBathrooms,
  setBedrooms,
  setFloorPlanType,
  cleanFilters,
  setSVGType,
  setCurrentLocations,
  setCurrentLocationView,
} from "../../../store/todo-actions";
import { Box } from "@mui/system";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";

export const FiltersStratto = () => {
  const dispatch = useAppDispatch();
  const [shouldClear, setShouldClear] = useState(false);

  const svgType = useSvgType();

  const {
    bedrooms: bedroomsOptions,
    bathrooms: bathroomOptions,
    floorplanTypes: floorplanTypesOptions,
  } = useFilters();

  const [bedroomFilter, bathroomFilter, floorplanFilter] = useFiltersValues();

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

  const handleClick = () => {
    svgType === "2d" && dispatch(setSVGType("3d"));
    dispatch(setCurrentLocations(0));
    dispatch(setCurrentLocationView(0));
  };

  const mobile = useMediaQuery("(max-width:1365px)");
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();

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
            backgroundColor: "#000",
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
              <LogoHome
                style={{
                  width: "100%",
                  height: "100%",
                }}
                onClick={() => navigate("/stratto")}
              />
            </Box>
            <>
              <FilterStratto
                key={"bedrooms"}
                text="Bedrooms / Baths"
                options={bedroomsOptions}
                index={bedroomIndex}
                onChange={(event: { value: number }) =>
                  dispatch(setBedrooms(event.value))
                }
                shouldClear={shouldClear}
                resetShouldClear={() => {
                  setShouldClear(false);
                }}
              />
              <FilterStratto
                key={"bathrooms"}
                text="Phase"
                index={bathroomIndex}
                options={bathroomOptions}
                onChange={(event: { value: number }) =>
                  dispatch(setBathrooms(event.value))
                }
                shouldClear={shouldClear}
                resetShouldClear={() => {
                  setShouldClear(false);
                }}
              />
              <FilterStratto
                key={"floorplan"}
                text="Floorplan"
                options={floorplanTypesOptions}
                index={floorplanIndex}
                onChange={(event: { value: string }) =>
                  dispatch(setFloorPlanType(event.value))
                }
                shouldClear={shouldClear}
                resetShouldClear={() => {
                  setShouldClear(false);
                }}
              />
              <FilterStratto
                key={"floorplan"}
                text="Price"
                options={floorplanTypesOptions}
                index={floorplanIndex}
                onChange={(event: { value: string }) =>
                  dispatch(setFloorPlanType(event.value))
                }
                shouldClear={shouldClear}
                resetShouldClear={() => {
                  setShouldClear(false);
                }}
              />

              <FilterStratto
                key={"floorplan"}
                text="Area"
                options={floorplanTypesOptions}
                index={floorplanIndex}
                onChange={(event: { value: string }) =>
                  dispatch(setFloorPlanType(event.value))
                }
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
          </Stack>
        </Grid>
      )}
      {/* {mobile && (
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            height: 56,
            backgroundColor: "#000000",
            cursor: "pointer",
            position: currentLocation === 0 ? "absolute" : "unset",
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
                sx={{
                  color: "white",
                  paddingLeft: "10px",
                  zIndex: "10",
                }}
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
                    minHeight: "1200px",
                  }}
                >
                  <Divider
                    orientation="horizontal"
                    sx={{ backgroundColor: "#ffffff", height: 1 }}
                  />
                  <FilterStratto
                    key={"level"}
                    text="Level"
                    options={levels}
                    index={levelIndex}
                    onChange={(event: { value: number }) =>
                      dispatch(setLevel(event.value))
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
                  <FilterStratto
                    key={"bedrooms"}
                    text="Bedrooms / Baths"
                    options={bedroomsOptions}
                    index={bedroomIndex}
                    onChange={(event: { value: number }) =>
                      dispatch(setBedrooms(event.value))
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
                  <FilterStratto
                    key={"bathrooms"}
                    text="Phase"
                    index={bathroomIndex}
                    options={bathroomOptions}
                    onChange={(event: { value: number }) =>
                      dispatch(setBathrooms(event.value))
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
                  <FilterStratto
                    key={"floorplan"}
                    text="Floorplan"
                    options={floorplanTypesOptions}
                    index={floorplanIndex}
                    onChange={(event: { value: string }) =>
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
                  <FilterStratto
                    key={"bedrooms"}
                    text="Price"
                    options={bedroomsOptions}
                    index={bedroomIndex}
                    onChange={(event: { value: number }) =>
                      dispatch(setBedrooms(event.value))
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
                  <FilterStratto
                    key={"bedrooms"}
                    text="Area"
                    options={bedroomsOptions}
                    index={bedroomIndex}
                    onChange={(event: { value: number }) =>
                      dispatch(setBedrooms(event.value))
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
                </div>
              )}
            </>
          }
          <Stack direction="row">
            {currentLocation !== 0 && !openMenu && <BottomFilters />}
          </Stack>
        </Grid>
      )} */}
    </>
  );
};
