import {
  useAppDispatch,
  useAvailabilityFilter,
  useCurrentLoading,
  useFilters,
  useFiltersValues,
  useLocations,
  useUnits,
} from "../../hooks";
import { ReactSVG } from "react-svg";
import { useCallback, useEffect, useRef, useState } from "react";
import { FloorplanCard } from "../FloorplanCard";
import { ModalFloorplan } from "../ModalFlooplan";
import { Unit } from "../../models/redux-models";
import {
  setCurrentLocations,
  setCurrentLocationView,
} from "../../store/todo-actions";
import {
  Box,
  Chip,
  CircularProgress,
  FormControl,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { setCurrentVideo } from "../../store/todo-actions";
import { setLevel } from "../../store/todo-actions";
import { useTheme } from "@emotion/react";

export const fills: { [key: string]: string } = {
  available: "#B4FFEE",
  reserved: "#FFE7B6",
  taken: "#C0C7FF",
  sold: "#FFC0C0",
  nonavailable: "#C4C4C4",
};

interface Props {
  svg: string;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const InteractiveFloorplan2D = ({ svg }: Props) => {
  const dispatch = useAppDispatch();
  const currentSvg = useRef(null);
  const hoveredElementRef = useRef<any>(null);
  const selectedElementRef = useRef<any>(null);
  const lockElementRef = useRef<any>(null);
  const lockUnitRef = useRef<any>(null);
  const [mousePosition, setMousePosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [
    bedroomFilter,
    bathroomFilter,
    floorplanFilter,
    priceFilter,
    areaFilter,
    level,
  ] = useFiltersValues();
  const availability = useAvailabilityFilter();
  const units = useUnits();
  const locations = useLocations();
  const { levels } = useFilters();
  const [select, setSelect] = useState<any>();
  console.log("select", select);

  const loading = useCurrentLoading();

  const renderSVG = useCallback(() => {
    const currentLocations = [...locations];
    currentLocations.splice(1, 1);
    currentLocations?.forEach((locations, index) => {
      const currentLocationNode = document.getElementById(`L-E${index + 1}`);
      const currentLocation = index + 1;

      if (currentLocationNode) {
        currentLocationNode.addEventListener(
          "mousedown",
          (e: any) => {
            if (currentLocation === 2) {
              dispatch(
                setCurrentVideo(
                  "https://athum.com/images-tmp/okun-etapa_2-1_rev.webm",
                  "forward"
                )
              );
              setTimeout(() => {
                dispatch(setCurrentLocations(2));
              }, 1000);
            }
            if (currentLocation === 1) {
              dispatch(
                setCurrentVideo(
                  "https://athum.com/images-tmp/okun-etapa_1-1_rev.webm",
                  "forward"
                )
              );
              setTimeout(() => {
                dispatch(setCurrentLocations(1));
              }, 1000);
            }
            dispatch(setCurrentLocationView(0));
          },
          false
        );
      }
    });
    units?.forEach((unit) => {
      const currentLevelNode = document.getElementById(
        `Level${unit.attributes.level}`
      );

      if (currentLevelNode) {
        currentLevelNode.classList.add("floor");
        if (
          unit.attributes.level === level?.toString() ||
          level === null ||
          currentLevelNode?.innerHTML.includes("circle")
        ) {
          currentLevelNode.classList.remove("floor");
        }
      }

      const floorPlans =
        !bathroomFilter &&
        !bedroomFilter &&
        !floorplanFilter &&
        !priceFilter &&
        !areaFilter
          ? units
          : units.filter(
              (el) =>
                el.attributes.bathroom === bathroomFilter ||
                el.attributes.bedroom === bedroomFilter ||
                el.typology === floorplanFilter
            );

      floorPlans?.forEach((el: Unit) => {
        const { name, status } = el;
        const floorplan = document.getElementById(`U-${name}`);
        const floorplanPolygon = document.getElementById(`P-${name}`);
        const floorplanCircleNumber = document.getElementById(`M-${name}`);

        if (floorplanPolygon) {
          floorplanPolygon.classList.remove("st2");
          floorplanPolygon.setAttribute(
            "style",
            `fill:transparent; opacity: 1`
          );
          if (status === availability) {
            floorplanPolygon.classList.remove("st2");
            floorplanPolygon.setAttribute(
              "style",
              `fill:${fills[availability]}; opacity: 0.5`
            );
          }

          if (lockUnitRef.current === name) {
            floorplanPolygon.classList.remove("st2");
            floorplanPolygon.setAttribute(
              "style",
              `fill:${fills[status]}; opacity: 0.5`
            );
          }
        }

        if (floorplanCircleNumber) {
          floorplanCircleNumber.setAttribute(
            "style",
            `fill:${fills[status]}; opacity: 1;`
          );
        }

        if (floorplan) {
          floorplan.addEventListener("mousedown", (e: any) => {
            const { clientX: x, clientY: y } = e;
            setMousePosition({ x, y });
            lockElementRef.current = true;
            lockUnitRef.current = name;
            hoveredElementRef.current = el;
            selectedElementRef.current = el;
          });
          floorplan.addEventListener(
            "mouseenter",
            (e: any) => {
              if (!lockElementRef.current) {
                const { clientX: x, clientY: y } = e;
                setMousePosition({ x, y });
                if (floorplanPolygon) {
                  floorplanPolygon.classList.remove("st2");
                  floorplanPolygon.setAttribute(
                    "style",
                    `fill:${fills[status]}; opacity: 0.5`
                  );
                }
                hoveredElementRef.current = el;
              }
            },
            false
          );
        }
      });
    });
  }, [
    units,
    bathroomFilter,
    bedroomFilter,
    floorplanFilter,
    priceFilter,
    areaFilter,
    level,
    availability,
  ]);

  useEffect(() => {
    dispatch(setLevel(0));
  }, []);

  const mobile = useMediaQuery("(max-width:1365px)");

  const [personName, setPersonName] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };

  if (!svg) return null;

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        position: "relative",
      }}
      onMouseEnter={() => {
        if (!lockElementRef.current) {
          setMousePosition(null);
          hoveredElementRef.current = null;
        }
      }}
    >
      {!mobile && (
        <div
          style={{
            width: "110px",
            height: "100%",
            position: "absolute",
            zIndex: "100",
            right: "0",
            backgroundColor: "#D9D9D9",
          }}
        >
          <Stack
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{
              height: "100%",
            }}
          >
            <p
              style={{
                fontWeight: "500",
              }}
            >
              LEVEL
            </p>
            {levels
              ?.map(({ value: inputValue }, i: any) => {
                return (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <Chip
                      key={inputValue}
                      sx={{
                        backgroundColor: i === level ? "#B2FFEE" : "#F6F6F6",
                        border: i === level ? "2px solid#46949C" : "none",
                        width: "80px",
                        height: "36px",
                        margin: "6px 0",
                        fontSize: "16px",
                        fontWeight: i === level ? "600" : "",
                        cursor: "pointer",
                        "&:hover": {
                          backgroundColor: i !== level ? "#ebe8e8" : "#B2FFEE",
                        },
                      }}
                      label={i === 0 ? "PB" : i}
                      onClick={() => dispatch(setLevel(i))}
                    />
                  </div>
                );
              })
              .reverse()}
          </Stack>
        </div>
      )}

      {mobile && (
        <FormControl
          sx={{
            m: 1,
            width: 150,
            position: "absolute",
            bottom: "0",
            right: "0",
            margin: "0",
            padding: "0",
          }}
        >
          <Select
            id="demo-multiple-chip"
            value={personName}
            onChange={handleChange}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(i) => {
              return <Chip label={`level: ${i}`} />;
            }}
            MenuProps={MenuProps}
          >
            {levels.map(({ value: name }, i: any) => {
              return (
                <MenuItem
                  key={name}
                  value={name}
                  onClick={() => dispatch(setLevel(i))}
                >
                  {name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      )}

      {loading ? (
        <Box
          sx={{
            display: "flex",
            height: "100%",
            width: "100%",
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
            justifyItems: "center",
          }}
        >
          <CircularProgress sx={{ color: "#3948FF" }} />
        </Box>
      ) : (
        <ReactSVG
          ref={currentSvg}
          afterInjection={(err, svg) => {
            if (svg) renderSVG();
          }}
          src={`${svg}?type=svg`}
          style={{
            height: "100%",
            width: "100%",
            display: "block",
          }}
          className="svg-container"
        />
      )}

      {mousePosition?.x && mousePosition?.y && hoveredElementRef.current && (
        <FloorplanCard
          x={mousePosition?.x}
          y={mousePosition?.y}
          selectedFloorplan={hoveredElementRef.current}
          clearSelectedFloor={() => {
            hoveredElementRef.current = null;
            selectedElementRef.current = null;
            lockElementRef.current = false;
            lockUnitRef.current = null;
            setMousePosition(null);
          }}
          onClick={() => {
            hoveredElementRef.current = null;
            lockElementRef.current = false;
            lockUnitRef.current = null;
            setMousePosition(null);
            setOpenModal(true);
          }}
        />
      )}
      {selectedElementRef.current && (
        <ModalFloorplan
          open={openModal}
          handleClose={() => setOpenModal(false)}
          selectedFloorplan={selectedElementRef.current}
        />
      )}
    </div>
  );
};
